import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import TextButton from '../../components/buttons/TextButton';
import Constants from './Constants';
import Food from './entities/Food';
import Head from './entities/Head';
import Tail from './entities/Tail';
import GameLoop from './GameLoop';

const SnakeGameScreen = () => {
  const BOARD_SIZE = Constants.GRID_SIZE * Constants.CELL_SIZE;

  const gameEngine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const initGame = () => {
    return {
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 1,
        yspeed: 0,
        renderer: <Head />,
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    };
  };

  const resetGame = () => {
    gameEngine.current.swap(initGame());
    setIsGameRunning(true);
  };

  return (
    <SafeAreaView style={styles.canvas}>
      <StatusBar style="light" />
      <GameEngine
        ref={gameEngine}
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          flex: null,
          backgroundColor: 'white',
        }}
        entities={initGame()}
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case 'game-over':
              setIsGameRunning(false);
              return;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => gameEngine.current.dispatch('move-up')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => gameEngine.current.dispatch('move-left')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, { backgroundColor: null }]} />
          <TouchableOpacity
            onPress={() => gameEngine.current.dispatch('move-right')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => gameEngine.current.dispatch('move-down')}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        <View style={styles.dialogBackground}>
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
            title={'Start New Game'}
            onPressed={resetGame}
            borderColor={'white'}
            fontSize={20}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100,
  },
  dialogBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000CC',
  },
});

export default SnakeGameScreen;
