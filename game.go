package main

import (
	"log/slog"

	"github.com/google/uuid"
)

type gameID = uuid.UUID

type gameStartMessage struct {
	Type string `json:"type"`
	Seed int32  `json:"seed"`
}

type roleChangeMessage struct {
	Type string `json:"type"`
	Role string `json:"role"` // "player" or "observer"
}

type game struct {
	id      uuid.UUID
	seed    int32
	clients map[*client]struct{}
	player  *client
	events  [][]byte
}

func (g *game) addClient(c *client) error {
	g.clients[c] = struct{}{}
	role := "observer"
	if len(g.clients) == 1 {
		g.player = c
		role = "player"
	}
	err := c.writeMessage(gameStartMessage{
		Type: "gameStart",
		Seed: g.seed,
	})
	if err != nil {
		return err
	}
	err = c.writeMessage(roleChangeMessage{
		Type: "roleChange",
		Role: role,
	})
	if err != nil {
		return err
	}

	if role == "observer" {
		// replay past events to the new client
		for _, msg := range g.events {
			err = c.write(msg)
			if err != nil {
				slog.Error("failed to replay message", "err", err)
				break
			}
		}
	}
	return err
}

func (g *game) removeClient(c *client) {
	delete(g.clients, c)
	if g.player == c {
		// we need to find a new player, this one left
		var newplayer *client
		for c2 := range g.clients {
			newplayer = c2
			break
		}
		if newplayer == nil {
			// TODO: no clients for this game anymore
			return
		}
		g.player = newplayer
		// TODO: if this fails, how do we handle it? find another new player I guess
		newplayer.writeMessage(roleChangeMessage{
			Type: "roleChange",
			Role: "player",
		})
	}
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
