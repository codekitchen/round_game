import { vec2, keyWasReleased, keyWasPressed, RandomGenerator, Vector2, keyIsDown, cameraPos, drawRect, Color, EngineObject, drawText } from "./littlejs.esm"
import { gameserver } from "./protocol/gameserver"
import { SHAPES, NUM_SHAPES } from "./shapes"
import { MultiplayerObject } from "./multiplayer_object"

var tetrisGame: TetrisGame;

// One segment of a tetromino
class Mino extends MultiplayerObject {
  constructor(type: number) {
    super();
    this.color = SHAPES[type].color;
  }

  render(): void {
    // cool retro vibes
    drawRect(this.pos, vec2(1), new Color(0, 0, 0));
    drawRect(this.pos, vec2(0.85), this.color);
  }
}

// Tetromino piece
class Piece extends MultiplayerObject {
  static FAST_DROP_DELAY = 3;
  dropDelay = 14;
  dropCounter = 0;
  constructor(public type: number) {
    super(vec2(0), vec2(0));
    for (let v of SHAPES[type].tiles) {
      this.addChild(new Mino(type), v);
    }
  }
  lockstepUpdate() {
    this.dropCounter++;
    const dropNow = (tetrisGame.dropFast && this.dropCounter > Piece.FAST_DROP_DELAY) || (this.dropCounter > this.dropDelay);
    if (dropNow) {
      this.dropCounter = 0;
      this.drop()
    }
  }
  private drop() {
    let movement = vec2(0, -1);
    const moved = this.tryMove(movement);
    if (!moved) {
      // couldn't move, time to place
      tetrisGame.placePiece(this);
    }
  }

  tryMove(movement: Vector2): boolean {
    const newLoc = this.localPos.add(movement);
    const valid = tetrisGame.validPieceLocation(this, newLoc);
    if (valid) {
      this.localPos = newLoc;
    }
    return valid;
  }

  rotate() {
    // this could use improvement -- the movement is janky because it shifts the
    // piece around unexpectedly. it'd also be nice to shift left or right
    // during rotation is we're blocked on one side.
    const newPositions = this.children.map(c => {
      let oldPos = c.localPos;
      let y = -oldPos.x;
      let x = oldPos.y;
      return [c, vec2(x, y)];
    })
    if (!newPositions.every(([_, p]) => tetrisGame.validMinoLocation(this.localPos.add(p)))) {
      // invalid rotation
      return;
    }
    for (let [c,p] of newPositions) {
      c.localPos = p;
    }
  }
  render() { }
}

export class NextPieceDisplay extends EngineObject {
  pieceType: number = 0
  piece?: Piece

  updatePiece(pieceType: number) {
    this.piece?.destroy()
    this.pieceType = pieceType
    this.piece = new Piece(pieceType)
    let offset = vec2(0, -.5)
    if (this.pieceType === 0 || this.pieceType === 3) {
      offset = vec2(-.5, -.5)
    }
    this.addChild(this.piece, offset)
  }

  render() {
    drawRect(this.pos, vec2(6, 4), new Color(0, 0, 0, .5))
    drawText("Next Piece", this.pos.add(vec2(0, 2.5)), 1, new Color(1, 1, 1))
  }
}

export class TetrisGame extends MultiplayerObject {
  static WIDTH = 10
  static HEIGHT = 20
  grid: (Mino|undefined)[] = Array(TetrisGame.WIDTH * TetrisGame.HEIGHT)

  piece!: Piece;
  nextPieceDisplay = new NextPieceDisplay;
  rand!: RandomGenerator;
  dropFast = false;
  passControl = false;
  gameOverCB?: () => void

  static GameSize = vec2(TetrisGame.WIDTH, TetrisGame.HEIGHT);

