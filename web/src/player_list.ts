import { Color, drawText, EngineObject, vec2 } from "./littlejs.esm.js"
import { gameserver } from "./protocol/gameserver.js"

export class PlayerList extends EngineObject {
  list: gameserver.Player[] = []
  you?: gameserver.Player

  render(): void {
    let players = this.list.map(l => l.name)
    let msg = `You: ${this.you?.name}\n[${players.join(', ')}]`
    drawText(msg, this.pos, 1, new Color(1, 1, 1))
  }
}
