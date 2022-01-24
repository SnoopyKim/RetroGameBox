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
import Enemy from './components/Enemy';
import Finger from './components/Finger';
import Floor from './components/Floor';
import Player from './components/Player';
import StatusBoard from './components/StatusBoard';
import Constants from './Constants';
import TouchSystem from './systems/TouchSystem';

const NPCGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true);

  const initEntities = () => {
    matterEngine.current = Matter.Engine.create({ enableSleeping: false });
    let floor = Matter.Bodies.rectangle(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT - 20,
      Constants.GAME_WIDTH,
      40,
      { isStatic: true }
    );

    let finger = Matter.Bodies.circle(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT / 2,
      20,
      {
        isStatic: true,
      }
    );

    let player = Matter.Bodies.rectangle(
      35,
      Constants.GAME_HEIGHT - 70,
      30,
      60,
      {
        isStatic: true,
        chamfer: { radius: [15, 15, 0, 0] },
      }
    );

    let enemy = Matter.Bodies.rectangle(
      Constants.GAME_WIDTH - 35,
      Constants.GAME_HEIGHT - 70,
      30,
      60,
      {
        isStatic: true,
        chamfer: { radius: [15, 15, 0, 0] },
      }
    );

    Matter.World.add(matterEngine.current.world, [
      floor,
      finger,
      player,
      enemy,
    ]);

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
      player: {
        body: player,
        renderer: <Player />,
      },
      enemy: {
        body: enemy,
        renderer: <Enemy />,
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
      <View style={styles.boardContainer}>
        <StatusBoard />
      </View>
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
    width: Constants.GAME_WIDTH,
    height: Constants.GAME_HEIGHT,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  boardContainer: {
    position: 'absolute',
    width: Constants.MAX_WIDTH,
    top: Constants.GAME_HEIGHT,
  },
});

export default NPCGameScreen;
