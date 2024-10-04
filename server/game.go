package main

import (
	"math/rand/v2"

	"github.com/google/uuid"
)

type gameStartMessage struct {
	Type string `json:"type"`
	Seed int32  `json:"seed"`
	Role string `json:"role"` // "player" or "observer"
}

type game struct {
	id       uuid.UUID
	seed     int32
	clients  []*client
	received chan []byte
}

var games = make(map[uuid.UUID]*game)

func newGame() *game {
	id := uuid.New()
	game := &game{
		id:       id,
		seed:     rand.Int32(),
		received: make(chan []byte),
	}
	games[id] = game
	return game
}

func (g *game) addClient(c *client) {
	g.clients = append(g.clients, c)
}

func (g *game) gotMessage(source *client, msg []byte) {
	for _, c := range g.clients {
		if c == source {
			continue
		}
		c.write(msg)
	}
}
