import { EngineObject, vec2, keyWasReleased, keyWasPressed, RandomGenerator, Vector2 } from "./littlejs.esm.js";
import { SHAPES, NUM_SHAPES } from "./shapes.js";

var tetrisGame: TetrisGame;

type GameEvent = {
  type: 'left' | 'right' | 'rotate' | 'dropstart' | 'dropstop';
  frame: number;
};

// One segment of a tetromino
class Mino extends EngineObject {
  constructor(type: number) {
    super();
    this.color = SHAPES[type].color;
  }
}

// Tetromino piece
class Piece extends EngineObject {
  static FAST_DROP_DELAY = 3;
  dropDelay = 12;
  dropCounter = 0;
  constructor(type: number) {
    super(vec2(0), vec2(0));
    for (let v of SHAPES[type].tiles) {
      this.addChild(new Mino(type), v);
    }
  }
  update() {
    super.update();
    this.dropCounter++;
    const dropNow = (tetrisGame.dropFast && this.dropCounter > Piece.FAST_DROP_DELAY) || (this.dropCounter > this.dropDelay);
    if (dropNow) {
      this.dropCounter = 0;
      this.drop()
    }
  }
  private drop() {
    let placeHere = false;
    let movement = vec2(0, -1);
    for (let c of this.children) {
      let newPos = this.localPos.add(c.localPos).add(movement);
      if (newPos.y < 0 || tetrisGame.isOccupied(newPos)) {
        placeHere = true;
      }
    }
    if (placeHere) {
      for (let c of [...this.children]) {
        this.removeChild(c);
        tetrisGame.addMino(c, this.localPos.add(c.localPos));
      }
      tetrisGame.newPiece();
      return;
    }
    // didn't place, so move down
    this.localPos.y -= 1;
  }

  rotate() {
    for (let c of this.children) {
      let oldPos = c.localPos;
      let y = -oldPos.x;
      let x = oldPos.y;
      c.localPos = vec2(x, y);
    }
  }
  render() { }
}

export class TetrisGame extends EngineObject {
  static WIDTH = 10
  static HEIGHT = 20
  grid: Mino[] = Array(TetrisGame.WIDTH * TetrisGame.HEIGHT)

  piece!: Piece;
  rand!: RandomGenerator;
  dropFast = false;

  constructor(seed: number) {
    super(vec2(0), vec2(TetrisGame.WIDTH, TetrisGame.HEIGHT));
    this.rand = new RandomGenerator(seed);
    this.dropFast = false;
    this.newPiece();
    tetrisGame = this; // implicit singleton
  }
  newPiece() {
    // temporary, eventually we'll do this elsewhere
    const type = this.rand.int(NUM_SHAPES);
    this.piece = new Piece(type);
    this.addChild(this.piece, vec2(4, 19));
  }
  render() { }
  addMino(c: Mino, pos: Vector2) {
    this.addChild(c, pos);
    this.grid[pos.y * TetrisGame.WIDTH + pos.x] = c;
  }
  isOccupied(pos: Vector2) {
    return this.grid[pos.y * TetrisGame.WIDTH + pos.x] !== undefined;
  }
  processEvent(event: GameEvent) {
    if (event.type === 'left') {
      this.piece.localPos.x -= 1;
    }
    if (event.type === 'right') {
      this.piece.localPos.x += 1;
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
  currentEvents(frame: number) {
    let events: GameEvent[] = [];
    if (keyWasReleased('ArrowLeft')) {
      events.push({ type: 'left', frame });
    }
    if (keyWasReleased('ArrowRight')) {
      events.push({ type: 'right', frame });
    }
    if (keyWasReleased('ArrowUp')) {
      events.push({ type: 'rotate', frame });
    }
    if (keyWasPressed('ArrowDown')) {
      events.push({ type: 'dropstart', frame });
    }
    if (keyWasReleased('ArrowDown')) {
      events.push({ type: 'dropstop', frame });
    }
    return events;
  }
}
