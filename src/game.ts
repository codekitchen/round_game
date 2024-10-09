import { Color, drawTextScreen, engineObjectsUpdate, vec2, Vector2 } from "./littlejs.esm.js";
import { ServerConnection } from "./server.js";
import { TetrisGame } from "./tetris_game.js"

type Event = { type: string, frame: number };

const HEARTBEAT_INTERVAL = 50; // max frames between an event
const OBSERVER_DELAY = 30; // # of frames

export class Game {
  tetris?: TetrisGame;
  // recording infra
  frame = 0;
  lastEventFrame = 0;
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
      return
    }
    this.recording.push(data)
  }

  reset(seed: number, role: 'player' | 'observer') {
    this.tetris?.destroy();
    this.tetris = new TetrisGame(seed);
    this.gameState = 'playing';
    this.frame = this.lastEventFrame = 0;
    if (role === 'player') {
      this.startRecording();
    } else {
      this.playbackRecording();
    }
  }

  render() {
    drawTextScreen(`frame: ${this.frame}`, vec2(200, 25), 20, new Color(1, 1, 1));
    drawTextScreen(`state: ${this.gameState}`, vec2(200, 45), 20, new Color(1, 1, 1));
    let connState = '';
    if (this.server.state === 'connecting') {
      connState = 'Connecting...'
    }  else if (this.server.state === 'disconnected') {
      connState = 'Disconnected'
    } else {
      connState = `Connected for ${this.recState}`
    }
    drawTextScreen(connState, vec2(200, 65), 20, new Color(1, 1, 1));
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
      return this.replayFromRemote();
    }
    const events = this.tetris!.currentEvents(this.frame) as Event[];

    if (this.recState === 'recording') {
      if (events.length > 0)
        this.lastEventFrame = this.frame;
      if (this.frame - this.lastEventFrame > HEARTBEAT_INTERVAL) {
        events.push({ type: 'heartbeat', frame: this.frame });
        this.lastEventFrame = this.frame;
      }

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

  stepSimulation() {
    engineObjectsUpdate();
    this.frame++;
  }

  replayFromRemote() {
    let events = this.recording
    if (events.length > 0) {
      let horizonFrame = events[events.length - 1].frame
      let fastTargetFrame = horizonFrame - OBSERVER_DELAY

      while (events[0].frame < fastTargetFrame) {
        // replay quickly to catch up
        let event = events.shift()!;
        while (this.frame < event.frame) {
          this.stepSimulation();
        }
        this.tetris!.processEvent(event as any);
      }

      // now we are caught up, replay in real time
      this.stepSimulation();
      if (events.length > 0 && events[0].frame == this.frame) {
        let event = events.shift()!;
        this.tetris!.processEvent(event as any); // it'd be nice to avoid this any cast, but NBD
      }
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
