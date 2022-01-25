import { StatusBar } from 'expo-status-bar';
import Matter from 'matter-js';
import { useReducer, useRef, useState } from 'react';
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
import Floor from './components/Floor';
import Player from './components/Player';
import StatusBoard from './components/StatusBoard';
import Constants from './Constants';
import AttackSystem from './systems/AttackSystem';
import Rocks from './components/Rocks';
import AssetLoading from '../../components/AssetLoading';
import {
  initStats,
  playerReducer,
  usePlayerStatus,
} from './hooks/PlayerStatus';

const NPCGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true);

  const [playerStatus, playerDispatch] = usePlayerStatus();

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
        collisionFilter: {
          category: 0x0002,
        },
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
        collisionFilter: {
          category: 0x0001,
        },
      }
    );

    Matter.World.add(matterEngine.current.world, [floor, player, enemy]);

    Matter.Events.on(matterEngine.current, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (bodyB.name === 'rock') {
          gameEngine.current.dispatch({ type: 'ERASE', rock: bodyB });
          if (bodyA.name === 'player') {
            // 플레이어가 맞음
            playerDispatch({ type: 'DAMAGE', value: 10 });
          } else if (bodyB.name === 'enemy') {
            // 적이 맞음
          }
        }
      });
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
      <AssetLoading
        images={[
          require('retrogamebox/assets/images/player.png'),
          require('retrogamebox/assets/images/enemy.png'),
          require('retrogamebox/assets/images/rock.png'),
        ]}
      >
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
          <StatusBoard player={playerStatus} />
        </View>
      </AssetLoading>
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
