export class ServerConnection {
  ws!: WebSocket
  state: 'connecting' | 'connected' = 'connecting'
  constructor() {
    this.connect()
  }
  connect() {
    this.state = 'connecting'
    this.ws = new WebSocket("/ws")
    this.ws.onopen = this.onopen
    this.ws.onclose = this.onclose
  }
  onopen = () => {
    this.state = 'connected'
  }
  onclose = () => {
    this.connect()
  }
}