  constructor(seed: number) {
    super(vec2(0), TetrisGame.GameSize);
    this.rand = new RandomGenerator(seed);
    this.dropFast = false;
    this.chooseNextPiece();
    this.newPiece();
    this.addChild(this.nextPieceDisplay, vec2(14.5, 14.5));
    tetrisGame = this; // implicit singleton
  }
  lockstepUpdate(): void {
    this.passControl = false;
  }
  chooseNextPiece() {
    this.nextPieceDisplay.updatePiece(this.rand.int(NUM_SHAPES));
  }
  newPiece() {
    const type = this.nextPieceDisplay.pieceType;
    this.piece = new Piece(type);
    this.addChild(this.piece, vec2(4, 19));
    this.chooseNextPiece();
  }
  render() {
    // draw the background
    drawRect(cameraPos, vec2(100), new Color(0, 0, .4));
    drawRect(cameraPos.add(vec2(-.5)), this.size, new Color(0,0,0, .5));
  }
  addMino(c: Mino, pos: Vector2) {
    this.addChild(c, pos);
    this.grid[pos.y * TetrisGame.WIDTH + pos.x] = c;
  }
  validPieceLocation(piece: Piece, pos: Vector2): boolean {
    for (let c of piece.children) {
      let newPos = pos.add(c.localPos);
      if (!this.validMinoLocation(newPos))
        return false;
    }
    return true;
  }
  validMinoLocation(pos: Vector2) {
    return pos.x >= 0 &&
      pos.x < TetrisGame.WIDTH &&
      pos.y >= 0 &&
      !this.isOccupied(pos);
  }
  placePiece(piece: Piece) {
    if (!this.validPieceLocation(piece, piece.localPos)) {
      // can't place, game over
      this.gameOverCB?.();
      return;
    }
    for (let c of [...piece.children]) {
      piece.removeChild(c);
      this.addMino(c, piece.localPos.add(c.localPos));
    }
    this.checkForScoring();
    this.newPiece();
    this.passControl = true;
  }
  checkForScoring() {
    for (let y = 0; y < TetrisGame.HEIGHT; y++) {
      while (this.rowFilled(y)) {
        // scored. remove the current row and shift everything above it down
        // this feels overly complex, because each grid position is pointing to
        // a game object. I could probably avoid that.
        for (let x = 0; x < TetrisGame.WIDTH; x++) {
          this.grid[y * TetrisGame.WIDTH + x]?.destroy();
        }
        for (let y2 = y + 1; y2 < TetrisGame.HEIGHT; y2++) {
          for (let x = 0; x < TetrisGame.WIDTH; x++) {
            let mino = this.grid[y2 * TetrisGame.WIDTH + x];
            if (mino)
              mino.localPos.y -= 1;
            this.grid[(y2-1) * TetrisGame.WIDTH + x] = mino;
          }
        }
        for (let x = 0; x < TetrisGame.WIDTH; x++) {
          this.grid[(TetrisGame.HEIGHT-1) * TetrisGame.WIDTH + x]?.destroy();
          this.grid[(TetrisGame.HEIGHT - 1) * TetrisGame.WIDTH + x] = undefined;
        }
      }
    }
  }
  rowFilled(y: number) {
    for (let x = 0; x < TetrisGame.WIDTH; x++) {
      if (this.grid[y * TetrisGame.WIDTH + x] === undefined) {
        return false;
      }
    }
    return true;
  }
  isOccupied(pos: Vector2) {
    return this.grid[pos.y * TetrisGame.WIDTH + pos.x] !== undefined;
  }
  processEvent(event: gameserver.GameEvent) {
    if (event.type === 'left') {
      this.piece.tryMove(vec2(-1, 0));
    }
    if (event.type === 'right') {
      this.piece.tryMove(vec2(1, 0));
    }
    if (event.type === 'rotate') {
      this.piece.rotate();
    }
    if (event.type === 'dropstart') {
      this.dropFast = true;
    }
    if (event.type === 'dropstop') {
      this.dropFast = false;
    }
  }
  gameEvent(type: string) {
    return gameserver.GameMessage.create({
      gameEvent: gameserver.GameEvent.create({ type })
    })
  }
  currentEvents() {
    let events: gameserver.GameMessage[] = [];
    if (keyWasReleased('ArrowLeft')) {
      events.push(this.gameEvent('left'));
    }
    if (keyWasReleased('ArrowRight')) {
      events.push(this.gameEvent('right'));
    }
    if (keyWasReleased('ArrowUp')) {
      events.push(this.gameEvent('rotate'));
    }
    if (keyWasPressed('ArrowDown')) {
      events.push(this.gameEvent('dropstart'));
    }
    if (this.dropFast && !keyIsDown('ArrowDown')) {
      events.push(this.gameEvent('dropstop'));
    }
    if (this.passControl) {
      events.push(gameserver.GameMessage.create({
        passControl: gameserver.PassControl.create()
      }));
    }
    return events;
  }
}
