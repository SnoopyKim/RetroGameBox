import Matter, { Events } from "matter-js";
import Constants from "./Constants";

let MoveL;
let MoveR;
let Jumping;
let jGauge = 0;
let jGaugeD = true;
const MoveSystem = (entities, { touches, time, dispatch, events }) => {
  let engine = entities.moveSystem.engine;
  const player = entities.player.body;

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
          break;
        case "MoveStartR":
          MoveR = true;
          break;
        case "MoveEndR":
          MoveR = false;
          break;
        case "JumpStart":
          Jumping = true;
          break;
        case "JumpEnd":
          Jumping = false;
          break;
      }
    });
  }

  //게임화면 터치하면 캐릭터 점프. 확인용
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(player, player.position, { x: 0.0, y: -0.1 });
    });

  //좌우움직임
  if (MoveL) {
    Matter.Body.applyForce(player, player.position, { x: -0.1, y: 0 });
  }
  if (MoveR) {
    Matter.Body.applyForce(player, player.position, { x: 0.1, y: 0 });
  }

  //점프. 점프게이지가 1부터 10까지 시간에따라 증감. 매터엔진 수리하면 다시할것
  if (Jumping) {
    if (jGaugeD) {
      jGauge += 1;
      if (jGauge === 10) {
        jGaugeD = false;
      }
    } else {
      jGaugeD += -1;
      if (jGauge === 0) {
        jGaugeD = true;
      }
    }
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default MoveSystem;
