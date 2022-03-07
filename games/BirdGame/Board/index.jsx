import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Board = ({ score, onPressButton }) => {
  return (
    <ImageBackground
      style={styles.board}
      source={require('retrogamebox/assets/images/npc/board.png')}
      fadeDuration={0}
      resizeMode={'cover'}
    >
      <Text style={styles.scoreText}>SCORE: {score}</Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={onPressButton}>
          <Image
            style={styles.buttonImg}
            source={require('retrogamebox/assets/images/purpleBtn.png')}
            fadeDuration={0}
          />
          <Text style={styles.buttonText}>JUMP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Board;

const styles = StyleSheet.create({
  board: {
    flex: 1,
    alignItems: 'center',
  },
  scoreText: {
    fontFamily: 'DGM',
    color: 'whitesmoke',
    fontSize: 24,
    textShadowColor: '#333',
    textShadowRadius: 5,
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  button: {
    width: 120,
    height: 120,
    justifyContent: 'center',
  },
  buttonImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
  },
  buttonText: {
    position: 'absolute',
    left: 0,
    right: 8,
    fontFamily: 'DGM',
    color: 'whitesmoke',
    fontSize: 32,
    textAlign: 'center',
    textShadowColor: '#333',
    textShadowRadius: 5,
    zIndex: 1,
  },
});
