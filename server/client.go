package main

import (
	"context"
	"encoding/json"
	"log/slog"
	"time"

	"github.com/coder/websocket"
)

type client struct {
	ws     *websocket.Conn
	logger *slog.Logger
	cb     func(*client, []byte)
}

func newClient(ws *websocket.Conn, logger *slog.Logger, cb func(*client, []byte)) *client {
	c := &client{
		ws:     ws,
		logger: logger,
		cb:     cb,
	}
	go c.run()
	return c
}

func (c *client) run() {
	defer c.ws.CloseNow()
	for {
		err := c.readMessage()
		if err != nil {
			c.logger.Error("failed to read message", "err", err)
			break
		}
	}
	// TODO: notify game server on client disconnect
}

func (c *client) readMessage() error {
	// ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	// defer cancel()
	ctx := context.Background()

	_, msg, err := c.ws.Read(ctx)
	if err != nil {
		return err
	}
	c.logger.Debug("received message", "msg", string(msg))
	c.cb(c, msg)
	return nil
}

func (c *client) writeMessage(msg any) error {
	buf, err := json.Marshal(msg)
	if err != nil {
		return err
	}
	return c.write(buf)
}

func (c *client) write(buf []byte) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	defer cancel()

	return c.ws.Write(ctx, websocket.MessageText, buf)
}
