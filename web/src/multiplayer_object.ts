import { EngineObject, engineObjects } from "./littlejs.esm"

export class MultiplayerObject extends EngineObject {
  lockstepUpdate() {
  }
}

export function multiplayerObjecsUpdate() {
  function updateObject(o: MultiplayerObject) {
    if (o instanceof MultiplayerObject && !o.destroyed) {
      o.lockstepUpdate();
      for (const child of o.children)
        updateObject(child);
    }
  }
  for (const o of engineObjects) {
    // update top level objects
    if (!o.parent) {
      updateObject(o);
      o.updateTransforms();
    }
  }

  // remove destroyed objects
  // engineObjects = engineObjects.filter(o => !o.destroyed);
}