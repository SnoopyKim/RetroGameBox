import Matter from 'matter-js';
import { initStats } from '../hooks/PlayerStatus';

let time = 0;

const AttackSystem = (entities, { events, dispatch }) => {
  let engine = entities.matter;
  let player = entities.player;

  time++;
  if (time % initStats.SPEED === 0) {
    console.log('ATTACK!');
    let newRock = Matter.Bodies.circle(
      player.body.position.x + 16,
      player.body.position.y - 10,
      10,
      { name: 'rock', throw: 'player' }
    );
    Matter.World.add(engine.world, newRock);
    entities.rocks.bodies = [...entities.rocks.bodies, newRock];
    Matter.Body.applyForce(newRock, newRock.position, { x: 0.01, y: 0 });
  }

  if (events.length) {
    events.forEach((e) => {
      switch (e.type) {
        case 'HIT':
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
