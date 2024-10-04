export class ServerConnection {
  ws!: WebSocket
  state: 'connecting' | 'connected' = 'connecting'
  onmessage?: (data: any) => void
  constructor() {
    this.connect()
  }
  connect() {
    this.state = 'connecting'
    this.ws = new WebSocket("/ws")
    this.ws.onopen = this.onopen
    this.ws.onclose = this.onclose
    this.ws.onmessage = this.gotmessage
  }
  gotmessage = (ev: MessageEvent) => {
    let data = JSON.parse(ev.data)
    this.onmessage?.(data)
  }
  onopen = () => {
    console.log('connected')
    this.state = 'connected'
  }
  onclose = () => {
    console.log('disconnected')
    // this.connect()
  }
  send(ev: { type: "left" | "right" | "rotate" | "dropstart" | "dropstop"; frame: number }) {
    this.ws.send(JSON.stringify(ev))
  }
}
