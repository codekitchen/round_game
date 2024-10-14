# Client
- [x] basic tetris imlementation
- [x] record and replay an entire game
- [ ] game over condition
- [ ] mobile support? would need virtual keyboard etc

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
- [ ] end game if no clients are connected for N seconds
- [x] keep retrying when electing new player fails
- [ ] timeout player quickly (2s?) if unresponsive, to keep the game moving

# Polish
- [ ] better rotation of pieces, it's wonky how they move around
- [x] auto stop dropping (holding down arrow) when switching players
- [ ] hold down left/right to move, not just tap
- [ ] Player username and emoji avatar
- [ ] Show position in the queue and notify when they're next
- [ ] Handle too many players joining (100 max?)
- [ ] Show some basic stats
- [ ] Better graphics!
- [ ] More juice!

# Deploy
- [x] Deploy to an instance, probably Fargate. Use aws copilot?
- [x] Switch from copilot+Fargate to just an EC2 instance, deploys are way too slow.
- [x] Will need HTTPS, so SSL cert. roundrobin.codekitchen.net?

# Refactor
- [x] client role handling is smelly
