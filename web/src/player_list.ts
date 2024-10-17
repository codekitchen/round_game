import { Color, drawText, EngineObject, vec2 } from "./littlejs.esm.js"
import { gameserver } from "./protocol/gameserver.js"

class Avatar extends EngineObject {
  constructor(public name: string) {
    super()
  }
  render(): void {
    drawText(this.name, this.pos, 1, new Color(1, 1, 1))
  }
}

export class PlayerList extends EngineObject {
  list: gameserver.Player[] = []
  you?: gameserver.Player
  avatars: EngineObject[] = []

  updatePlayerList(list: gameserver.Player[]) {
    this.list = list
    for (let c of this.avatars) {
      c.destroy()
    }
    this.avatars = []
    let i = 0
    this.list.forEach(p => {
      let a = new Avatar(p.name)
      this.avatars.push(a)
      this.addChild(a, vec2(i++, 0))
    })
  }

  // render(): void {
  //   let players = this.list.map(l => l.name)
  //   let msg = `You: ${this.you?.name}\n[${players.join(', ')}]`
  //   drawText(msg, this.pos, 1, new Color(1, 1, 1))
  // }
}
