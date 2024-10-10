import { Color, drawTextScreen, engineObjectsUpdate, vec2, Vector2 } from "./littlejs.esm.js";
import { gameserver } from "./protocol/gameserver.js";
import { ServerConnection } from "./server.js";
import { TetrisGame } from "./tetris_game.js"

const HEARTBEAT_INTERVAL = 50; // max frames between an event
const OBSERVER_DELAY = 30; // # of frames

export class Game {
  tetris?: TetrisGame;
  // recording infra
  frame = 0;
  lastEventFrame = 0;
  recording: gameserver.GameMessage[] = [];
  gameState: 'waiting' | 'playing' = 'waiting';
  recState: 'recording' | 'replaying' = 'replaying';
  role: 'player' | 'observer' = 'observer';
  server = new ServerConnection

  constructor() {
    this.server.onmessage = this.onmessage.bind(this);
  }

  onmessage = (data: any) => {
    console.log('game got message', data);
    if (data.type === 'gameStart') {
      this.reset(data.seed);
      return
    } else if (data.type === 'roleChange') {
      this.changeRole(data.role);
      return
    }
    this.recording.push(data)
  }

  reset(seed: number) {
    this.tetris?.destroy();
    this.tetris = new TetrisGame(seed);
    this.gameState = 'playing';
    this.frame = this.lastEventFrame = 0;
  }

  changeRole(role: 'player' | 'observer') {
    this.role = role;
    if (role === 'observer') {
      // stop recording immediately
      this.recState = 'replaying';
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
      this.replayFromRemote();
      if (this.role === 'player' && this.recording.length === 0) {
        // switch to recording mode because we're the player now
        this.recState = 'recording'
      }
      return
    }

    const events = this.tetris!.currentEvents().map(ev => gameserver.GameMessage.create({ frame: this.frame, gameEvent: ev }));

    if (this.recState === 'recording') {
      if (events.length > 0)
        this.lastEventFrame = this.frame;
      if (this.frame - this.lastEventFrame > HEARTBEAT_INTERVAL) {
        events.push(gameserver.GameMessage.create({
          frame: this.frame,
          heartbeat: gameserver.Heartbeat.create(),
        }))
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

  replayLocally(events: gameserver.GameMessage[]) {
    while (events.length > 0) {
      const event = events.shift()!;
      const gameEvent = event.gameEvent;
      if (gameEvent) {
        this.tetris!.processEvent(gameEvent as gameserver.GameEvent);
      } else {
        // process other events here, like heartbeats and player switches
      }
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
  serializeVec2(v: Vector2) {
    return { x: v.x.toFixed(2), y: v.y.toFixed(2) };
  }
  deserializeVec2(v: { x: string; y: string; }) {
    return vec2(parseFloat(v.x), parseFloat(v.y));
  }
}

export var game = new Game;
