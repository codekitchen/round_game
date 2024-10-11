package main

import (
	"log/slog"

	"github.com/coder/websocket"
)

// eventually this will have more logic around capping # of clients in a game,
// managing concurrently running games, etc. right now there's only ever
// one game at a time.

type gameManager struct {
	games map[gameID]*game
}

func newGameManager() *gameManager {
	return &gameManager{
		games: make(map[gameID]*game),
	}
}

func (gm *gameManager) clientJoined(c *websocket.Conn, id string) error {
	game := gm.findGame()
	logger := slog.With("client", id)
	client := newClient(c, id, logger, game)
	err := game.addClient(client)
	return err
}

func (gm *gameManager) findGame() *game {
	for _, g := range gm.games {
		return g
	}
	// no games currently, start a new one
	g := newGame()
	gm.games[g.id] = g
	return g
}
