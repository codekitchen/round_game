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
		gm: newGameManager(slog.Default()),
	}
}

func (s websocketServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{})
	if err != nil {
		slog.Error("failed to accept websocket", "err", err)
		return
	}

	slog.Debug("accepted websocket", "conn", r.RemoteAddr)

	logger := slog.With("conn", r.RemoteAddr)
	err = s.gm.clientJoined(c, logger)
	if err != nil {
		slog.Error("failed to join game", "err", err)
		c.CloseNow()
	}
}
