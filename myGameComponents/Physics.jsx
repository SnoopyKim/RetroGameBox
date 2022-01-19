import Matter from "matter-js";
import Constants from "./Constants";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let puppet = entities.puppet1.body;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(puppet, puppet.position, { x: -0.002, y: -0.05 });
    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
