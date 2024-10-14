package main

import (
	"log/slog"
	"sync"

	"github.com/coder/websocket"

	"github.com/codekitchen/roundgame/internal/client"
)

// eventually this will have more logic around capping # of clients in a game,
// managing concurrently running games, etc. right now there's only ever
// one game at a time.

type gameManager struct {
	sync.RWMutex
	games map[gameID]*game
}

// game manager events
// - find game for new client
// - create new game
// - game has ended, error or otherwise
// - server is shutting down

func newGameManager() *gameManager {
	return &gameManager{
		games: make(map[gameID]*game),
	}
}

// This gets called directly from the HTTP handler on multiple goroutines, so we need locking
func (gm *gameManager) clientJoined(ws *websocket.Conn) {
	game := gm.findGame()
	c := client.New(ws, game.fromClients, game.logger)
	game.AddClient(c)
}

func (gm *gameManager) findGame() *game {
	g := gm.findExistingGame()
	if g != nil {
		return g
	}

	// no games currently, start a new one
	gm.Lock()
	defer gm.Unlock()

	g = newGame()
	gm.games[g.id] = g
	go gm.runGame(g)
	return g
}

func (gm *gameManager) findExistingGame() *game {
	gm.RLock()
	defer gm.RUnlock()

	for _, g := range gm.games {
		// just pick the first game returned for now
		return g
	}
	return nil
}

func (gm *gameManager) runGame(g *game) {
	err := g.loop()
	if err == nil {
		slog.Debug("game loop ended", "game", g.id)
	} else {
		slog.Error("game loop failed", "game", g.id, "err", err)
	}

	gm.Lock()
	defer gm.Unlock()

	delete(gm.games, g.id)
}
