package main

import (
	"log/slog"
	"math/rand/v2"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/codekitchen/roundgame/util"

	"github.com/google/uuid"
)

type gameID = uuid.UUID

type game struct {
	id              gameID
	seed            int32
	clients         util.Set[*client]
	player          *client
	events          []*protocol.GameMessage
	mostRecentFrame int32
}

func newGame() *game {
	id := uuid.New()
	return &game{
		id:      id,
		seed:    rand.Int32(),
		clients: make(util.Set[*client]),
	}
}

func (g *game) addClient(c *client) error {
	g.clients.Add(c)
	role := protocol.Role_ROLE_OBSERVER
	if len(g.clients) == 1 {
		g.player = c
		role = protocol.Role_ROLE_PLAYER
	}
	err := c.writeMessage(&protocol.GameMessage{
		Frame: 0,
		Msg: &protocol.GameMessage_GameInit{
			GameInit: &protocol.GameInit{
				Seed: g.seed,
			},
		},
	})
	if err != nil {
		return err
	}
	err = c.writeMessage(&protocol.GameMessage{
		Frame: 0,
		Msg: &protocol.GameMessage_RoleChange{
			RoleChange: &protocol.RoleChange{
				Role: role,
			},
		},
	})
	if err != nil {
		return err
	}

	if role == protocol.Role_ROLE_OBSERVER {
		// replay past events to the new client
		for _, msg := range g.events {
			err = c.writeMessage(msg)
			if err != nil {
				slog.Error("failed to replay message", "err", err)
				break
			}
		}
	}
	return err
}

func (g *game) clientDisconnected(c *client, _ error) {
	g.clients.Remove(c)
	if g.player == c {
		// we need to find a new player, this one left
		newplayer, _ := g.clients.First()
		if newplayer == nil {
			// TODO: no clients for this game anymore
			return
		}
		g.player = newplayer
		// TODO: if this fails, how do we handle it? find another new player I guess
		newplayer.writeMessage(&protocol.GameMessage{
			Frame: g.mostRecentFrame,
			Msg: &protocol.GameMessage_RoleChange{
				RoleChange: &protocol.RoleChange{
					Role: protocol.Role_ROLE_PLAYER,
				},
			},
		})
	}
}

func (g *game) addEvent(msg *protocol.GameMessage) {
	g.events = append(g.events, msg)
}

func (g *game) gotClientMessage(source *client, msg *protocol.GameMessage) {
	// eventually we need to validate who sent the message,
	// and we need to differentiate between messages that become part of the
	// event log, vs other messages.
	g.addEvent(msg)
	g.mostRecentFrame = max(g.mostRecentFrame, msg.Frame)
	// TODO: separate threads for writes to each client to avoid blocking
	for c := range g.clients {
		if c == source {
			continue
		}
		err := c.writeMessage(msg)
		if err != nil {
			slog.Error("failed to write message", "err", err)
		}
	}
}
