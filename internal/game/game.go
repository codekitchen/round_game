package game

import (
	"errors"
	"fmt"
	"log/slog"
	"math/rand/v2"
	"sync/atomic"
	"time"

	"github.com/codekitchen/roundgame/internal/client"
	"github.com/codekitchen/roundgame/internal/container/list"
	"github.com/codekitchen/roundgame/internal/protocol"
)

var (
	ErrGameStopped = errors.New("game stopped")
)

const EndGameDelay = 0
const AllowedIdleTurns = 2

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

	idleTurnCounts     map[client.ClientID]int
	keyPressedThisTurn bool
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

		idleTurnCounts: make(map[client.ClientID]int),
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
			endGame = time.After(EndGameDelay)
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

func (g *Game) NumPlayers() int {
	return g.clients.Len()
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
	g.logger.Debug("error from client, dropping", "client", c)
	c.Stop()
	g.logger.Debug("client dropped", "client", c)
	g.clientDisconnected(c)
}

func (g *Game) AddClient(c *client.Client) error {
	select {
	case g.newClients <- c:
		return nil
	case <-g.stop:
		return ErrGameStopped
	}
}

func (g *Game) addClient(c *client.Client) {
	g.logger.Debug("new client joined game", "client", c)
	node := g.clients.InsertBefore(c, g.player)
	c.SendMessage(&protocol.GameMessage{
		Frame: 0,
		Msg: &protocol.GameMessage_GameInit{
			GameInit: &protocol.GameInit{
				Seed: g.seed,
				YourPlayer: &protocol.Player{
					Id:   c.ID,
					Name: c.Name,
				},
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
		g.notifyNewPlayer(g.mostRecentFrame + 1)
	}
	g.sendPlayerList()
}

func (g *Game) clientDisconnected(c *client.Client) {
	node := g.clients.Find(func(v *client.Client) bool { return c == v })
	if g.player == node {
		g.chooseNextPlayer(g.mostRecentFrame+1, false)
	}
	g.clients.Remove(node)
	g.sendPlayerList()
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
	g.notifyNewPlayer(frame)
}

func (g *Game) addEvent(msg *protocol.GameMessage) {
	if msg.GetGameEvent() != nil {
		// don't add things like heartbeats to the replay log
		g.events = append(g.events, msg)
		g.keyPressedThisTurn = true
	}
}

func (g *Game) gotClientMessage(source *client.Client, msg *protocol.GameMessage) {
	if g.player != nil && source == g.player.Value {
		g.mostRecentFrame = max(g.mostRecentFrame, msg.Frame)
	}
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
	previousPlayer := g.player.Value
	g.updatePlayerIdleCount(previousPlayer)
	// next player controls the next frame, not the current frame
	g.chooseNextPlayer(msg.Frame+1, true)
	g.dropPlayerIfIdle(previousPlayer)
	g.sendPlayerList()
}

func (g *Game) updatePlayerIdleCount(c *client.Client) {
	if g.keyPressedThisTurn {
		g.idleTurnCounts[c.ID] = 0
	} else {
		g.idleTurnCounts[c.ID]++
	}
}

func (g *Game) dropPlayerIfIdle(c *client.Client) {
	if g.idleTurnCounts[c.ID] >= AllowedIdleTurns {
		g.logger.Debug("player was idle for too long, dropping client", "client", g.player.Value)
		g.dropClient(c)
	}
}

func (g *Game) notifyNewPlayer(frame int32) {
	g.keyPressedThisTurn = false
	g.player.Value.SendMessage(&protocol.GameMessage{
		Frame: frame,
		Msg: &protocol.GameMessage_PlayerChange{
			PlayerChange: &protocol.PlayerChange{
				Player: g.player.Value.ID,
			},
		},
	})
}

func (g *Game) sendPlayerList() {
	list := &protocol.PlayerList{}
	if g.player != nil {
		list.CurrentPlayerID = g.player.Value.ID
	}
	for c := range g.clients.All() {
		list.Players = append(list.Players, &protocol.Player{
			Id:   c.ID,
			Name: c.Name,
		})
	}
	for c := range g.clients.All() {
		c.SendMessage(&protocol.GameMessage{
			Msg: &protocol.GameMessage_PlayerList{
				PlayerList: list,
			},
		})
	}
}
