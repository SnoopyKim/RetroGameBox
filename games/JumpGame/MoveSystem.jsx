import Matter, { Events } from "matter-js";
import Constants from "./Constants";

const MoveSystem = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.moveSystem.engine;

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default MoveSystem;
