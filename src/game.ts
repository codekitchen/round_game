import { Color, drawTextScreen, engineObjectsUpdate, vec2, Vector2 } from "./littlejs.esm.js";
import { ServerConnection } from "./server.js";
import { TetrisGame } from "./tetris_game.js"

type Event = { frame: number };

export class Game {
  tetris?: TetrisGame;
  // recording infra
  frame = 0;
  recording: Event[] = [];
  gameState: 'waiting' | 'playing' = 'waiting';
  recState: 'none' | 'recording' | 'replaying' = 'none';
  server = new ServerConnection

  constructor() {
    this.server.onmessage = this.onmessage.bind(this);
  }

  onmessage = (data: any) => {
    console.log('game got message', data);
    if (data.type === 'gameStart') {
      this.reset(data.seed, data.role);
    }
  }

  reset(seed: number, role: 'player' | 'observer') {
    this.tetris?.destroy();
    this.tetris = new TetrisGame(seed);
    this.gameState = 'playing';
    this.frame = 0;
    if (role === 'player') {
      this.startRecording();
    } else {
      this.playbackRecording();
    }
  }

  render() {
    if (this.server.state === 'connecting') {
      drawTextScreen('Connecting...', vec2(200, 100), 25, new Color(1, 1, 1));
    } else {
      drawTextScreen(`Connected for ${this.recState}`, vec2(200, 100), 25, new Color(1, 1, 1));
    }
  }

  // the game state is never updated directly, we always
  // serialize to recording events and then replay them.
  // this helps ensure that the game is deterministic
  // (replaying the same events will always result in the same state)
  update() {
    if (this.gameState !== 'playing') {
      return;
    }

    if (this.recState === 'replaying') {
      return this.replayFromRemote(this.recording);
    }
    const events = this.tetris!.currentEvents(this.frame);

    if (this.recState === 'recording') {
      this.recording.push(...events);
      for (let ev of events) {
        this.server.send(ev);
      }
      this.replayLocally(events);
      engineObjectsUpdate();
      this.frame++;
    }
  }

  replayLocally(events: Event[]) {
    while (events.length > 0) {
      const event = events.shift()!;
      this.tetris!.processEvent(event as any); // it'd be nice to avoid this any cast, but NBD
    }
  }

  replayFromRemote(events: Event[]) {
    while (events.length > 0) {
      const event = events.shift()!;
      if (event.frame < this.frame) {
        console.log('out of sync! got event for frame', event.frame, 'but expected', this.frame);
        // TODO: should really abort the whole game here, there's no
        // way to recover from this
        continue;
      }
      while (this.frame < event.frame) {
        engineObjectsUpdate();
        this.frame++;
      }
      this.tetris!.processEvent(event as any); // it'd be nice to avoid this any cast, but NBD
    }
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
  playbackRecording() {
    console.log('replay recording');
    // this.reset();
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
