import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height - 56,
  GAME_WIDTH: width,
  GAME_HEIGHT: height - 356,
  BOARD_HEIGHT: 300,
};
