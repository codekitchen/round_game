package client

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

type ClientMessage struct {
	C   *Client
	Msg *protocol.GameMessage
	Err error
}

type ClientID = string

type Client struct {
	ID     ClientID
	Name   string
	ws     *websocket.Conn
	logger *slog.Logger

	received chan<- ClientMessage
	sending  chan *protocol.GameMessage
	stop     chan *protocol.GameMessage
	stopped  chan struct{}
}

var playerNames = []string{"🐙", "🦊", "🦄", "🐼", "🦉", "🐳", "😺", "🍁", "🍀", "🌵", "🌲", "🌸", "🐹", "👾", "🎃"}

var nextClientID atomic.Uint32

func New(ws *websocket.Conn, logger *slog.Logger) *Client {
	id := fmt.Sprintf("%d", nextClientID.Add(1))
	c := &Client{
		ID:     id,
		Name:   playerNames[rand.IntN(len(playerNames))],
		ws:     ws,
		logger: logger.With("client", id),

		sending: make(chan *protocol.GameMessage),
		stop:    make(chan *protocol.GameMessage),
		stopped: make(chan struct{}),
	}
	totalPlayers.Add(1)
	currentPlayers.Add(1)
	return c
}

func (c *Client) Start(received chan<- ClientMessage) {
	c.received = received
	go c.loop()
}

// client events:
// - client read a message
// - Close was called, time to disconnect
// - message waiting to write
// - error while reading or writing (timeout or other), need to disconnect and notify owner (game)

func (c *Client) String() string {
	return c.ID
}

func (c *Client) Stop(finalMessage *protocol.GameMessage) {
	c.stop <- finalMessage
	<-c.stop
}

func (c *Client) loop() {
	defer func() { _ = c.ws.CloseNow() }()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var wg sync.WaitGroup
	wg.Add(3)
	go func() {
		defer wg.Done()
		c.readLoop(ctx)
	}()
	go func() {
		defer wg.Done()
		c.writeLoop(ctx)
	}()
	go func() {
		defer wg.Done()
		c.pingLoop(ctx)
	}()

	finalMessage := <-c.stop
	if finalMessage != nil {
		// ignore error on final send, nothing more we can do
		_ = c.writeMessage(ctx, finalMessage)
	}
	close(c.stopped)
	cancel()
	wg.Wait()
	c.logger.Debug("client disconnected")
	currentPlayers.Add(-1)
	c.stop <- nil
}

func (c *Client) readLoop(ctx context.Context) {
	for {
		msg, err := c.readMessage(ctx)
		select {
		case c.received <- ClientMessage{c, msg, err}:
		case <-c.stopped:
			return
		}
		if err != nil {
			return
		}
	}
}

func (c *Client) writeLoop(ctx context.Context) {
	for {
		select {
		case msg := <-c.sending:
			err := c.writeMessage(ctx, msg)
			if err != nil {
				select {
				// write errors get sent to the receiving queue
				case c.received <- ClientMessage{c, nil, err}:
				case <-c.stopped:
				}
				return
			}
		case <-c.stopped:
			return
		}
	}
}

// we send periodic "game pings" to the client so that it'll remain active
// when in a browser background tab
func (c *Client) pingLoop(ctx context.Context) {
	for {
		err := c.writeMessage(ctx, &protocol.GameMessage{
			Msg: &protocol.GameMessage_Ping{
				Ping: &protocol.GamePing{},
			},
		})
		if err != nil {
			select {
			// write errors get sent to the receiving queue
			case c.received <- ClientMessage{c, nil, err}:
			case <-c.stopped:
			}
			return
		}
		select {
		case <-c.stopped:
			return
		case <-time.After(50 * time.Millisecond):
		}
	}
}

func (c *Client) readMessage(ctx context.Context) (*protocol.GameMessage, error) {
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

func (c *Client) SendMessage(msg *protocol.GameMessage) {
	c.sending <- msg
}

func (c *Client) writeMessage(ctx context.Context, msg *protocol.GameMessage) error {
	// writes should happen quickly, unless buffers are way full, so timeout quickly
	ctx, cancel := context.WithTimeout(ctx, time.Second*1)
	defer cancel()

	buf, err := proto.Marshal(msg)
	if err != nil {
		return err
	}
	return c.ws.Write(ctx, websocket.MessageBinary, buf)
}
