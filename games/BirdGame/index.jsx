import { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Bird from './entities/Bird';
import { StatusBar } from 'expo-status-bar';
import Physics from './systems/Physics';
import Wall from './entities/Wall';
import TextButton from './../../components/buttons/TextButton';
import { generatePipes } from './systems/utils';

export default function BirdGameScreen() {
  const [running, setRunning] = useState(true);
  const gameEngine = useRef();

  const initWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.gravity.y = 0.9;

    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      50,
      50
    );

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );

    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );

    let [pipe1Height, pipe2Height] = generatePipes();
    let pipe1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
      pipe1Height / 2,
      Constants.PIPE_WIDTH,
      pipe1Height,
      { isStatic: true }
    );
    let pipe2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
      Constants.MAX_HEIGHT - pipe2Height / 2,
      Constants.PIPE_WIDTH,
      pipe2Height,
      { isStatic: true }
    );

    let [pipe3Height, pipe4Height] = generatePipes();
    let pipe3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
      pipe3Height / 2,
      Constants.PIPE_WIDTH,
      pipe3Height,
      { isStatic: true }
    );
    let pipe4 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
      Constants.MAX_HEIGHT - pipe4Height / 2,
      Constants.PIPE_WIDTH,
      pipe4Height,
      { isStatic: true }
    );

    Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);

    Matter.Events.on(engine, 'collisionStart', (event) => {
      var pairs = event.pairs;
      gameEngine.current.dispatch({ type: 'game-over' });
    });

    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, size: [50, 50], color: 'red', renderer: <Bird /> },
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        color: 'green',
        renderer: <Wall />,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 50],
        color: 'green',
        renderer: <Wall />,
      },
      pipe1: {
        body: pipe1,
        size: [Constants.PIPE_WIDTH, pipe1Height],
        color: 'green',
        renderer: <Wall />,
      },
      pipe2: {
        body: pipe2,
        size: [Constants.PIPE_WIDTH, pipe2Height],
        color: 'green',
        renderer: <Wall />,
      },
      pipe3: {
        body: pipe3,
        size: [Constants.PIPE_WIDTH, pipe3Height],
        color: 'green',
        renderer: <Wall />,
      },
      pipe4: {
        body: pipe4,
        size: [Constants.PIPE_WIDTH, pipe4Height],
        color: 'green',
        renderer: <Wall />,
      },
    };
  };

  onEvent = (e) => {
    if (e.type === 'game-over') {
      setRunning(false);
    }
  };

  reset = () => {
    gameEngine.current.swap(initWorld());
    setRunning(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <GameEngine
        ref={gameEngine}
        style={styles.gameContainer}
        running={running}
        onEvent={onEvent}
        systems={[Physics]}
        entities={initWorld()}
      ></GameEngine>
      {!running && (
        <View style={styles.fullScreen} onPress={reset}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <TextButton
            title={'RETRY'}
            onPressed={reset}
            borderColor={'white'}
            fontSize={24}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    fontFamily: 'DGM',
    color: 'white',
    fontSize: 48,
    marginBottom: 50,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
