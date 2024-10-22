package game

import (
	"context"
	"expvar"
	"fmt"
	"log/slog"
	"sync"
	"sync/atomic"
	"time"

	"math/rand/v2"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/coder/websocket"
	"google.golang.org/protobuf/proto"
)

var totalPlayers *expvar.Int
var currentPlayers *expvar.Int

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
	sending   chan *protocol.GameMessage
	// closed is closed when the ws connection is closed due to error/disconnect
	closed     chan struct{}
	done       chan struct{}
	errorMutex sync.Mutex
	cancel     func()
}

var playerNames = []string{"🐙", "🦊", "🦄", "🐼", "🦉", "🐳", "😺", "🍁", "🍀", "🌵", "🌲", "🌸", "🐹", "👾", "🎃"}

var nextClientID atomic.Uint32

func newClient(ws *websocket.Conn, gameQueue chan<- clientMessage, cancel func()) *client {
	id := fmt.Sprintf("%d", nextClientID.Add(1))
	c := &client{
		ID:     id,
		Name:   playerNames[rand.IntN(len(playerNames))],
		ws:     ws,
		logger: slog.With("client", id),

		gameQueue: gameQueue,
		sending:   make(chan *protocol.GameMessage),
		closed:    make(chan struct{}),
		done:      make(chan struct{}),
		cancel:    cancel,
	}
	totalPlayers.Add(1)
	currentPlayers.Add(1)
	return c
}

// client events:
// - client read a message
// - Close was called, time to disconnect
// - message waiting to write
// - error while reading or writing (timeout or other), need to disconnect and notify owner (game)

func (c *client) String() string {
	return c.ID
}

func (c *client) SendMessage(msg *protocol.GameMessage) {
	select {
	case c.sending <- msg:
	case <-c.closed:
		// client has started shutdown, ignore message
	}
}

// Stop the client, send an optional final message and wait for the client to stop.
func (c *client) Stop(finalMessage *protocol.GameMessage) {
	if finalMessage != nil {
		c.SendMessage(finalMessage)
	}
	// force close the connection to shutdown the client
	c.ws.CloseNow()
	c.cancel()
	<-c.done
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

	go func() {
		c.writeLoop(ctx)
	}()

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
			c.handleError()
		}
		select {
		case c.gameQueue <- clientMessage{c, msg, err}:
		case <-ctx.Done():
			return
		}
		if err != nil {
			return
		}
	}
}

func (c *client) writeLoop(ctx context.Context) {
	ping := time.Tick(50 * time.Millisecond)
	for {
		select {
		case msg := <-c.sending:
			err := c.writeMessage(ctx, msg)
			if err != nil {
				c.handleError()
				select {
				// write errors get sent to the receiving queue
				case c.gameQueue <- clientMessage{c, nil, err}:
				case <-ctx.Done():
				}
				return
			}
		case <-ping:
			err := c.writeMessage(ctx, &protocol.GameMessage{
				Msg: &protocol.GameMessage_Ping{
					Ping: &protocol.GamePing{},
				},
			})
			if err != nil {
				c.handleError()
				select {
				// write errors get sent to the receiving queue
				case c.gameQueue <- clientMessage{c, nil, err}:
				case <-ctx.Done():
				}
				return
			}
		case <-ctx.Done():
			return
		}
	}
}

func (c *client) handleError() {
	c.errorMutex.Lock()
	defer c.errorMutex.Unlock()
	c.ws.CloseNow()
	select {
	case <-c.closed:
		return
	default:
		close(c.closed)
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
