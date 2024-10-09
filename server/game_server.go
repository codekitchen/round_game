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

	logger.Debug("new client joined game", "game", game.id)
}

func (s *gameServer) clientJoined(c *websocket.Conn, logger *slog.Logger) (*game, error) {
	game := findGame()
	client := newClient(c, logger, s, game.id)
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

func (s *gameServer) clientGotMessage(c *client, msg []byte) {
	game, ok := games[c.game]
	if !ok {
		// TODO game is gone, client needs to go away too
		return
	}
	game.gotMessage(c, msg)
}

func (s *gameServer) clientDisconnected(c *client, _ error) {
	game, ok := games[c.game]
	if !ok {
		return
	}
	game.removeClient(c)
	c.logger.Debug("client left game", "game", game.id)
}
