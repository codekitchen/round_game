package main

import (
	"log/slog"
	"math/rand/v2"

	"github.com/google/uuid"
)

type gameStartMessage struct {
	Type string `json:"type"`
	Seed int32  `json:"seed"`
	Role string `json:"role"` // "player" or "observer"
}

type game struct {
	id      uuid.UUID
	seed    int32
	clients []*client
	player  *client
	events  [][]byte
}

var games = make(map[uuid.UUID]*game)

func newGame() *game {
	id := uuid.New()
	game := &game{
		id:   id,
		seed: rand.Int32(),
	}
	games[id] = game
	return game
}

func (g *game) addClient(c *client) string {
	g.clients = append(g.clients, c)
	role := "observer"
	if len(g.clients) == 1 {
		g.player = c
		role = "player"
	}
	return role
}

func (g *game) addEvent(msg []byte) {
	g.events = append(g.events, msg)
}

func (g *game) gotMessage(source *client, msg []byte) {
	// eventually we need to validate who sent the message,
	// and we need to differentiate between messages that become part of the
	// event log, vs other messages.
	g.addEvent(msg)
	// TODO: separate threads for writes to each client to avoid blocking
	for _, c := range g.clients {
		if c == source {
			continue
		}
		err := c.write(msg)
		if err != nil {
			slog.Error("failed to write message", "err", err)
		}
	}
}
