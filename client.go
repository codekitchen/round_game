package main

import (
	"context"
	"log/slog"
	"time"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/coder/websocket"
	"google.golang.org/protobuf/proto"
)

type client struct {
	ID     string `json:"id"`
	ws     *websocket.Conn
	logger *slog.Logger

	received chan<- clientMessage
	sending  chan *protocol.GameMessage
	stop     chan struct{}
}

// client events:
// - client read a message
// - Close was called, time to disconnect
// - message waiting to write
// - error while reading or writing (timeout or other), need to disconnect and notify owner (game)

func (c *client) String() string {
	return c.ID
}

func (c *client) loop() {
	defer c.ws.CloseNow()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go c.readLoop(ctx)
	go c.writeLoop(ctx)

	<-c.stop
	c.logger.Debug("client disconnected")
}

func (c *client) readLoop(ctx context.Context) {
	for {
		msg, err := c.readMessage(ctx)
		select {
		case c.received <- clientMessage{c, msg, err}:
		case <-c.stop:
			return
		}
		if err != nil {
			return
		}
	}
}

func (c *client) writeLoop(ctx context.Context) {
	for {
		select {
		case msg := <-c.sending:
			err := c.writeMessage(ctx, msg)
			if err != nil {
				select {
				// write errors get sent to the receiving queue
				case c.received <- clientMessage{c, nil, err}:
				case <-c.stop:
					return
				}
			}
		case <-c.stop:
			return
		}
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

func (c *client) sendMessage(msg *protocol.GameMessage) {
	select {
	case c.sending <- msg:
	case <-c.stop:
	}
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
