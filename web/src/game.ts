import { isUIEvent } from "./events.js";
import { Color, drawTextScreen, EngineObject, manualEngineUpdate, setFontDefault, vec2 } from "./littlejs.esm.js";
import { multiplayerObjecsUpdate } from "./multiplayer_object.js";
import { PlayerList } from "./player_list.js";
import { gameserver } from "./protocol/gameserver.js";
import { ServerConnection } from "./server.js";
import { TetrisGame } from "./tetris_game.js"

const HEARTBEAT_INTERVAL = 20; // max frames between an event
const OBSERVER_DELAY = 15; // # of frames

export class Game {
  tetris?: TetrisGame;
  ui: EngineObject;
  playerList: PlayerList;
  // recording infra
  frame = 0;
  lastEventFrame = 0;
  recording: gameserver.GameMessage[] = [];
  gameState: 'waiting' | 'playing' | 'gameover' = 'waiting';
  player = gameserver.Player.create({ id: '', name: '' });
  role = gameserver.Role.ROLE_OBSERVER;
  server = new ServerConnection

  constructor() {
    this.server.onmessage = this.onmessage
    this.server.ondisconnect = this.ondisconnect
    this.ui = new EngineObject()
    this.ui.addChild(this.playerList = new PlayerList(), vec2(-4, 10.5))
  }

  onmessage = (ev: gameserver.GameMessage) => {
    // special handling of game init message which needs to arrive before the
    // message replay loop kicks in
    if (ev.gameInit) {
      this.reset(ev.gameInit.seed!)
      this.player = ev.gameInit.yourPlayer as gameserver.Player
      this.playerList.you = this.player.id
    } else if (ev.ping) {
      // ignore pings, they're just to trigger
      // manualEngineUpdate() calls
    } else if (isUIEvent(ev)) {
      this.handleUIEvent(ev)
    } else {
      this.recording.push(ev)
    }
    // websocket event gives us an opportunity to do an update while
    // the tab is in the background
    if (document.hidden)
      manualEngineUpdate()
  }

  ondisconnect = () => {
    this.recording = []
  }

  gameOver = () => {
    this.gameState = 'gameover';
    this.server.disconnect();
  }

  reset(seed: number) {
    this.tetris?.destroy();
    this.tetris = new TetrisGame(seed);
    this.tetris.gameOverCB = this.gameOver;
    this.gameState = 'playing';
    this.frame = this.lastEventFrame = 0;
    this.role = gameserver.Role.ROLE_OBSERVER;
    this.recording = [];
  }

  renderPost() {
    setFontDefault('Pixels')
    drawTextScreen(`frame: ${this.frame}`, vec2(200, 25), 20, new Color(1, 1, 1));
    drawTextScreen(`state: ${this.gameState}`, vec2(200, 45), 20, new Color(1, 1, 1));
    // drawTextScreen(`role: ${this.role}`, vec2(200, 105), 20, new Color(1, 1, 1));
    let connState = '';
    if (this.server.state === 'connecting') {
      connState = 'Connecting...'
    }  else if (this.server.state === 'disconnected') {
      connState = 'Disconnected'
    } else {
      connState = 'Connected'
    }
    drawTextScreen(connState, vec2(200, 65), 20, new Color(1, 1, 1));
    if (this.gameState === 'gameover') {
      drawTextScreen('Game Over!', vec2(200, 85), 20, new Color(1, 0.5, 0.5));
    }

    if (this.gameState === 'playing') {
      if (this.role === gameserver.Role.ROLE_PLAYER) {
        drawTextScreen(`YOUR TURN!`, vec2(240, 145), 60, new Color(254 / 255, 209 / 255, 189 / 255));
      } else {
        drawTextScreen(`Waiting for your turn...`, vec2(240, 145), 20, new Color(1, 1, 1));
      }
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

    if (this.role === gameserver.Role.ROLE_OBSERVER) {
      this.replayFromRemote();
      return
    }

    const events = this.tetris!.currentEvents();
    for (let ev of events) {
      ev.frame = this.frame;
    }

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
      this.sendEvent(ev);
    }
    this.replayCurrentEvents(events);
    this.stepSimulation();
  }

  sendEvent(ev: gameserver.GameMessage) {
    if (ev.passControl) {
      if (this.role === gameserver.Role.ROLE_PLAYER) {
        // need to immediately switch roles, so that we don't keep
        // advancing the simulation as if we were still the player
        this.role = gameserver.Role.ROLE_OBSERVER
      } else {
        // don't send pass control messages to the server if we're not the player
        return
      }
    }
    this.server.send(ev);
  }

  stepSimulation() {
    multiplayerObjecsUpdate();
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

      while (this.frame < fastTargetFrame) {
        // no more events in the horizon, but we're still behind
        this.stepSimulation();
      }

      // now we are caught up, replay in real time
      this.replayCurrentEvents(events);

      // if there's still events on the queue, they are in future frames,
      // so we are safe to step the simulation to the next frame.
      if (events.length > 0) {
        this.stepSimulation();
      }
    }
  }

  replayCurrentEvents(events: gameserver.GameMessage[]) {
    while (events.length > 0 && events[0].frame <= this.frame) {
      let event = events.shift()!;
      this.handleEvent(event);
    }
  }

  handleEvent(event: gameserver.GameMessage) {
    if (event.frame < this.frame) {
      console.error('got event for previous frame', { event, frame: this.frame })
      return
    }
    // console.log('handling event', { event, frame: this.frame })
    if (event.playerChange) {
      this.role = event.playerChange.player === this.player.id ? gameserver.Role.ROLE_PLAYER : gameserver.Role.ROLE_OBSERVER;
    } else if (event.gameEvent) {
      this.tetris!.processEvent(event.gameEvent as gameserver.GameEvent);
    }
  }

  handleUIEvent(ev: gameserver.GameMessage) {
    if (ev.playerList) {
      this.playerList.updatePlayerList(ev.playerList as gameserver.PlayerList)
    }
  }
}

export var game = new Game;
