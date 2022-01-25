import Matter from 'matter-js';

let running = false;
let roundTime = 1;

const AttackSystem = (entities, { events, time, dispatch }) => {
  let engine = entities.matter;
  let player = entities.player.body;
  let enemy = entities.enemy.body;

  if (roundTime === 1) {
    console.log(running, player.atkSpeed, enemy.atkSpeed);
  }
  if (running) roundTime++;
  if (roundTime % player.atkSpeed === 0) {
    let playerRock = Matter.Bodies.circle(
      player.position.x,
      player.position.y - 10,
      10,
      {
        name: 'rock',
        throw: 'player',
        collisionFilter: { mask: 0x0001 },
      }
    );

    Matter.World.add(engine.world, playerRock);
    entities.rocks.bodies = [...entities.rocks.bodies, playerRock];
    Matter.Body.applyForce(playerRock, playerRock.position, { x: 0.006, y: 0 });
  }
  if (roundTime % enemy.atkSpeed === 0) {
    let enemyRock = Matter.Bodies.circle(
      enemy.position.x,
      enemy.position.y - 10,
      10,
      {
        name: 'rock',
        throw: 'enemy',
        collisionFilter: { mask: 0x0002 },
      }
    );
    Matter.World.add(engine.world, enemyRock);
    entities.rocks.bodies = [...entities.rocks.bodies, enemyRock];
    Matter.Body.applyForce(enemyRock, enemyRock.position, { x: -0.0055, y: 0 });
  }

  if (events.length) {
    console.log('EVENTS', events);
    events.forEach((e) => {
      switch (e.type) {
        case 'ERASE':
          entities.rocks.bodies = entities.rocks.bodies.filter(
            (rock) => rock != e.rock
          );
          Matter.World.remove(engine.world, e.rock);
          break;
        case 'WIN':
        case 'LOSE':
          roundTime = 1;
          running = false;
          break;
        case 'START':
          running = true;
          break;
      }
    });
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default AttackSystem;
