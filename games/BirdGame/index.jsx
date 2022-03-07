import { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Bird from './entities/Bird';
import { StatusBar } from 'expo-status-bar';
import Physics from './systems/Physics';
import Wall from './entities/Wall';
import ExitIcon from '../../assets/images/icon_exit.svg';
import { generatePipes } from './systems/utils';
import { useContext } from 'react';
import { DialogContext } from './../../context/dialog/dialog-context';
import { useEffect } from 'react';
import Board from './Board';
import GameResult from './../../components/GameResult';

const initState = {
  running: false,
  count: 3,
  score: 0,
};

export default function BirdGameScreen({ navigation }) {
  const { showConfirmDialog } = useContext(DialogContext);
  const [gameState, setGameState] = useState(initState);
  const gameEngine = useRef();

  useEffect(() => {
    let timer;
    if (!gameState.running && gameState.count > 1) {
      timer = setTimeout(
        () => setGameState((prev) => ({ ...prev, count: prev.count - 1 })),
        1000
      );
    }
    if (!gameState.running && gameState.count === 1) {
      timer = setTimeout(
        () => setGameState((prev) => ({ ...prev, running: true, count: 0 })),
        1000
      );
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [gameState]);

  const initWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    engine.gravity.y = 0.9;

    let bird = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      25
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
      gameEngine.current.dispatch({ type: 'game-over' });
    });

    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, renderer: <Bird /> },
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

  const onEvent = (e) => {
    if (e.type === 'game-over') {
      setGameState({ ...gameState, running: false });
    } else if (e.type === 'score') {
      setGameState({ ...gameState, score: gameState.score + 1 });
    }
  };

  const exitGame = () => {
    showConfirmDialog('게임 종료', '게임을 나가시겠습니까?', () => {
      navigation.goBack();
    });
  };

  const reset = () => {
    gameEngine.current.swap(initWorld());
    setGameState(initState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.exit} onPress={exitGame}>
          <ExitIcon width={26} height={26} style={{ color: '#333' }} />
        </TouchableOpacity>
      </View>
      <View style={styles.gameContainer}>
        <GameEngine
          ref={gameEngine}
          running={gameState.running}
          onEvent={onEvent}
          systems={[Physics]}
          entities={initWorld()}
        >
          <Image
            style={{ flex: 1, zIndex: -1, resizeMode: 'cover' }}
            source={require('retrogamebox/assets/images/main_bg.png')}
            fadeDuration={0}
          />
        </GameEngine>
      </View>
      <Board
        score={gameState.score}
        onPressButton={() => gameEngine.current.dispatch({ type: 'JUMP' })}
      />
      {!gameState.running && gameState.count === 0 && (
        <GameResult
          gameID={'BIRD'}
          score={gameState.score}
          resetGame={reset}
          exitGame={exitGame}
        />
      )}
      {!gameState.running && gameState.count > 0 && (
        <View style={styles.fullScreen}>
          <Text style={styles.count}>{gameState.count}</Text>
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
  header: {
    height: 0,
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  exit: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  gameContainer: {
    height: 480,
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
  count: {
    fontFamily: 'DGM',
    color: 'whitesmoke',
    fontSize: 48,
  },
});
