# Round-Robin Game (Tetris)

The idea is that everybody currently on the site is all playing Tetris together.
Each time a player places a piece, control passes to the next player in the
queue. The rest of the players can watch the game and see how it's going in
near-real time.

I'm currently using the LittleJS engine to help with the game UI. I think using
it will be a win overall, even though I have to work around it in some ways,
like being careful not to trigger the physics system because of potential
floating point variance when playing back on other browsers that may
not even be running on the same CPU architecture.

## Game State and Replays

Game state is passed between players as a series of events, mostly player
inputs. This is much less data transfer than sending game state snapshots and
deltas.

A big problem with multiplayer games is different clients getting out of sync,
even though they're playing the same event stream. This can happen for many
reasons, including the floating point rounding mentioned above. It can also
happen when the game state depends on data accidentally not captured in the
event stream. To help mitigate this, I'm not doing any direct updating of game
state locally. The game records events locally, then replays that recording to
update the local UI. This helps define the entire game in terms of the event
stream.

Because of transfer delay, other players are always slightly behind the player
currently playing. The replay cannot advance any frames if it doesn't know what
frame the next event is going to fall on, or it may play past a frame and then
receive an event for that now-in-the-past frame, so the game has to completely
pause when the replay queue is empty. The plan is to define a number of frames
that we will wait for data on before resuming. If we stall too often, we'll
increase that number to buffer more, but intruduce more latency.

