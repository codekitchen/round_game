import { Color, drawRect, drawText, EngineObject, vec2 } from "./littlejs.esm.js"
import { gameserver } from "./protocol/gameserver.js"

const UI_LAYER = 1000

class Avatar extends EngineObject {
  currentPlayer = false
  you = false
  renderOrder = UI_LAYER+100

  constructor(public name: string) {
    super()
  }
  render(): void {
    if (this.you) {
      drawRect(this.pos, vec2(3.5, 1), new Color(0, 1, 0, .3))
    }
    if (this.currentPlayer) {
      drawText(this.name+'🕹️', this.pos, 0.9, new Color(1, 1, 1))
    } else {
      drawText(this.name, this.pos, 0.9, new Color(1, 1, 1))
    }
  }
}

export class PlayerList extends EngineObject {
  list: gameserver.PlayerList = gameserver.PlayerList.create()
  you: string = ''
  avatars: EngineObject[] = []
  renderOrder = UI_LAYER

  updatePlayerList(list: gameserver.PlayerList) {
    this.list = list
    for (let c of this.avatars) {
      c.destroy()
    }
    this.avatars = []
    let i = 0
    this.list.players.forEach(p => {
      let a = new Avatar(p.name!)
      if (p.id === this.you)
        a.you = true
      if (p.id === this.list.currentPlayerID)
        a.currentPlayer = true
      this.avatars.push(a)
      this.addChild(a, vec2(0, i--))
    })
  }

  render(): void {
    drawRect(this.pos.add(vec2(0, -5)), vec2(3, 12), new Color(0, 0, 0, .5))
    drawText('Players', this.pos.add(vec2(0, 1.5)), 1, new Color(1, 1, 1))
  }
}
