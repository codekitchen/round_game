import { gameserver } from "./protocol/gameserver"

export function isUIEvent(ev: gameserver.GameMessage): boolean {
  return ev.playerList != null
}
