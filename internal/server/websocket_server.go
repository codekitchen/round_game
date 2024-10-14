package server

import (
	"log/slog"
	"net/http"

	"github.com/coder/websocket"

	"github.com/codekitchen/roundgame/internal/game"
)

type WebsocketServer struct {
	gm *game.GameManager
}

func New() *WebsocketServer {
	return &WebsocketServer{
		gm: game.NewGameManager(),
	}
}

func (s WebsocketServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{})
	if err != nil {
		slog.Debug("failed to accept websocket", "err", err)
		return
	}

	slog.Debug("accepted websocket", "conn", r.RemoteAddr)

	s.gm.ClientJoined(c)
}
