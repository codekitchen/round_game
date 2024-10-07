package main

import (
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

	logger := slog.With("conn", r.RemoteAddr)
	game, err := s.clientJoined(c, logger)
	if err != nil {
		slog.Error("failed to join game", "err", err)
		c.CloseNow()
	}

	slog.Debug("new client joined game", "conn", r.RemoteAddr, "game", game.id)
}

func (s *gameServer) clientJoined(c *websocket.Conn, logger *slog.Logger) (*game, error) {
	game := findGame()
	client := newClient(c, logger, game.gotMessage)
	role := game.addClient(client)

	err := client.writeMessage(gameStartMessage{
		Type: "gameStart",
		Seed: game.seed,
		Role: role,
	})
	if role == "observer" && err == nil {
		// replay past events to the new client
		for _, msg := range game.events {
			err = client.write(msg)
			if err != nil {
				slog.Error("failed to replay message", "err", err)
				break
			}
		}
	}
	return game, err
}

func findGame() *game {
	for _, g := range games {
		return g
	}
	return newGame()
}
