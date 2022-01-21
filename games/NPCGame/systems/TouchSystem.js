import Matter from 'matter-js';

const TouchSystem = (entities, { touches, time }) => {
  let engine = entities.matter;
  let finger = entities.finger.body;

  touches.forEach((t) => {
    if (t.type === 'start') {
      Matter.Body.setPosition(finger, {
        x: t.event.pageX,
        y: t.event.pageY - 82,
      });
    } else if (t.type === 'move') {
      Matter.Body.translate(finger, {
        x: t.delta.pageX,
        y: t.delta.pageY,
      });
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default TouchSystem;
