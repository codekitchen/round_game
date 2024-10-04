package main

import (
	"context"
	"log/slog"
	"time"

	"github.com/coder/websocket"
)

type client struct {
	ws *websocket.Conn
	cb func(*client, []byte)
}

func newClient(ws *websocket.Conn, cb func(*client, []byte)) *client {
	c := &client{
		ws: ws,
		cb: cb,
	}
	go c.run()
	return c
}

func (c *client) run() {
	defer c.ws.CloseNow()
	for {
		err := c.readMessage()
		if err != nil {
			slog.Error("failed to read message", "err", err)
			break
		}
	}
}

func (c *client) readMessage() error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	defer cancel()

	_, msg, err := c.ws.Read(ctx)
	if err != nil {
		return err
	}
	slog.Debug("received message", "msg", string(msg))
	c.cb(c, msg)
	return nil
}

func (c *client) write(msg []byte) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*2)
	defer cancel()

	return c.ws.Write(ctx, websocket.MessageText, msg)
}
