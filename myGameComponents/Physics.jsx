import Matter, { Events } from "matter-js";
import Constants from "./Constants";
let LR = true;
let UD = true;
let craneMove = false;
let craneGrab = false;

const Physics = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.physics.engine;
  let puppet = entities.puppet1.body;
  let crane = entities.crane.body;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(puppet, puppet.position, { x: -0.002, y: -0.03 });
    });

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "craneMove") {
        craneMove = true;
      } else if (events[i].type === "craneStop") {
        craneMove = false;
        craneGrab = true;
      } else if (events[i].type === "started") {
        LR = true;
        UD = true;
        craneMove = false;
        craneGrab = false;
      }
    }
  }

  if (craneGrab === true) {
    if (
      crane.position.y >= Constants.MAX_HEIGHT / 6 - Constants.MAX_HEIGHT / 4 &&
      crane.position.y <= Constants.MAX_HEIGHT / 6
    ) {
      if (UD !== false) {
        Matter.Body.setPosition(crane, {
          x: crane.position.x,
          y: crane.position.y + 2,
        });
      } else {
        Matter.Body.setPosition(crane, {
          x: crane.position.x,
          y: crane.position.y - 2,
        });
      }
    } else if (crane.position.y > Constants.MAX_HEIGHT / 6) {
      UD = false;
      Matter.Body.setPosition(crane, {
        x: crane.position.x,
        y: crane.position.y - 2,
      });
    } else if (
      crane.position.y <
      Constants.MAX_HEIGHT / 6 - Constants.MAX_HEIGHT / 4
    ) {
      if (crane.position.x < Constants.MAX_WIDTH / 8) {
        LR = true;
        UD = true;
        craneMove = false;
        craneGrab = false;
        Matter.Body.setPosition(crane, {
          x: Constants.MAX_WIDTH / 8,
          y: Constants.MAX_HEIGHT / 6 - Constants.MAX_HEIGHT / 4,
        });
        dispatch({ type: "resetCrane" });
      } else {
        craneMove = true;
        LR = false;
      }
    }
  }
  if (craneMove === true) {
    if (
      crane.position.x >= Constants.MAX_WIDTH / 8 &&
      crane.position.x <= Constants.MAX_WIDTH - 40
    ) {
      if (LR !== false) {
        Matter.Body.setPosition(crane, {
          x: crane.position.x + 2,
          y: crane.position.y,
        });
      } else {
        Matter.Body.setPosition(crane, {
          x: crane.position.x - 2,
          y: crane.position.y,
        });
        LR = false;
      }
    } else if (crane.position.x > Constants.MAX_WIDTH - 40) {
      LR = false;
      Matter.Body.setPosition(crane, {
        x: crane.position.x - 2,
        y: crane.position.y,
      });
    } else {
      LR = true;
      Matter.Body.setPosition(crane, {
        x: crane.position.x + 2,
        y: crane.position.y,
      });
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
