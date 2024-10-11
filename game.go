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

func newGame() *game {
	id := uuid.New()
	return &game{
		id:      id,
		seed:    rand.Int32(),
		clients: list.New[*client](),
		logger:  slog.Default().With("game", id),
	}
}

func (g *game) addClient(c *client) error {
	g.logger.Debug("new client joined game", "client", c)
	node := g.clients.InsertBefore(c, g.player)
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
	// replay past events to the new client
	// need to start as observer, replay all existing messages, and then switch to
	// player
	for _, msg := range g.events {
		err = c.writeMessage(msg)
		if err != nil {
			slog.Error("failed to replay message", "err", err)
			return err
		}
	}
	if g.player == nil {
		g.logger.Debug("promoting new client to player", "client", c)
		g.player = node

		err = c.writeMessage(&protocol.GameMessage{
			Frame: g.mostRecentFrame + 1,
			Msg: &protocol.GameMessage_RoleChange{
				RoleChange: &protocol.RoleChange{
					Role: protocol.Role_ROLE_PLAYER,
				},
			},
		})
		if err != nil {
			return err
		}
	}

	return err
}

func (g *game) clientDisconnected(c *client, _ error) {
	g.logger.Debug("client disconnected", "client", c)
	if c == g.player.Value {
		g.chooseNextPlayer(g.mostRecentFrame, false)
	}
	node := g.clients.Find(func(v *client) bool { return c == v })
	g.clients.Remove(node)
}

func (g *game) chooseNextPlayer(frame int32, allowSame bool) {
	prev := g.player
	g.player = g.player.NextOrFront()
	if g.player == nil || (!allowSame && g.player == prev) {
		// no more clients right now, nothing we can do but wait
		g.player = nil
		g.logger.Info("no more clients")
		return
	}
	g.logger.Debug("new player selected", "player", g.player.Value)
	// TODO: if this fails, how do we handle it? find another new player I guess
	g.changeRole(g.player.Value, protocol.Role_ROLE_PLAYER, frame)
}

func (g *game) addEvent(msg *protocol.GameMessage) {
	g.events = append(g.events, msg)
	g.mostRecentFrame = max(g.mostRecentFrame, msg.Frame)
}

func (g *game) gotClientMessage(source *client, msg *protocol.GameMessage) {
	if msg.GetPassControl() != nil {
		g.handlePassControlMessage(source, msg)
		return
	}

	g.addEvent(msg)
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

func (g *game) handlePassControlMessage(source *client, msg *protocol.GameMessage) {
	if source != g.player.Value {
		g.logger.Info("ignoring pass control message from non-player", "msg", msg, "source", source)
		return
	}
	// next player controls the next frame, not the current frame
	g.chooseNextPlayer(msg.Frame+1, true)
}

func (g *game) changeRole(c *client, role protocol.Role, frame int32) {
	err := c.writeMessage(&protocol.GameMessage{
		Frame: frame,
		Msg: &protocol.GameMessage_RoleChange{
			RoleChange: &protocol.RoleChange{
				Role: role,
			},
		},
	})
	if err != nil {
		slog.Error("failed to change role", "err", err)
	}
}
