package main

import (
	"log/slog"
	"math/rand/v2"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/codekitchen/roundgame/util/list"

	"github.com/google/uuid"
)

type gameID = uuid.UUID

type game struct {
	id              gameID
	seed            int32
	clients         *list.List[*client]
	player          *list.Node[*client]
	events          []*protocol.GameMessage
	mostRecentFrame int32
	logger          *slog.Logger
}

func newGame(l *slog.Logger) *game {
	id := uuid.New()
	return &game{
		id:      id,
		seed:    rand.Int32(),
		clients: list.New[*client](),
		logger:  l.With("game", id),
	}
}

func (g *game) addClient(c *client) error {
	g.logger.Debug("new client joined game", "client", c)
	node := g.clients.InsertBefore(c, g.player)
	role := protocol.Role_ROLE_OBSERVER
	if g.player == nil {
		g.logger.Debug("promoting new client to player", "client", c)
		g.player = node
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
	g.logger.Debug("client disconnected", "client", c)
	if c == g.player.Value {
		g.chooseNextPlayer()
	}
	node := g.clients.Find(func(v *client) bool { return c == v })
	g.clients.Remove(node)
}

func (g *game) chooseNextPlayer() {
	prev := g.player
	g.player = g.player.NextOrFront()
	if g.player == nil || g.player == prev {
		// no more clients right now, nothing we can do but wait
		g.logger.Info("no more clients, waiting for new player")
		return
	}
	g.logger.Info("new player selected", "player", g.player.Value)
	// TODO: if this fails, how do we handle it? find another new player I guess
	g.player.Value.writeMessage(&protocol.GameMessage{
		Frame: g.mostRecentFrame,
		Msg: &protocol.GameMessage_RoleChange{
			RoleChange: &protocol.RoleChange{
				Role: protocol.Role_ROLE_PLAYER,
			},
		},
	})
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
	for c := range g.clients.All() {
		if c == source {
			continue
		}
		err := c.writeMessage(msg)
		if err != nil {
			slog.Error("failed to write message", "err", err)
		}
	}
}
