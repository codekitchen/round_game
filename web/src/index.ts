import { game } from "./game"
import { engineInit, setCameraPos, setCanvasFixedSize, setEnablePhysicsSolver, setShowWatermark, vec2 } from "./littlejs.esm"
import { TetrisGame } from "./tetris_game"

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // called once after the engine starts up
  // setup the game
  setCanvasFixedSize(vec2(1280, 720));
  let levelSize = TetrisGame.GameSize;
  setCameraPos(levelSize.scale(.5));
  // turn off collisions to avoid accidentally using them
  setEnablePhysicsSolver(false);
  setShowWatermark(false);
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  // called every frame at 60 frames per second
  // handle input and update the game state
  game.update();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {
  // called after physics and objects are updated
  // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  // called before objects are rendered
  // draw any background effects that appear behind objects
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  // called after objects are rendered
  // draw effects or hud that appear above all objects
  game.renderPost();
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
