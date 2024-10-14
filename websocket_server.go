package main

import (
	"log/slog"
	"net/http"

	"github.com/coder/websocket"
)

type websocketServer struct {
	gm *gameManager
}

func newWebsocketServer() *websocketServer {
	return &websocketServer{
		gm: newGameManager(),
	}
}

func (s websocketServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{})
	if err != nil {
		slog.Debug("failed to accept websocket", "err", err)
		return
	}

	slog.Debug("accepted websocket", "conn", r.RemoteAddr)

	s.gm.clientJoined(c, r.RemoteAddr)
}
