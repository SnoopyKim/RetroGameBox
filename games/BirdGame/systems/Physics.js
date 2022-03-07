import Matter from 'matter-js';
import Constants from '../Constants';
import { generatePipes } from './utils';

const Physics = (entities, { events, dispatch, time }) => {
  let { engine, world } = entities.physics;
  let bird = entities.bird.body;

  events.forEach((e) => {
    if (e.type === 'JUMP') {
      Matter.Body.applyForce(bird, bird.position, { x: 0.0, y: -0.085 });
    }
  });

  for (let i = 1; i <= 4; i += 2) {
    if (
      entities['pipe' + i].body.position.x <=
      -1 * (Constants.PIPE_WIDTH / 2)
    ) {
      dispatch({ type: 'score' });
      Matter.World.remove(world, entities['pipe' + i].body);
      Matter.World.remove(world, entities['pipe' + (i + 1)].body);
      let [pipe1Height, pipe2Height] = generatePipes();
      let newPipe1 = Matter.Bodies.rectangle(
        Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
        pipe1Height / 2,
        Constants.PIPE_WIDTH,
        pipe1Height,
        { isStatic: true }
      );
      let newPipe2 = Matter.Bodies.rectangle(
        Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
        Constants.MAX_HEIGHT - pipe2Height / 2,
        Constants.PIPE_WIDTH,
        pipe2Height,
        { isStatic: true }
      );
      Matter.World.add(world, [newPipe1, newPipe2]);
      entities['pipe' + i].body = newPipe1;
      entities['pipe' + i].size = [Constants.PIPE_WIDTH, pipe1Height];
      entities['pipe' + (i + 1)].body = newPipe2;
      entities['pipe' + (i + 1)].size = [Constants.PIPE_WIDTH, pipe2Height];
    } else {
      Matter.Body.translate(entities['pipe' + i].body, { x: -1, y: 0 });
      Matter.Body.translate(entities['pipe' + (i + 1)].body, { x: -1, y: 0 });
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
