import { StatusBar } from 'expo-status-bar';
import Matter from 'matter-js';
import { useRef, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Finger from './components/Finger';
import Floor from './components/Floor';
import Constants from './Constants';
import TouchSystem from './systems/TouchSystem';

const NPCGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true);

  const initEntities = () => {
    matterEngine.current = Matter.Engine.create({ enableSleeping: false });

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 20,
      Constants.MAX_WIDTH,
      40,
      { isStatic: true }
    );

    let finger = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      20,
      { isStatic: true }
    );

    let player = Matter.Bodies.polygon();

    let enemy = Matter.Bodies.polygon();

    Matter.World.add(matterEngine.current.world, [floor, finger]);

    return {
      matter: matterEngine.current,
      floor: {
        body: floor,
        renderer: <Floor />,
      },
      finger: {
        body: finger,
        renderer: <Finger />,
      },
    };
  };

  const resetGame = () => {
    Matter.Engine.clear(matterEngine.current);
    gameEngine.current.swap(initEntities());
    setIsGameRunning(true);
  };

  return (
    <SafeAreaView style={styles.canvas}>
      <StatusBar style='light' />
      <GameEngine
        ref={gameEngine}
        style={styles.gameContainer}
        entities={initEntities()}
        systems={[TouchSystem]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case 'game-over':
              setIsGameRunning(false);
              return;
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default NPCGameScreen;
