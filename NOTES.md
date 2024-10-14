## Websockets and SSL

[Mozilla says](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications#security_considerations) that most browsers require HTTPS for websockets. But I tried Safari (MacOS and iOS), Firefox, and Chrome, and they are all allowing websockets over HTTP without SSL. I'm not sure what gives here.

copilot app init

## Go Cleanup

- Return synchronous interfaces
- No hidden global state
- Interface points, small interfaces
- Build up with layers -- client read message, loop reading messages from all clients, etc
