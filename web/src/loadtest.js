// Functions in support of Artillery load testing.
// This file is compiled as a separate bundle and loaded by Artillery.
import { gameserver } from "./protocol/gameserver"

export function gameEvent(userContext, events, done) {
  let ev = gameserver.GameMessage.create({
    gameEvent: gameserver.GameEvent.create({ type: 'left' })
  })
  let bytes = gameserver.GameMessage.encode(ev).finish()
  userContext.vars.data = bytes
  return done();
}
