package main

import (
	"log/slog"

	"github.com/google/uuid"
)

type gameID = uuid.UUID

type gameStartMessage struct {
	Type string `json:"type"`
	Seed int32  `json:"seed"`
	Role string `json:"role"` // "player" or "observer"
}

type game struct {
	id      uuid.UUID
	seed    int32
	clients map[*client]struct{}
	player  *client
	events  [][]byte
}

func (g *game) addClient(c *client) string {
	g.clients[c] = struct{}{}
	role := "observer"
	if len(g.clients) == 1 {
		g.player = c
		role = "player"
	}
	return role
}

func (g *game) removeClient(c *client) {
	delete(g.clients, c)
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
	for c := range g.clients {
		if c == source {
			continue
		}
		err := c.write(msg)
		if err != nil {
			slog.Error("failed to write message", "err", err)
		}
	}
}
