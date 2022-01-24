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
import Finger from './components/Rock';
import Floor from './components/Floor';
import Player from './components/Player';
import StatusBoard from './components/StatusBoard';
import Constants from './Constants';
import AttackSystem from './systems/AttackSystem';
import Rocks from './components/Rocks';

const NPCGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true);

  const initEntities = () => {
    matterEngine.current = Matter.Engine.create({ enableSleeping: false });
    matterEngine.current.gravity.y = 0;

    let floor = Matter.Bodies.rectangle(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT - 20,
      Constants.GAME_WIDTH,
      40,
      { isStatic: true }
    );

    let player = Matter.Bodies.rectangle(
      35,
      Constants.GAME_HEIGHT - 70,
      30,
      60,
      {
        isStatic: true,
        name: 'player',
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
        name: 'enemy',
        chamfer: { radius: [15, 15, 0, 0] },
      }
    );

    Matter.World.add(matterEngine.current.world, [floor, player, enemy]);

    Matter.Events.on(matterEngine.current, 'collisionEnd', (event) => {
      var { bodyA, bodyB } = event.pairs[0];
      if (bodyB.name === 'rock') {
        gameEngine.current.dispatch({ type: 'HIT', rock: bodyB });
      }
      // gameEngine.current.dispatch({ type: 'game-over' });
    });

    return {
      matter: matterEngine.current,
      floor: {
        body: floor,
        renderer: <Floor />,
      },
      rocks: {
        bodies: [],
        renderer: <Rocks />,
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
        systems={[AttackSystem]}
        running={isGameRunning}
        onEvent={(e) => {}}
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
