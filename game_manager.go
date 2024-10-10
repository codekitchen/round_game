package main

import (
	"log/slog"
	"math/rand/v2"

	"github.com/coder/websocket"
	"github.com/google/uuid"
)

type gameManager struct {
	games map[uuid.UUID]*game
}

func (gm *gameManager) clientJoined(c *websocket.Conn, logger *slog.Logger) error {
	game := gm.findGame()
	client := newClient(c, logger, gm, game.id)
	err := game.addClient(client)
	return err
}

func (gm *gameManager) findGame() *game {
	for _, g := range gm.games {
		return g
	}
	return gm.newGame()
}

func (gm *gameManager) clientGotMessage(c *client, msg []byte) {
	game, ok := gm.games[c.game]
	if !ok {
		// TODO game is gone, client needs to go away too
		return
	}
	game.gotMessage(c, msg)
}

func (gm *gameManager) clientDisconnected(c *client, _ error) {
	game, ok := gm.games[c.game]
	if !ok {
		return
	}
	game.removeClient(c)
	c.logger.Debug("client left game", "game", game.id)
}

func (gm *gameManager) newGame() *game {
	id := uuid.New()
	game := &game{
		id:      id,
		seed:    rand.Int32(),
		clients: make(map[*client]struct{}),
	}
	gm.games[id] = game
	return game
}
