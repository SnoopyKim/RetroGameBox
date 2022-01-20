import Matter, { Events } from "matter-js";
import Constants from "./Constants";

const Physics = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.physics.engine;
  let puppet = entities.puppet1.body;
  let crane = entities.crane.body;
  let craneMove = entities.craneMove;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(crane, crane.position, { x: -0.002, y: -0.05 });
    });
  if (events.length) {
    if (events.type === "craneMove")
      Matter.Body.applyForce(puppet, puppet.position, { x: 0.1, y: 0.0 });
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
