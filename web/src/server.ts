import { gameserver } from "./protocol/gameserver.js"

export class ServerConnection {
  ws!: WebSocket
  state: 'connecting' | 'connected' | 'disconnected' = 'connecting'
  onmessage?: (data: gameserver.GameMessage) => void
  ondisconnect?: () => void

  constructor() {
    this.connect()
  }
  connect() {
    this.state = 'connecting'
    // construct the ws URL manually to support slightly older browsers
    const loc = window.location
    const protocol = loc.protocol === 'https:' ? 'wss:' : 'ws:'
    const url = `${protocol}//${loc.host}/ws`
    this.ws = new WebSocket(url)
    this.ws.binaryType = "arraybuffer"
    this.ws.onopen = this.onopen
    this.ws.onclose = this.onclose
    this.ws.onmessage = this.gotmessage
  }
  disconnect() {
    this.ws.close()
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
    this.ondisconnect?.()
    // this.connect()
  }
  send(ev: gameserver.GameMessage) {
    this.ws.send(gameserver.GameMessage.encode(ev).finish())
  }
}
