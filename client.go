package main

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/codekitchen/roundgame/internal/protocol"
	"github.com/coder/websocket"
	"google.golang.org/protobuf/proto"
)

type client struct {
	id     string
	ws     *websocket.Conn
	logger *slog.Logger
	game   *game
}

// client events:
// - client read a message
// - Close was called, time to disconnect
// - message waiting to write
// - error while reading or writing (timeout or other), need to disconnect and notify owner (game)

func (c *client) String() string {
	return c.id
}

func newClient(ws *websocket.Conn, id string, logger *slog.Logger, game *game) *client {
	c := &client{
		id:     id,
		ws:     ws,
		logger: logger,
		game:   game,
	}
	go c.run()
	c.logger.Info("new client joined game", "game", game.id)
	return c
}

func (c *client) run() {
	defer c.ws.CloseNow()
	for {
		msg, err := c.readMessage()
		if err != nil {
			err = fmt.Errorf("failed to read message: %w", err)
			c.disconnect(err)
			break
		}
		c.logger.Debug("received message", "gamemessage", msg)
		c.game.fromClients <- clientMessage{c, msg}
	}
}

func (c *client) disconnect(err error) {
	defer c.ws.CloseNow()
	if err == nil {
		c.logger.Debug("client disconnect")
	} else {
		c.logger.Error("client error, disconnecting", "err", err)
	}
	c.game.clientDisconnected(c, err)
}

func (c *client) readMessage() (*protocol.GameMessage, error) {
	// take a ctx
	// ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	// defer cancel()
	ctx := context.Background()

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

func (c *client) writeMessage(msg *protocol.GameMessage) error {
	buf, err := proto.Marshal(msg)
	if err != nil {
		return err
	}

	// move this to caller
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	defer cancel()

	return c.ws.Write(ctx, websocket.MessageBinary, buf)
}
