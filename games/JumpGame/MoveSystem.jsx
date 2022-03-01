import Matter, { Events } from "matter-js";
import Constants from "./Constants";
import { View, StyleSheet, Button, Alert } from "react-native";

let MoveL;
let MoveR;
let lastMove = true;
let Jumping;
let jGauge = 0;
let jGaugeD = true;
let f2Direction = true;
let stair5LR = true;
let stair5UD = true;
const MoveSystem = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.moveSystem.engine;
  const player = entities.player.body;
  const jumpBar = entities.jumpBar.body;
  const floor2 = entities.floor2.body;
  const stair5 = entities.stair5.body;

  Matter.Body.setPosition(jumpBar, {
    x: player.position.x,
    y: player.position.y - 35,
  });

  //이벤트 상태
  if (events.length) {
    events.forEach((e) => {
      console.log(e.type);
      switch (e.type) {
        case "started":
          MoveL = false;
          MoveR = false;
          lastMove = false;
          Jumping = false;
          jGauge = 0;
          jGaugeD = true;
          f2Direction = true;
          stair5LR = true;
          stair5UD = true;
          break;
        case "MoveStartL":
          MoveL = true;
          entities.player.direction = true;
          break;
        case "MoveEndL":
          MoveL = false;
          lastMove = true;
          break;
        case "MoveStartR":
          MoveR = true;
          entities.player.direction = false;
          break;
        case "MoveEndR":
          MoveR = false;
          lastMove = false;
          break;
        case "spiked":
          Alert.alert("You Died");
          break;
        case "landed":
          Matter.Body.setStatic(player, true);
          Matter.Body.setStatic(player, false);
          break;
        case "JumpStart":
          Jumping = true;
          break;
        case "JumpEnd":
          Jumping = false;
          console.log("JUMPGAUGE:" + jGauge / 10);
          if (lastMove) {
            Matter.Body.applyForce(player, player.position, {
              x: -0.015 * (jGauge / 20),
              y: -0.03 * (jGauge / 20),
            });
          } else {
            Matter.Body.applyForce(player, player.position, {
              x: 0.015 * (jGauge / 20),
              y: -0.03 * (jGauge / 20),
            });
          }
          jGauge = 0;
          jGaugeD = false;
          break;
      }
    });
  }
  //점프바 길이
  entities.jumpBar.size = [jGauge, 10];
  // //게임화면 터치하면 캐릭터 점프. 확인용
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(player, player.position, { x: 0.0, y: -0.1 });
    });

  //floor2 좌우 움직임
  if (f2Direction) {
    Matter.Body.setPosition(floor2, {
      x: floor2.position.x - 0.7,
      y: floor2.position.y,
    });
    if (floor2.position.x <= Constants.MAX_WIDTH / 2 - 100) {
      f2Direction = false;
    }
  } else {
    Matter.Body.setPosition(floor2, {
      x: floor2.position.x + 0.7,
      y: floor2.position.y,
    });
    if (floor2.position.x >= Constants.MAX_WIDTH / 2 + 100) {
      f2Direction = true;
    }
  }
  Matter.Body.setPosition(entities.spike3.body, {
    x: floor2.position.x,
    y: floor2.position.y + 15,
  });

  //stair5 움직임
  if (stair5LR) {
    Matter.Body.setPosition(stair5, {
      x: stair5.position.x - 0.5,
      y: stair5.position.y,
    });
    if (stair5.position.x < Constants.MAX_WIDTH - 25) {
      stair5LR = false;
      stair5UD = false;
    }
  }
  if (stair5UD === false) {
    Matter.Body.setPosition(stair5, {
      x: stair5.position.x,
      y: stair5.position.y - 0.5,
    });
    if (stair5.position.y < entities.stair4.body.position.y) {
      stair5UD = true;
    }
  }
  if (stair5.position.y < entities.stair4.body.position.y) {
    if (stair5.position.x < Constants.MAX_WIDTH + 25) {
      Matter.Body.setPosition(stair5, {
        x: stair5.position.x + 0.5,
        y: stair5.position.y,
      });
    }
    if (stair5.position.x >= Constants.MAX_WIDTH + 25) {
      Matter.Body.setPosition(stair5, {
        x: Constants.MAX_WIDTH + 25,
        y: entities.floor3.body.position.y,
      });
      stair5LR = true;
      stair5UD = true;
    }
  }
  //좌우움직임
  if (MoveL) {
    Matter.Body.setPosition(player, {
      x: player.position.x - 1,
      y: player.position.y,
    });
  }
  if (MoveR) {
    Matter.Body.setPosition(player, {
      x: player.position.x + 1,
      y: player.position.y,
    });
  }

  //점프. 점프게이지가 1부터 20까지 시간에따라 증감
  if (Jumping) {
    if (jGaugeD) {
      jGauge += 1;
      if (jGauge >= 40) {
        jGaugeD = false;
      }
    } else {
      jGauge -= 1;
      if (jGauge <= 0) {
        jGaugeD = true;
      }
    }
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default MoveSystem;
