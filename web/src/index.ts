import { game } from "./game"
import { engineInit, glInitPostProcess, setCameraPos, setCanvasFixedSize, setEnablePhysicsSolver, setShowWatermark, vec2 } from "./littlejs.esm"
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
  // initPostProcess();
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

function initPostProcess() {
  // shader taken from the littlejs breakout example at
  // https://github.com/KilledByAPixel/LittleJS/blob/a2d86ab196f46c701729b1f2cf9e7a61832beb4d/examples/breakout/game.js
  const televisionShader = `
    // Simple TV Shader Code
    float hash(vec2 p)
    {
        p=fract(p*.3197);
        return fract(1.+sin(51.*p.x+73.*p.y)*13753.3);
    }
    float noise(vec2 p)
    {
        vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+1.),u.x),u.y);
    }
    void mainImage(out vec4 c, vec2 p)
    {
        // put uv in texture pixel space
        p /= iResolution.xy;

        // apply fuzz as horizontal offset
        const float fuzz = .0005;
        const float fuzzScale = 800.;
        const float fuzzSpeed = 9.;
        p.x += fuzz*(noise(vec2(p.y*fuzzScale, iTime*fuzzSpeed))*2.-1.);

        // init output color
        c = texture(iChannel0, p);

        // chromatic aberration
        const float chromatic = .002;
        c.r = texture(iChannel0, p - vec2(chromatic,0)).r;
        c.b = texture(iChannel0, p + vec2(chromatic,0)).b;

        // tv static noise
        const float staticNoise = .1;
        c += staticNoise * hash(p + mod(iTime, 1e3));

        // scan lines
        const float scanlineScale = 1e3;
        const float scanlineAlpha = .1;
        c *= 1. + scanlineAlpha*sin(p.y*scanlineScale);

        // black vignette around edges
        const float vignette = 2.;
        const float vignettePow = 4.;
        float dx = 2.*p.x-1., dy = 2.*p.y-1.;
        c *= 1.-pow((dx*dx + dy*dy)/vignette, vignettePow);
    }`;

  const includeOverlay = true;
  glInitPostProcess(televisionShader, includeOverlay);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
