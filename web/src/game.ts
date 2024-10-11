import { Color, drawTextScreen, engineObjectsUpdate, frame, vec2, Vector2 } from "./littlejs.esm.js";
import { gameserver } from "./protocol/gameserver.js";
import { ServerConnection } from "./server.js";
import { TetrisGame } from "./tetris_game.js"

const HEARTBEAT_INTERVAL = 20; // max frames between an event
const OBSERVER_DELAY = 30; // # of frames

export class Game {
  tetris?: TetrisGame;
  // recording infra
  frame = 0;
  lastEventFrame = 0;
  recording: gameserver.GameMessage[] = [];
  gameState: 'waiting' | 'playing' = 'waiting';
  role = gameserver.Role.ROLE_OBSERVER;
  server = new ServerConnection

  constructor() {
    this.server.onmessage = this.onmessage.bind(this);
  }

  onmessage = (data: gameserver.GameMessage) => {
    // special handling of game init message which needs to arrive before the
    // message replay loop kicks in
    if (data.gameInit) {
      this.reset(data.gameInit.seed!)
      return
    }
    this.recording.push(data)
  }

  passControl = () => {
    if (this.role != gameserver.Role.ROLE_PLAYER) {
      return
    }
    this.server.send(gameserver.GameMessage.create({
      frame: this.frame,
      passControl: gameserver.PassControl.create(),
    }))
    // need to immediately switch roles, so that we don't keep
    // advancing the simulation as if we were still the player
    this.role = gameserver.Role.ROLE_OBSERVER
  }

  reset(seed: number) {
    this.tetris?.destroy();
    this.tetris = new TetrisGame(seed);
    this.tetris.passControlCB = this.passControl;
    this.gameState = 'playing';
    this.frame = this.lastEventFrame = 0;
  }

  render() {
    drawTextScreen(`frame: ${this.frame}`, vec2(200, 25), 20, new Color(1, 1, 1));
    drawTextScreen(`state: ${this.gameState}`, vec2(200, 45), 20, new Color(1, 1, 1));
    let connState = '';
    if (this.server.state === 'connecting') {
      connState = 'Connecting...'
    }  else if (this.server.state === 'disconnected') {
      connState = 'Disconnected'
    } else if (this.role === gameserver.Role.ROLE_PLAYER) {
      connState = `YOUR TURN!`
    } else {
      connState = `Waiting for your turn...`
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

    if (this.role === gameserver.Role.ROLE_OBSERVER) {
      this.replayFromRemote();
      return
    }

    const gameEvents = this.tetris!.currentEvents();
    const events = gameEvents.map(ev => gameserver.GameMessage.create({ frame: this.frame, gameEvent: ev }));

    if (events.length > 0)
      this.lastEventFrame = this.frame;
    if (this.frame - this.lastEventFrame > HEARTBEAT_INTERVAL) {
      events.push(gameserver.GameMessage.create({
        frame: this.frame,
        heartbeat: gameserver.Heartbeat.create(),
      }))
      this.lastEventFrame = this.frame;
    }

    for (let ev of events) {
      this.server.send(ev);
    }
    this.replayLocally(events);
    this.stepSimulation();
  }

  replayLocally(events: gameserver.GameMessage[]) {
    while (events.length > 0) {
      const event = events.shift()!;
      this.handleEvent(event);
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
        this.handleEvent(event);
      }

      // now we are caught up, replay in real time
      while (events.length > 0 && events[0].frame <= this.frame) {
        let event = events.shift()!;
        this.handleEvent(event);
      }
      this.stepSimulation();
    }
  }

  handleEvent(event: gameserver.GameMessage) {
    if (event.frame < this.frame) {
      console.error('got event for previous frame', { event, frame: this.frame })
      return
    }
    console.log('handling event', { event, frame: this.frame })
    if (event.roleChange) {
      this.role = event.roleChange.role!
    } else if (event.gameEvent) {
      this.tetris!.processEvent(event.gameEvent as gameserver.GameEvent);
    }
  }
}

export var game = new Game;
