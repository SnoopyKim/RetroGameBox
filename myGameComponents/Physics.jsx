import Matter, { Events } from "matter-js";
import Constants from "./Constants";
let LR;
const Physics = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.physics.engine;
  let puppet = entities.puppet1.body;
  let crane = entities.crane.body;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(puppet, puppet.position, { x: -0.002, y: -0.05 });
    });

  for (let i = 1; i <= 10; i++) {
    if (
      crane.position.x >= Constants.MAX_WIDTH / 8 &&
      crane.position.x <= Constants.MAX_WIDTH - 40
    ) {
      if (LR !== false) {
        Matter.Body.setPosition(crane, {
          x: crane.position.x + 0.01 * i,
          y: crane.position.y,
        });
      } else {
        Matter.Body.setPosition(crane, {
          x: crane.position.x - 0.01 * i,
          y: crane.position.y,
        });
        LR = false;
      }
    } else if (crane.position.x > Constants.MAX_WIDTH - 40) {
      LR = false;
      Matter.Body.setPosition(crane, {
        x: crane.position.x - 0.01 * i,
        y: crane.position.y,
      });
    } else {
      LR = true;
      Matter.Body.setPosition(crane, {
        x: crane.position.x + 0.01 * i,
        y: crane.position.y,
      });
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
