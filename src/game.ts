import { Color, EngineObject, keyWasReleased, mousePos, randColor, randInt, vec2, Vector2 } from "./littlejs.esm.js";
import { NUM_SHAPES, SHAPES } from "./shapes.js";

export type GameEvent = {
  type: 'left' | 'right' | 'rotate';
  frame: number;
};

class Tile extends EngineObject {

  constructor(type: number) {
    super();
    this.color = SHAPES[type].color;
  }
}

class Piece extends EngineObject {
  dropDelay = 12;
  dropCounter = 0;
  constructor(pos: Vector2, size: Vector2, type: number) {
    super(pos, size);
    for (let v of SHAPES[type].tiles) {
      this.addChild(new Tile(type), v);
    }
  }
  update() {
    super.update();
    this.dropCounter++;
    if (this.dropCounter > this.dropDelay) {
      this.dropCounter = 0;
      this.drop()
    }
  }
  private drop() {
    let blocked = false;
    let movement = vec2(0, -1);
    for (let c of this.children) {
      let newPos = this.pos.add(c.localPos).add(movement);
      if (newPos.y < 0 || game.grid.isOccupied(newPos)) {
        blocked = true;
      }
    }
    if (blocked) {
      // place piece
      for (let c of [...this.children]) {
        this.removeChild(c);
        game.grid.addChild(c, this.pos.add(c.localPos));
      }
      game.newPiece();
      return;
    }
    this.pos.y -= 1;
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

class Grid extends EngineObject {
  constructor() {
    super(vec2(0), vec2(10, 20));
    this.addChild(new Tile(1));
  }
  render() { }
  isOccupied(pos: Vector2) {
    // TODO wow, it's like array indexing was never invented
    for (let c of this.children) {
      if (c.localPos.x === pos.x && c.localPos.y === pos.y) {
        return true;
      }
    }
    return false;
  }
}

export class Game {
  // game state (inputs state)
  frame = 0;
  piece: Piece | null = null;
  grid: Grid = new Grid;

  // recording infra
  recording: GameEvent[] = [];
  recState: 'none' | 'recording' | 'replaying' = 'none';

  reset() {
    this.frame = 0;
    this.piece?.destroy();
    this.newPiece();
  }
  newPiece() {
    // temporary, eventually we'll do this elsewhere
    const type = randInt(0, NUM_SHAPES);
    this.piece = new Piece(vec2(4, 19), vec2(1, 1), type);

  }
  // the game state is never updated directly, we always
  // serialize to recording events and then replay them.
  // this helps ensure that the game is deterministic
  // (replaying the same events will always result in the same state)
  update() {
    if (this.recState === 'replaying') {
      return this.replay(this.recording);
    }
    let events: GameEvent[] = [];
    if (keyWasReleased('ArrowLeft')) {
      events.push({ type: 'left', frame: this.frame });
    }
    if (keyWasReleased('ArrowRight')) {
      events.push({ type: 'right', frame: this.frame });
    }
    if (keyWasReleased('ArrowUp')) {
      events.push({ type: 'rotate', frame: this.frame });
    }

    // replay all recorded
    if (this.recState === 'recording') {
      this.recording.push(...events);
    }
    this.replay(events);
  }
  replay(events: GameEvent[]) {
    while (events.length > 0 && events[0].frame <= this.frame) {
      const event = events.shift()!;
      if (event.frame < this.frame) {
        console.log('out of sync! got event for frame', event.frame, 'but expected', this.frame);
        // TODO: should really abort the whole game here, there's no
        // way to recover from this
        continue;
      }
      if (event.type === 'left') {
        this.piece!.pos.x -= 1;
      }
      if (event.type === 'right') {
        this.piece!.pos.x += 1;
      }
      if (event.type === 'rotate') {
        this.piece!.rotate();
      }
    }
    this.frame++;
  }
  startRecording() {
    console.log('start recording');
    this.recState = 'recording';
    this.recording = [];
  }
  stopRecording() {
    console.log('stop recording');
    this.recState = 'none';
    console.log(this.recording);
  }
  replayRecording() {
    console.log('replay recording');
    this.reset();
    this.recState = 'replaying';
  }
  serializeVec2(v: Vector2) {
    return { x: v.x.toFixed(2), y: v.y.toFixed(2) };
  }
  deserializeVec2(v: { x: string; y: string; }) {
    return vec2(parseFloat(v.x), parseFloat(v.y));
  }
}

export var game = new Game;
