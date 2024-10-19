package game

import (
	"expvar"
	"log/slog"
	"sync"
)

var totalGames *expvar.Int
var currentGames *expvar.Int

const MAX_PLAYERS = 10

func init() {
	totalGames = expvar.NewInt("total_games")
	currentGames = expvar.NewInt("current_games")
}

type GameManager struct {
	mu    sync.RWMutex
	wg    sync.WaitGroup
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

func (gm *GameManager) Stop() {
	gm.mu.Lock()
	for _, g := range gm.games {
		g.Stop()
	}
	gm.mu.Unlock()
	gm.wg.Wait()
}

func (gm *GameManager) FindGame() *Game {
	g := gm.findExistingGame()
	if g != nil {
		return g
	}
	return gm.createNewGame()
}

func (gm *GameManager) createNewGame() *Game {
	gm.mu.Lock()
	defer gm.mu.Unlock()

	g := newGame()
	gm.games[g.ID] = g
	gm.wg.Add(1)
	go gm.runGame(g)
	currentGames.Add(1)
	totalGames.Add(1)
	return g
}

func (gm *GameManager) findExistingGame() *Game {
	gm.mu.RLock()
	defer gm.mu.RUnlock()

	for _, g := range gm.games {
		if g.NumPlayers() < MAX_PLAYERS {
			return g
		}
	}
	return nil
}

func (gm *GameManager) runGame(g *Game) {
	defer gm.wg.Done()
	err := g.loop()
	if err == nil {
		slog.Debug("game loop ended", "game", g.ID)
	} else {
		slog.Error("game loop failed", "game", g.ID, "err", err)
	}

	gm.mu.Lock()
	defer gm.mu.Unlock()

	currentGames.Add(-1)
	delete(gm.games, g.ID)
}
