import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 56;

export default Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height - HEADER_HEIGHT,
  GAME_WIDTH: width,
  GAME_HEIGHT: (height - HEADER_HEIGHT) * 0.7,
};

export const IMAGES = {
  PLAYER: require('retrogamebox/assets/images/npc/player.png'),
  ENEMY: require('retrogamebox/assets/images/npc/enemy.png'),
  ROCK: require('retrogamebox/assets/images/npc/rock.png'),
  HEALTH: require('retrogamebox/assets/images/npc/health.png'),
  ATTACK: require('retrogamebox/assets/images/npc/attack.png'),
  SHIELD: require('retrogamebox/assets/images/npc/shield.png'),
  SPEED: require('retrogamebox/assets/images/npc/speed.png'),
  CRITICAL: require('retrogamebox/assets/images/npc/critical.png'),
  NORMAL: require('retrogamebox/assets/images/npc/normal.png'),
  RARE: require('retrogamebox/assets/images/npc/rare.png'),
  EPIC: require('retrogamebox/assets/images/npc/epic.png'),
};
