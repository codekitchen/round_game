package game

import (
	"context"
	"expvar"
	"fmt"
	"log/slog"
	"sync/atomic"
	"time"

	"math/rand/v2"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/coder/websocket"
	"google.golang.org/protobuf/proto"
)

var totalPlayers *expvar.Int
var currentPlayers *expvar.Int

const sendBufferLen = 32

func init() {
	totalPlayers = expvar.NewInt("total_players")
	currentPlayers = expvar.NewInt("current_players")
}

type clientMessage struct {
	C   *client
	Msg *protocol.GameMessage
	Err error
}

type ClientID = string

type client struct {
	ID     ClientID
	Name   string
	ws     *websocket.Conn
	logger *slog.Logger

	gameQueue chan<- clientMessage
	sendQueue chan *protocol.GameMessage
	// closed when this client is done shutting down
	done chan struct{}
	// used internally to cancel the ctx
	cancel func()
}

var playerNames = []string{"🐙", "🦊", "🦄", "🐼", "🦉", "🐳", "😺", "🍁", "🍀", "🌵", "🌲", "🌸", "🐹", "👾", "🎃"}

var nextClientID atomic.Uint32

// client events:
// - client read a message
// - Close was called, time to disconnect
// - message waiting to write
// - error while reading or writing (timeout or other), need to disconnect and notify owner (game)

// SendMessage sends a message to this client.
// If the send queue is full, the message is dropped and the client connection is closed.
func (c *client) SendMessage(msg *protocol.GameMessage) {
	select {
	case c.sendQueue <- msg:
	default:
		c.logger.Debug("send buffer full, dropping client")
		c.ws.CloseNow()
	}
}

// Stop the client and close the connection.
// Blocks until the client is done shutting down.
// If finalMessage != nil, attempts to send an optional final message first.
func (c *client) Stop(finalMessage *protocol.GameMessage) {
	if finalMessage != nil {
		c.SendMessage(finalMessage)
	}
	// force close the connection to shutdown the client
	c.ws.CloseNow()
	c.cancel()
	<-c.done
}

func newClient(ws *websocket.Conn, gameQueue chan<- clientMessage, cancel func()) *client {
	id := fmt.Sprintf("%d", nextClientID.Add(1))
	c := &client{
		ID:     id,
		Name:   playerNames[rand.IntN(len(playerNames))],
		ws:     ws,
		logger: slog.With("client", id),

		gameQueue: gameQueue,
		sendQueue: make(chan *protocol.GameMessage, sendBufferLen),
		done:      make(chan struct{}),
		cancel:    cancel,
	}
	totalPlayers.Add(1)
	currentPlayers.Add(1)
	return c
}

func runClient(ctx context.Context, ws *websocket.Conn, g *Game) {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	c := newClient(ws, g.fromClients, cancel)
	select {
	case g.newClients <- c:
	case <-g.stop:
		c.logger.Error("client joined as game is stopping", "game", g, "client", c)
		return
	}

	go c.writeLoop(ctx)

	// blocks until the connection is closed, either due to context
	// cancel or connection error
	c.readLoop(ctx)

	c.logger.Debug("client disconnected")
	currentPlayers.Add(-1)
	close(c.done)
}

func (c *client) readLoop(ctx context.Context) {
	for {
		msg, err := c.readMessage(ctx)
		if err != nil {
			c.handleError(ctx, err)
			return
		}
		select {
		case c.gameQueue <- clientMessage{c, msg, err}:
		case <-ctx.Done():
			return
		}
	}
}

func (c *client) writeLoop(ctx context.Context) {
	ping := time.Tick(50 * time.Millisecond)
	for {
		var msg *protocol.GameMessage
		select {
		case <-ctx.Done():
			return
		case msg = <-c.sendQueue:
		case <-ping:
			msg = &protocol.GameMessage{
				Msg: &protocol.GameMessage_Ping{
					Ping: &protocol.GamePing{},
				},
			}
		}
		err := c.writeMessage(ctx, msg)
		if err != nil {
			c.handleError(ctx, err)
			return
		}
	}
}

// called for error in read/write loops, do not call from the game loop thread!
func (c *client) handleError(ctx context.Context, err error) {
	c.ws.CloseNow()
	select {
	// notify the game of error
	case c.gameQueue <- clientMessage{c, nil, err}:
	// but if the game already knows and is closing us, ignore the error. otherwise
	// we deadlock with the game trying to close us, and us trying to notify the
	// game.
	case <-ctx.Done():
	}
}

func (c *client) readMessage(ctx context.Context) (*protocol.GameMessage, error) {
	_, buf, err := c.ws.Read(ctx)
	if err != nil {
		return nil, err
	}
	msg := &protocol.GameMessage{}
	err = proto.Unmarshal(buf, msg)
	if err != nil {
		return nil, err
	}
	return msg, nil
}

func (c *client) writeMessage(ctx context.Context, msg *protocol.GameMessage) error {
	// writes should happen quickly, unless buffers are way full, so timeout quickly
	ctx, cancel := context.WithTimeout(ctx, time.Second*1)
	defer cancel()

	buf, err := proto.Marshal(msg)
	if err != nil {
		return err
	}
	return c.ws.Write(ctx, websocket.MessageBinary, buf)
}
