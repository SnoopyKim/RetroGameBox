import Matter, { Events } from "matter-js";
import Constants from "./Constants";

let MoveL;
let MoveR;
let lastMove = false;
let Jumping;
let jGauge = 0;
let jGaugeD = true;
const MoveSystem = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.moveSystem.engine;
  const player = entities.player.body;
  const jumpBar = entities.jumpBar.body;

  Matter.Body.setPosition(jumpBar, {
    x: player.position.x,
    y: player.position.y - 35,
  });

  //이벤트 상태
  if (events.length) {
    events.forEach((e) => {
      console.log(e.type);
      switch (e.type) {
        case "MoveStartL":
          MoveL = true;
          break;
        case "MoveEndL":
          MoveL = false;
          lastMove = true;
          break;
        case "MoveStartR":
          MoveR = true;
          lastMove = false;
          break;
        case "MoveEndR":
          MoveR = false;
          break;
        case "JumpStart":
          Jumping = true;
          break;
        case "JumpEnd":
          Jumping = false;
          console.log("JUMPGAUGE:" + jGauge / 10);
          if (lastMove) {
            Matter.Body.applyForce(player, player.position, {
              x: -0.02 * (jGauge / 10),
              y: -0.03 * (jGauge / 10),
            });
          } else {
            Matter.Body.applyForce(player, player.position, {
              x: 0.02 * (jGauge / 10),
              y: -0.03 * (jGauge / 10),
            });
          }
          jGauge = 0;
          jGaugeD = false;
          break;
      }
    });
  }

  // //게임화면 터치하면 캐릭터 점프. 확인용
  // touches
  //   .filter((t) => t.type === "press")
  //   .forEach((t) => {
  //     Matter.Body.applyForce(player, player.position, { x: 0.0, y: -0.1 });
  //   });

  //좌우움직임
  if (MoveL) {
    Matter.Body.applyForce(player, player.position, { x: -0.003, y: 0 });
  }
  if (MoveR) {
    Matter.Body.applyForce(player, player.position, { x: 0.003, y: 0 });
  }

  //점프. 점프게이지가 1부터 50까지 시간에따라 증감
  if (Jumping) {
    if (jGaugeD) {
      jGauge += 1;
      if (jGauge >= 30) {
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
