import { StatusBar } from 'expo-status-bar';
import Matter from 'matter-js';
import { useReducer, useRef, useState, useEffect } from 'react';
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
import { usePlayerStatus } from './hooks/PlayerStatus';
import { useEnemyStatus } from './hooks/EnemyStatus';
import TextButton from '../../components/buttons/TextButton';
import Cards from './components/Cards';

const initState = {
  running: true,
  round: 1,
  status: 'SELECT',
};

const NPCGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [gameState, setGameState] = useState(initState);
  const timer = useRef(null);

  const [playerStatus, playerDispatch] = usePlayerStatus();
  const [enemyStatus, enemyDispatch] = useEnemyStatus();

  useEffect(() => {
    if (!gameState.running) return;

    if (gameState.status === 'WIN') {
      timer.current = setTimeout(() => {
        playerDispatch({ type: 'RECOVER' });
        enemyDispatch({ type: 'LEVEL', value: gameState.round - 1 });
        setGameState({
          ...gameState,
          round: gameState.round + 1,
          status: 'SELECT',
        });
      }, 3000);
    }
    if (gameState.status === 'LOSE') {
      timer.current = setTimeout(
        () => setGameState({ ...gameState, running: false }),
        3000
      );
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (
      gameState.status === 'SELECT' &&
      gameEngine.current &&
      matterEngine.current
    ) {
      console.log('RESTART MATTER');
      Matter.Engine.clear(matterEngine.current);
      gameEngine.current.swap(initEntities());
    }
    if (gameState.status !== 'FIGHT') return;

    if (enemyStatus.HP_CURRENT === 0) {
      gameEngine.current.dispatch({ type: 'WIN' });
    } else if (playerStatus.HP_CURRENT === 0) {
      gameEngine.current.dispatch({ type: 'LOSE' });
    }
  }, [playerStatus, enemyStatus, gameState]);

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
        atkSpeed: playerStatus.SPEED,
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
        atkSpeed: enemyStatus.SPEED,
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
          if (bodyA.name === 'enemy') {
            // 적이 맞음
            enemyDispatch({
              type: 'DAMAGE',
              value: playerStatus.ATTACK_POWER,
            });
          } else if (bodyA.name === 'player') {
            // 플레이어가 맞음
            playerDispatch({
              type: 'DAMAGE',
              value: enemyStatus.ATTACK_POWER,
            });
          }
        }
      });
    });

    return {
      matter: matterEngine.current,
      gameStatus: gameState.status,
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
    playerDispatch({ type: 'INIT' });
    enemyDispatch({ type: 'INIT' });
    setGameState(initState);
  };

  const onEvent = (event) => {
    switch (event.type) {
      case 'WIN':
        console.log('WIN!');
        setGameState({
          ...gameState,
          status: 'WIN',
        });
        break;
      case 'LOSE':
        console.log('LOSE!');
        setGameState({
          ...gameState,
          status: 'LOSE',
        });
        break;
      case 'START':
        console.log('START ROUND', gameState.round);
        setGameState({ ...gameState, status: 'FIGHT' });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.canvas}>
      <AssetLoading
        images={[
          require('retrogamebox/assets/images/player.png'),
          require('retrogamebox/assets/images/enemy.png'),
          require('retrogamebox/assets/images/rock.png'),
          require('retrogamebox/assets/images/muscle.png'),
        ]}
      >
        <StatusBar style='light' />
        <GameEngine
          ref={gameEngine}
          style={styles.gameContainer}
          entities={initEntities()}
          systems={[AttackSystem]}
          running={gameState.running}
          onEvent={onEvent}
        >
          {{
            WIN: <ResultText text={'WIN!'} />,
            LOSE: <ResultText text={'LOSE...'} />,
            SELECT: (
              <Cards
                onSelect={(item) => {
                  playerDispatch({ type: 'CHANGE', value: item.value });
                  gameEngine.current.dispatch({ type: 'START' });
                }}
              />
            ),
          }[gameState.status] || <></>}
        </GameEngine>
        <View style={styles.boardContainer}>
          <StatusBoard
            player={playerStatus}
            enemy={enemyStatus}
            round={gameState.round}
          />
        </View>
      </AssetLoading>
      {!gameState.running && (
        <View style={styles.dialogContainer}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'DGM',
              fontSize: 48,
              textShadowColor: 'white',
              textShadowRadius: 5,
              marginBottom: 80,
            }}
          >
            GAME OVER
          </Text>
          <TextButton
            title={'RESTART'}
            onPressed={resetGame}
            borderColor={'white'}
            fontSize={20}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const ResultText = ({ text }) => {
  return (
    <View style={styles.resultWrapper}>
      <Text style={styles.resultText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
  gameContainer: {
    // position: 'absolute',
    width: Constants.GAME_WIDTH,
    height: Constants.GAME_HEIGHT,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  boardContainer: {
    // position: 'absolute',
    width: Constants.MAX_WIDTH,
    height: Constants.BOARD_HEIGHT,
    // top: Constants.GAME_HEIGHT,
  },
  dialogContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000CC',
  },
  resultWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.GAME_HEIGHT / 3,
  },
  resultText: {
    color: 'black',
    fontFamily: 'DGM',
    fontSize: 48,
  },
  selectText: {},
});

export default NPCGameScreen;
