import { vec2, Vector2 } from "./littlejs.esm.js";
import { TetrisGame } from "./tetris_game.js"

type Event = { frame: number };

export class Game {
  tetris!: TetrisGame;
  // recording infra
  frame = 0;
  recording: Event[] = [];
  recState: 'none' | 'recording' | 'replaying' = 'none';

  constructor() {
    this.reset();
    this.startRecording();
  }

  reset() {
    this.tetris?.destroy();
    this.tetris = new TetrisGame(12345);
    this.frame = 0;
  }

  // the game state is never updated directly, we always
  // serialize to recording events and then replay them.
  // this helps ensure that the game is deterministic
  // (replaying the same events will always result in the same state)
  update() {
    if (this.recState === 'replaying') {
      return this.replay(this.recording);
    }
    const events = this.tetris.currentEvents(this.frame);

    if (this.recState === 'recording') {
      this.recording.push(...events);
    }
    this.replay(events);
  }
  replay(events: Event[]) {
    while (events.length > 0 && events[0].frame <= this.frame) {
      const event = events.shift()!;
      if (event.frame < this.frame) {
        console.log('out of sync! got event for frame', event.frame, 'but expected', this.frame);
        // TODO: should really abort the whole game here, there's no
        // way to recover from this
        continue;
      }
      this.tetris.processEvent(event as any); // it'd be nice to avoid this any cast, but NBD
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
