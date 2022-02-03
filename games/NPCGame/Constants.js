import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const APP_BAR_HEIGHT = 56;
const BOARD_HEIGHT = 200;

export default Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height - APP_BAR_HEIGHT,
  GAME_WIDTH: width,
  GAME_HEIGHT: height - APP_BAR_HEIGHT - BOARD_HEIGHT,
  BOARD_HEIGHT,
};
