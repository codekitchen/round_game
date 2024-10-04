package main

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/coder/websocket"
)

type gameServer struct {
}

func (s gameServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c, err := websocket.Accept(w, r, &websocket.AcceptOptions{})
	if err != nil {
		slog.Error("failed to accept websocket", "err", err)
		return
	}

	slog.Debug("accepted websocket", "conn", r.RemoteAddr)

	game, err := s.joinGame(c)
	if err != nil {
		slog.Error("failed to join game", "err", err)
		c.CloseNow()
	}

	slog.Debug("new client joined game", "conn", r.RemoteAddr, "game", game.id)
}

func (s *gameServer) joinGame(c *websocket.Conn) (game *game, err error) {
	// find or create a game
	for _, g := range games {
		game = g
		break
	}
	if game == nil {
		game = newGame()
	}

	client := newClient(c, game.gotMessage)
	game.addClient(client)

	role := "player"
	if len(game.clients) > 1 {
		role = "observer"
	}
	msg := gameStartMessage{
		Type: "gameStart",
		Seed: game.seed,
		Role: role,
	}
	buf, err := json.Marshal(msg)
	if err != nil {
		return nil, err
	}
	err = client.write(buf)
	return
}
