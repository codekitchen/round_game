# Client
- [x] basic tetris imlementation
- [x] record and replay an entire game
- [x] game over condition
- [x] UI events shouldn't be tied to server frame
- [x] player needs to handle UI events like player list from server, currently ignoring until observer
- [x] keep game going when in a background tab
- [x] fix littlejs usage to have separate gameupdate with our frame counter
- [x] keep and display score

# Server
- [x] serve static assets
- [x] accept players and observers
- [x] stream events to observers from player
- [x] accept new players and assign them to a game
- [x] relay state updates to players
- [x] choose next player on disconnect
- [x] save game recordings
- [x] switch players
- [x] logging
- [x] timeouts for client reading/writing
- [x] end game if no clients are connected for N seconds
- [x] keep retrying when electing new player fails
- [x] timeout player to keep the game moving if idle X turns
- [x] track some basic stats
- [ ] preserve stats across restarts somewhere persistent
- [x] fix replay to new clients, it's lagging
- [ ] diagram out the goroutines and communication/synchronization points by hand or https://mermaid.js.org/syntax/entityRelationshipDiagram.html

# Polish
- [ ] better rotation of pieces, it's wonky how they move around
- [ ] make it more obvious when disconnected, error occurs, etc
- [x] auto stop dropping (holding down arrow) when switching players
- [ ] hold down left/right to move, not just tap
- [x] Player username and emoji avatar
- [x] Show position in the queue
- [ ] notify "get ready" when they're next
- [x] Handle too many players joining (100 max?)
- [ ] Show some basic stats
- [ ] Better graphics!
- [ ] More juice!
- [ ] mobile support? would need virtual keyboard etc

# Deploy
- [x] Deploy to an instance, probably Fargate. Use aws copilot?
- [x] Switch from copilot+Fargate to just an EC2 instance, deploys are way too slow.
- [x] Will need HTTPS, so SSL cert. roundrobin.codekitchen.net?
- [x] Even faster deploys -- drop docker, just use static binary and systemctl

# Refactor
- [x] client role handling is smelly
- [x] client and game relationship is too intertwined, client shouldn't know about game
