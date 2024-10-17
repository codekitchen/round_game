package main

import (
	"context"
	"embed"
	"expvar"
	"fmt"
	"io/fs"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/codekitchen/roundgame/internal/server"
)

//go:embed web/dst
var static embed.FS

func main() {
	err := run()
	if err != nil {
		slog.Error("failed to run", "err", err)
		os.Exit(-1)
	}
}

func run() error {
	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	})))

	listenAddr := "localhost:4011"
	if len(os.Args) > 1 {
		listenAddr = os.Args[1]
	}

	l, err := net.Listen("tcp", listenAddr)
	if err != nil {
		return err
	}
	slog.Info(fmt.Sprintf("listening on http://%v", l.Addr()))

	files, _ := fs.Sub(static, "web/dst")

	handler := http.NewServeMux()
	handler.Handle("/ws", server.New())
	handler.Handle("/", http.FileServer(http.FS(files)))
	handler.Handle("/debug/vars", expvar.Handler())

	s := &http.Server{
		Handler:      handler,
		ReadTimeout:  time.Second * 10,
		WriteTimeout: time.Second * 10,
	}

	// TODO: use this callback to gracefully shut down the websocket connections
	// s.RegisterOnShutdown(func () {})

	errc := make(chan error, 1)
	go func() {
		errc <- s.Serve(l)
	}()

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt)
	select {
	case err := <-errc:
		slog.Error("failed to serve", "err", err)
	case sig := <-sigs:
		slog.Info("terminating", "signal", sig)
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	return s.Shutdown(ctx)
}
