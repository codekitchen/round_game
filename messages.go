package main

type gameStartMessage struct {
	Type string `json:"type"`
	Seed int32  `json:"seed"`
}

type roleChangeMessage struct {
	Type string `json:"type"`
	Role string `json:"role"` // "player" or "observer"
}
