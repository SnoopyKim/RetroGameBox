import Matter from "matter-js";
import Constants from "./Constants";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let puppet = entities.puppet.body;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(puppet, puppet.position, { x: 0.0, y: -0.1 });
    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
