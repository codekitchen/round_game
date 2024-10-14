package client

import (
	"context"
	"fmt"
	"log/slog"
	"sync/atomic"
	"time"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/coder/websocket"
	"google.golang.org/protobuf/proto"
)

type ClientMessage struct {
	C   *Client
	Msg *protocol.GameMessage
	Err error
}

type Client struct {
	ID     string
	ws     *websocket.Conn
	logger *slog.Logger

	received chan<- ClientMessage
	sending  chan *protocol.GameMessage
	stop     chan struct{}
}

var nextClientID atomic.Uint32

func New(ws *websocket.Conn, received chan ClientMessage, logger *slog.Logger) *Client {
	id := fmt.Sprintf("%d", nextClientID.Add(1))
	c := &Client{
		ID:     id,
		ws:     ws,
		logger: logger.With("client", id),

		received: received,
		sending:  make(chan *protocol.GameMessage),
		stop:     make(chan struct{}),
	}
	go c.loop()
	return c
}

// client events:
// - client read a message
// - Close was called, time to disconnect
// - message waiting to write
// - error while reading or writing (timeout or other), need to disconnect and notify owner (game)

func (c *Client) String() string {
	return c.ID
}

func (c *Client) Stop() {
	close(c.stop)
}

func (c *Client) loop() {
	defer c.ws.CloseNow()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go c.readLoop(ctx)
	go c.writeLoop(ctx)

	<-c.stop
	c.logger.Debug("client disconnected")
}

func (c *Client) readLoop(ctx context.Context) {
	for {
		msg, err := c.readMessage(ctx)
		select {
		case c.received <- ClientMessage{c, msg, err}:
		case <-c.stop:
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
				case <-c.stop:
					return
				}
			}
		case <-c.stop:
			return
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
	select {
	case c.sending <- msg:
	case <-c.stop:
	}
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