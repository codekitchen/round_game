# Round Game (Co-op Multiplayer Tetris Clone)

Experiments with a massively multiplayer round-robin co-op game. For [Recurse F2'24](https://www.recurse.com).

Server is golang, client is browser-based, in typescript. Communication is [protocol buffers](api/gameserver.proto) over websockets.

The game is live (for now) at https://roundgame.codekitchen.net/

## Running

You will need go >= `1.23.1` and node/npm >= `23.1.0`. For development hot reloading I'm using overmind, which is available via `brew install overmind`. Other Procfile runners will probably work, too.

The web UI resides in the [web](web/) folder. You will need a `cd web && npm install` to get set up.

For development, run `overmind start`. Click the link to open the web UI.

Production builds are a multistep process because of the web app bundling. Run `make roundgame_amd64` or see the Makefile for details.
