package main

import (
	"log/slog"
	"math/rand/v2"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/codekitchen/roundgame/util/list"

	"github.com/google/uuid"
)

type gameID = uuid.UUID

type clientMessage struct {
	c   *client
	msg *protocol.GameMessage
	err error
}

type game struct {
	id              gameID
	seed            int32
	clients         *list.List[*client]
	player          *list.Node[*client]
	events          []*protocol.GameMessage
	mostRecentFrame int32
	logger          *slog.Logger

	stop        chan struct{}
	fromClients chan clientMessage
}

// game events:
// - client joined
// - client tells us it is disconnecting
// - client read a new message
// - game is ending, notify and disconnect all clients
// - write message to all clients, sometimes excluding the source client
// - Close was called, end game and notify/disconnect all clients

func newGame() *game {
	id := uuid.New()
	return &game{
		id:      id,
		seed:    rand.Int32(),
		clients: list.New[*client](),
		logger:  slog.Default().With("game", id),

		stop:        make(chan struct{}),
		fromClients: make(chan clientMessage),
	}
}

func (g *game) loop() error {
loop:
	for {
		select {
		case fc := <-g.fromClients:
			if fc.err != nil {
				close(fc.c.stop)
				g.clientDisconnected(fc.c, fc.err)
				break
			}
			g.gotClientMessage(fc.c, fc.msg)
		case <-g.stop:
			break loop
		}
	}
	return nil
}

func (g *game) addClient(c *client) {
	g.logger.Debug("new client joined game", "client", c)
	node := g.clients.InsertBefore(c, g.player)
	c.sendMessage(&protocol.GameMessage{
		Frame: 0,
		Msg: &protocol.GameMessage_GameInit{
			GameInit: &protocol.GameInit{
				Seed: g.seed,
			},
		},
	})
	// replay past events to the new client
	// TODO: this could block for a long time here if the client is slow
	// to read the messages.
	// need to start as observer, replay all existing messages, and then switch to
	// player
	for _, msg := range g.events {
		c.sendMessage(msg)
	}
	if g.player == nil {
		g.logger.Debug("promoting new client to player", "client", c)
		g.player = node

		c.sendMessage(&protocol.GameMessage{
			Frame: g.mostRecentFrame + 1,
			Msg: &protocol.GameMessage_RoleChange{
				RoleChange: &protocol.RoleChange{
					Role: protocol.Role_ROLE_PLAYER,
				},
			},
		})
	}
}

func (g *game) clientDisconnected(c *client, _ error) {
	g.logger.Debug("client disconnected", "client", c)
	if g.player != nil && c == g.player.Value {
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

	// don't add things like heartbeats to the replay log
	if msg.GetGameEvent() != nil {
		g.addEvent(msg)
	}

	// TODO: separate threads for writes to each client to avoid blocking
	for c := range g.clients.All() {
		if c == source {
			continue
		}
		c.sendMessage(msg)
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
	c.sendMessage(&protocol.GameMessage{
		Frame: frame,
		Msg: &protocol.GameMessage_RoleChange{
			RoleChange: &protocol.RoleChange{
				Role: role,
			},
		},
	})
}
