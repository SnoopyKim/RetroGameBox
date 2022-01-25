import Matter from 'matter-js';
import { initStats } from '../hooks/PlayerStatus';

let time = 0;

const AttackSystem = (entities, { events, dispatch }) => {
  let engine = entities.matter;
  let player = entities.player;
  let enemy = entities.enemy;

  time++;
  if (time % initStats.SPEED === 0) {
    let playerRock = Matter.Bodies.circle(
      player.body.position.x,
      player.body.position.y - 10,
      10,
      {
        name: 'rock',
        throw: 'player',
        collisionFilter: { mask: 0x0001 },
      }
    );

    Matter.World.add(engine.world, playerRock);
    entities.rocks.bodies = [...entities.rocks.bodies, playerRock];
    Matter.Body.applyForce(playerRock, playerRock.position, { x: 0.01, y: 0 });
  }
  if (time % initStats.SPEED === 0) {
    let enemyRock = Matter.Bodies.circle(
      enemy.body.position.x,
      enemy.body.position.y - 10,
      10,
      {
        name: 'rock',
        throw: 'enemy',
        collisionFilter: { mask: 0x0002 },
      }
    );
    Matter.World.add(engine.world, enemyRock);
    entities.rocks.bodies = [...entities.rocks.bodies, enemyRock];
    Matter.Body.applyForce(enemyRock, enemyRock.position, { x: -0.01, y: 0 });
  }

  if (events.length) {
    events.forEach((e) => {
      switch (e.type) {
        case 'ERASE':
          entities.rocks.bodies = entities.rocks.bodies.filter(
            (rock) => rock != e.rock
          );
          Matter.World.remove(engine.world, e.rock);
          return;
        case 'move-right':
          if (head.xspeed === -1) return;
          head.xspeed = 1;
          head.yspeed = 0;
          return;
        case 'move-down':
          if (head.yspeed === -1) return;
          head.yspeed = 1;
          head.xspeed = 0;
          return;
        case 'move-left':
          if (head.xspeed === 1) return;
          head.xspeed = -1;
          head.yspeed = 0;
          return;
      }
    });
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default AttackSystem;
