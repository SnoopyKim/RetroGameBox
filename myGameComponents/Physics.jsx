import Matter, { Events } from "matter-js";
import Constants from "./Constants";
let LR = true;
let UD = true;
let craneMove = false;
let craneGrab = false;

const Physics = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.physics.engine;
  let redPuppet = entities.redPuppets.body;
  let bluePuppet = entities.bluePuppets.body;
  let yellowPuppet = entities.yellowPuppets.body;
  let crane = entities.crane.body;
  let cranepin1 = entities.cranePin1.body;
  let cranepin2 = entities.cranePin2.body;
  let cranepin3 = entities.cranePin3.body;
  let cranepin4 = entities.cranePin4.body;
  let shelf = entities.shelf.body;

  Matter.Body.setPosition(cranepin1, {
    x: crane.position.x - 15,
    y: crane.position.y + 200,
  });
  Matter.Body.setPosition(cranepin2, {
    x: crane.position.x + 15,
    y: crane.position.y + 200,
  });
  Matter.Body.setPosition(cranepin3, {
    x: crane.position.x - 20,
    y: crane.position.y + 240,
  });
  Matter.Body.setPosition(cranepin4, {
    x: crane.position.x + 20,
    y: crane.position.y + 240,
  });
  Matter.Body.rotate(cranepin1, 45);
  Matter.Body.rotate(cranepin2, -45);
  Matter.Body.rotate(cranepin3, -20);
  Matter.Body.rotate(cranepin4, 20);

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
          x: crane.position.x + 1,
          y: crane.position.y,
        });
      } else {
        Matter.Body.setPosition(crane, {
          x: crane.position.x - 1,
          y: crane.position.y,
        });
        LR = false;
      }
    } else if (crane.position.x > Constants.MAX_WIDTH - 40) {
      LR = false;
      Matter.Body.setPosition(crane, {
        x: crane.position.x - 1,
        y: crane.position.y,
      });
    } else {
      LR = true;
      Matter.Body.setPosition(crane, {
        x: crane.position.x + 1,
        y: crane.position.y,
      });
    }
  }

  let redPuppets = Matter.Bodies.circle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT / 2,
    30,
    { name: redPuppet }
  );
  let bluePuppets = Matter.Bodies.circle(
    Constants.MAX_WIDTH / 3,
    Constants.MAX_HEIGHT / 2,
    30,
    { name: bluePuppet }
  );
  let yellowPuppets = Matter.Bodies.circle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT / 2,
    30,
    { name: yellowPuppet }
  );

  const color = ["redPuppets", "bluePuppets", "yellowPuppets"];
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      switch (Math.floor(Math.random() * color.length)) {
        case 0:
          Matter.World.add(engine.world, redPuppets);
          entities.redPuppets.bodies = [
            ...entities.redPuppets.bodies,
            redPuppets,
          ];
          break;
        case 1:
          Matter.World.add(engine.world, bluePuppets);
          entities.bluePuppets.bodies = [
            ...entities.bluePuppets.bodies,
            bluePuppets,
          ];
          break;
        case 2:
          Matter.World.add(engine.world, yellowPuppets);
          entities.yellowPuppets.bodies = [
            ...entities.yellowPuppets.bodies,
            yellowPuppets,
          ];
          break;
      }
    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
