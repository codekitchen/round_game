package game

import (
	"expvar"
	"log/slog"
	"sync"

	"github.com/coder/websocket"

	"github.com/codekitchen/roundgame/internal/client"
)

var totalGames *expvar.Int
var currentGames *expvar.Int

func init() {
	totalGames = expvar.NewInt("total_games")
	currentGames = expvar.NewInt("current_games")
}

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
	// keep trying games until we successfully add the client to one
	for {
		game := gm.findGame()
		c := client.New(ws, game.logger)
		err := game.AddClient(c)
		if err == nil {
			c.Start(game.fromClients)
			break
		}
	}
}

func (gm *GameManager) findGame() *Game {
	g := gm.findExistingGame()
	if g != nil {
		return g
	}
	return gm.createNewGame()
}

func (gm *GameManager) createNewGame() *Game {
	gm.Lock()
	defer gm.Unlock()

	g := newGame()
	gm.games[g.ID] = g
	go gm.runGame(g)
	currentGames.Add(1)
	totalGames.Add(1)
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

	currentGames.Add(-1)
	delete(gm.games, g.ID)
}
