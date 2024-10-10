import { Color, vec2, Vector2 } from "./littlejs.esm.js"

type ShapeDef = {
  color: Color
  tiles: Vector2[]
}

export const SHAPES: ShapeDef[] = [
  // I
  {
    color: new Color(0, 1, 1),
    tiles: [
      vec2(-1, 0), vec2(0, 0), vec2(1, 0), vec2(2, 0),
    ],
  },
  // J
  {
    color: new Color(0, 0, 1),
    tiles: [
      vec2(-1, -1), vec2(-1, 0), vec2(0, 0), vec2(1, 0),
    ],
  },
  // L
  {
    color: new Color(1, 0.65, 0),
    tiles: [
      vec2(-1, 0), vec2(0, 0), vec2(1, 0), vec2(1, 1),
    ],
  },
  // O
  {
    color: new Color(1, 1, 0),
    tiles: [
      vec2(0, 0), vec2(1, 0), vec2(0, 1), vec2(1, 1),
    ],
  },
  // S
  {
    color: new Color(0, 1, 0),
    tiles: [
      vec2(-1,0), vec2(0, 0), vec2(0, 1), vec2(1, 1),
    ],
  },
  // T
  {
    color: new Color(1, 0, 1),
    tiles: [
      vec2(-1, 0), vec2(0, 0), vec2(1, 0), vec2(0, 1),
    ],
  },
  // Z
  {
    color: new Color(1, 0, 0),
    tiles: [
      vec2(-1, 1), vec2(0, 1), vec2(0, 0), vec2(1, 0),
    ],
  },
]

export const NUM_SHAPES = SHAPES.length;
