package server

import (
	"log/slog"
	"net/http"
	"sync"

	"github.com/codekitchen/roundgame/internal/game"
	"github.com/coder/websocket"
)

type WebsocketServer struct {
	wg *sync.WaitGroup
	gm *game.GameManager
}

func New() *WebsocketServer {
	return &WebsocketServer{
		wg: new(sync.WaitGroup),
		gm: game.NewGameManager(),
	}
}

func (s *WebsocketServer) Stop() {
	s.gm.Stop()
	// drain remaining connections
	s.wg.Wait()
}

func (s WebsocketServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.wg.Add(1)
	defer s.wg.Done()

	ctx := r.Context()

	ws, err := websocket.Accept(w, r, &websocket.AcceptOptions{})
	if err != nil {
		slog.Debug("failed to accept websocket", "err", err)
		return
	}
	defer func() { _ = ws.CloseNow() }()

	slog.Debug("accepted websocket", "conn", r.RemoteAddr)

	// the HTTP request thread becomes the client.Client runloop thread
	g := s.gm.FindGame()
	g.RunClient(ctx, ws)
}
