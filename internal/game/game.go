package game

import (
	"context"
	"fmt"
	"log/slog"
	"math/rand/v2"
	"sync/atomic"
	"time"

	"github.com/codekitchen/roundgame/internal/container/list"
	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/coder/websocket"
)

const EndGameDelay = 0 * time.Second
const AllowedIdleTurns = 2

type GameID = string

type Game struct {
	ID              GameID
	seed            int32
	clients         *list.List[*client]
	player          *list.Node[*client]
	events          []*protocol.GameMessage
	mostRecentFrame int32
	logger          *slog.Logger

	stop        chan struct{}
	done        chan struct{}
	fromClients chan clientMessage
	newClients  chan *client

	clientsSeen        int
	idleTurnCounts     map[ClientID]int
	keyPressedThisTurn bool
	playerCount        atomic.Int32
}

var nextGameID atomic.Uint32

// game events:
// - client joined
// - client tells us it is disconnecting
// - client read a new message
// - game is ending, notify and disconnect all clients
// - write message to all clients, sometimes excluding the source client
// - Close was called, end game and notify/disconnect all clients

// RunClient starts a new client for this game using the given websocket
// connection. This blocks until the client disconnects, it's designed to be run
// on the HTTP connection thread.
func (g *Game) RunClient(ctx context.Context, ws *websocket.Conn) {
	runClient(ctx, ws, g)
}

// Stop the game, wait for it to shutdown. Only safe to call once.
func (g *Game) Stop() {
	close(g.stop)
	<-g.done
}

// NumPlayers returns the current numbers of players in the game.
// Safe to call from any thread.
func (g *Game) NumPlayers() int32 {
	return g.playerCount.Load()
}

func newGame() *Game {
	id := fmt.Sprintf("%d", nextGameID.Add(1))
	return &Game{
		ID:      id,
		seed:    rand.Int32(),
		clients: list.New[*client](),
		logger:  slog.Default().With("game", id),

		stop:        make(chan struct{}),
		done:        make(chan struct{}),
		fromClients: make(chan clientMessage),
		newClients:  make(chan *client),

		idleTurnCounts: make(map[ClientID]int),
	}
}

// runGame runs the game loop. It returns when the game is over.
func (g *Game) runGame() error {
	g.logger.Debug("starting new game")
	defer g.shutdown()
	var endGame <-chan time.Time

loop:
	for {
		if g.player == nil && endGame == nil && g.clientsSeen > 0 {
			// no players, start timer to end game
			endGame = time.After(EndGameDelay)
		}

		select {
		case c := <-g.newClients:
			g.addClient(c)
			endGame = nil
		case fc := <-g.fromClients:
			if fc.Err != nil {
				g.dropClient(fc.C, fc.Err)
				break
			}
			g.gotClientMessage(fc.C, fc.Msg)
		case <-endGame:
			g.logger.Debug("no players, ending game")
			break loop
		case <-g.stop:
			break loop
		}
	}

	return nil
}

func (g *Game) shutdown() {
	g.logger.Debug("shutting down game")
	g.player = nil
	for n := g.clients.Front(); n != nil; n = g.clients.Front() {
		n.Value.Stop(nil)
		g.clients.Remove(n)
	}
	close(g.done)
}

func (g *Game) kickClient(c *client, kickMessage *protocol.GameMessage) {
	g.logger.Debug("kicking client", "client", c.ID)
	c.Stop(kickMessage)
	g.clientDisconnected(c)
}

func (g *Game) dropClient(c *client, clientError error) {
	g.logger.Debug("dropping client", "client", c.ID, "error", clientError)
	c.Stop(nil)
	g.clientDisconnected(c)
}

func (g *Game) addClient(c *client) {
	g.logger.Debug("new client joined game", "client", c.ID)
	g.clientsSeen++
	node := g.clients.InsertBefore(c, g.player)
	g.playerCount.Add(1)
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
	c.SendMessage(&protocol.GameMessage{Msg: &protocol.GameMessage_Replay{
		Replay: &protocol.Replay{
			Messages: g.events[:],
		},
	}})

	// need to start as observer, replay all existing messages, and then switch to
	// player
	if g.player == nil {
		g.player = node
		g.notifyNewPlayer(g.mostRecentFrame + 1)
	}
	g.sendPlayerList()
}

func (g *Game) clientDisconnected(c *client) {
	node := g.clients.Find(func(v *client) bool { return c == v })
	if g.player == node {
		g.chooseNextPlayer(g.mostRecentFrame+1, false)
	}
	g.clients.Remove(node)
	g.playerCount.Add(-1)
	delete(g.idleTurnCounts, c.ID)
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
	g.notifyNewPlayer(frame)
}

func (g *Game) addEvent(msg *protocol.GameMessage) {
	if msg.GetGameEvent() != nil {
		// don't add things like heartbeats to the replay log
		g.events = append(g.events, msg)
		g.keyPressedThisTurn = true
	}
}

func (g *Game) gotClientMessage(source *client, msg *protocol.GameMessage) {
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

func (g *Game) handlePassControlMessage(source *client, msg *protocol.GameMessage) {
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

func (g *Game) updatePlayerIdleCount(c *client) {
	if g.keyPressedThisTurn {
		g.idleTurnCounts[c.ID] = 0
	} else {
		g.idleTurnCounts[c.ID]++
	}
}

func (g *Game) dropPlayerIfIdle(c *client) {
	if g.idleTurnCounts[c.ID] >= AllowedIdleTurns {
		kickMessage := &protocol.GameMessage{
			Msg: &protocol.GameMessage_Kicked{
				Kicked: &protocol.Kicked{
					Reason: protocol.KickReason_KICK_REASON_IDLE,
				},
			},
		}
		g.kickClient(c, kickMessage)
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
