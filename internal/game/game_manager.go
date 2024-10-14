package game

import (
	"log/slog"
	"sync"

	"github.com/coder/websocket"

	"github.com/codekitchen/roundgame/internal/client"
)

// eventually this will have more logic around capping # of clients in a game,
// managing concurrently running games, etc. right now there's only ever
// one game at a time.

type GameManager struct {
	sync.RWMutex
	games map[GameID]*Game
}

// game manager events
// - find game for new client
// - create new game
// - game has ended, error or otherwise
// - server is shutting down

func NewGameManager() *GameManager {
	return &GameManager{
		games: make(map[GameID]*Game),
	}
}

// This gets called directly from the HTTP handler on multiple goroutines, so we need locking
func (gm *GameManager) ClientJoined(ws *websocket.Conn) {
	game := gm.findGame()
	c := client.New(ws, game.fromClients, game.logger)
	game.AddClient(c)
}

func (gm *GameManager) findGame() *Game {
	g := gm.findExistingGame()
	if g != nil {
		return g
	}

	// no games currently, start a new one
	gm.Lock()
	defer gm.Unlock()

	g = newGame()
	gm.games[g.ID] = g
	go gm.runGame(g)
	return g
}

func (gm *GameManager) findExistingGame() *Game {
	gm.RLock()
	defer gm.RUnlock()

	for _, g := range gm.games {
		// just pick the first game returned for now
		return g
	}
	return nil
}

func (gm *GameManager) runGame(g *Game) {
	err := g.loop()
	if err == nil {
		slog.Debug("game loop ended", "game", g.ID)
	} else {
		slog.Error("game loop failed", "game", g.ID, "err", err)
	}

	gm.Lock()
	defer gm.Unlock()

	delete(gm.games, g.ID)
}
