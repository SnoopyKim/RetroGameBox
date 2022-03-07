import Matter from 'matter-js';

let roundTime = 1;

const AttackSystem = (entities, { events, time, dispatch }) => {
  let engine = entities.matter;
  const player = entities.player.body;
  const enemy = entities.enemy.body;
  const running = entities.gameStatus === 'FIGHT';

  if (running) {
    roundTime++;
    entities.rocks.bodies.forEach((rock) => {
      const moveValue = rock.throw === 'player' ? 3 : -3;
      Matter.Body.setPosition(rock, {
        x: rock.position.x + moveValue,
        y: rock.position.y,
      });
    });
  }
  if (roundTime % player.atkSpeed === 0) {
    let playerRock = Matter.Bodies.circle(
      player.position.x,
      player.position.y - 10,
      10,
      {
        name: 'rock',
        throw: 'player',
        ct: Math.random() * 100,
        collisionFilter: { mask: 0x0001 },
      }
    );

    Matter.World.add(engine.world, playerRock);
    entities.rocks.bodies = [...entities.rocks.bodies, playerRock];
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
  }

  if (events.length) {
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
          const allRocks = Matter.Composite.allBodies(engine.world).filter(
            (body) => body.name === 'rock'
          );
          entities.rocks.bodies = [];
          Matter.Composite.remove(engine.world, allRocks);
          entities.gameStatus = 'STOP';
          break;
        case 'START':
          roundTime = 1;
          entities.gameStatus = 'FIGHT';
          break;
      }
    });
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default AttackSystem;
