package game

import (
	"fmt"
	"log/slog"
	"math/rand/v2"
	"sync/atomic"
	"time"

	"github.com/codekitchen/roundgame/internal/client"
	"github.com/codekitchen/roundgame/internal/container/list"
	"github.com/codekitchen/roundgame/internal/protocol"
)

type GameID = string

type Game struct {
	ID              GameID
	seed            int32
	clients         *list.List[*client.Client]
	player          *list.Node[*client.Client]
	events          []*protocol.GameMessage
	mostRecentFrame int32
	logger          *slog.Logger

	stop        chan struct{}
	fromClients chan client.ClientMessage
	newClients  chan *client.Client
}

var nextGameID atomic.Uint32

// game events:
// - client joined
// - client tells us it is disconnecting
// - client read a new message
// - game is ending, notify and disconnect all clients
// - write message to all clients, sometimes excluding the source client
// - Close was called, end game and notify/disconnect all clients

func newGame() *Game {
	id := fmt.Sprintf("%d", nextGameID.Add(1))
	return &Game{
		ID:      id,
		seed:    rand.Int32(),
		clients: list.New[*client.Client](),
		logger:  slog.Default().With("game", id),

		stop:        make(chan struct{}),
		fromClients: make(chan client.ClientMessage),
		newClients:  make(chan *client.Client),
	}
}

func (g *Game) loop() error {
	g.logger.Debug("starting new game")
	defer g.shutdown()
	var endGame <-chan time.Time

loop:
	for {
		if g.player == nil && endGame == nil {
			// no players, start timer to end game
			endGame = time.After(time.Second * 10)
		}

		select {
		case c := <-g.newClients:
			g.addClient(c)
			endGame = nil
		case fc := <-g.fromClients:
			if fc.Err != nil {
				g.dropClient(fc.C)
				break
			}
			g.gotClientMessage(fc.C, fc.Msg)
		case <-endGame:
			g.logger.Debug("no players, ending game")
			g.Stop()
		case <-g.stop:
			break loop
		}
	}

	return nil
}

func (g *Game) Stop() {
	close(g.stop)
}

func (g *Game) shutdown() {
	g.logger.Debug("shutting down game")
	g.player = nil
	for n := g.clients.Front(); n != nil; n = g.clients.Front() {
		n.Value.Stop()
		g.clients.Remove(n)
	}
}

func (g *Game) dropClient(c *client.Client) {
	c.Stop()
	g.clientDisconnected(c)
}

func (g *Game) AddClient(c *client.Client) {
	// TODO: race condition, clients can be added to the chan and then the game
	// shuts down before they're read off the chan
	g.newClients <- c
}

func (g *Game) addClient(c *client.Client) {
	g.logger.Debug("new client joined game", "client", c)
	node := g.clients.InsertBefore(c, g.player)
	c.SendMessage(&protocol.GameMessage{
		Frame: 0,
		Msg: &protocol.GameMessage_GameInit{
			GameInit: &protocol.GameInit{
				Seed: g.seed,
			},
		},
	})
	// replay past events to the new client
	// TODO: this is happening on the main game thread, which could block
	// for too long if send buffers fill up. we do have a tight write timeout, though.
	for _, msg := range g.events {
		c.SendMessage(msg)
	}

	// need to start as observer, replay all existing messages, and then switch to
	// player
	if g.player == nil {
		g.logger.Debug("promoting new client to player", "client", c)
		g.player = node

		c.SendMessage(&protocol.GameMessage{
			Frame: g.mostRecentFrame + 1,
			Msg: &protocol.GameMessage_RoleChange{
				RoleChange: &protocol.RoleChange{
					Role: protocol.Role_ROLE_PLAYER,
				},
			},
		})
	}
}

func (g *Game) clientDisconnected(c *client.Client) {
	if g.player != nil && c == g.player.Value {
		g.chooseNextPlayer(g.mostRecentFrame, false)
	}
	node := g.clients.Find(func(v *client.Client) bool { return c == v })
	g.clients.Remove(node)
}

func (g *Game) chooseNextPlayer(frame int32, allowSame bool) {
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

func (g *Game) addEvent(msg *protocol.GameMessage) {
	if msg.GetGameEvent() != nil {
		// don't add things like heartbeats to the replay log
		g.events = append(g.events, msg)
	}
	g.mostRecentFrame = max(g.mostRecentFrame, msg.Frame)
}

func (g *Game) gotClientMessage(source *client.Client, msg *protocol.GameMessage) {
	if msg.GetPassControl() != nil {
		g.handlePassControlMessage(source, msg)
		return
	}

	g.addEvent(msg)

	for c := range g.clients.All() {
		if c == source {
			continue
		}
		c.SendMessage(msg)
	}
}

func (g *Game) handlePassControlMessage(source *client.Client, msg *protocol.GameMessage) {
	if source != g.player.Value {
		g.logger.Info("ignoring pass control message from non-player", "msg", msg, "source", source)
		return
	}
	// next player controls the next frame, not the current frame
	g.chooseNextPlayer(msg.Frame+1, true)
}

func (g *Game) changeRole(c *client.Client, role protocol.Role, frame int32) {
	c.SendMessage(&protocol.GameMessage{
		Frame: frame,
		Msg: &protocol.GameMessage_RoleChange{
			RoleChange: &protocol.RoleChange{
				Role: role,
			},
		},
	})
}
