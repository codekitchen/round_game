import { gameserver } from "./protocol/gameserver.js"

export class ServerConnection {
  ws!: WebSocket
  state: 'connecting' | 'connected' | 'disconnected' = 'connecting'
  onmessage?: (data: any) => void
  constructor() {
    this.connect()
  }
  connect() {
    this.state = 'connecting'
    this.ws = new WebSocket("/ws")
    this.ws.binaryType = "arraybuffer"
    this.ws.onopen = this.onopen
    this.ws.onclose = this.onclose
    this.ws.onmessage = this.gotmessage
  }
  gotmessage = (ev: MessageEvent) => {
    const rawdata = new Uint8Array(ev.data)
    let data = gameserver.GameMessage.decode(rawdata)
    this.onmessage?.(data)
  }
  onopen = () => {
    console.log('connected')
    this.state = 'connected'
  }
  onclose = () => {
    console.log('disconnected')
    this.state = 'disconnected'
    // this.connect()
  }
  send(ev: gameserver.GameMessage) {
    this.ws.send(gameserver.GameMessage.encode(ev).finish())
  }
}
