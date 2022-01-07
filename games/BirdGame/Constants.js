import { Dimensions } from 'react-native';

export default Constants = {
  MAX_WIDTH: Dimensions.get('window').width,
  MAX_HEIGHT: Dimensions.get('window').height - 56,
  GAP_SIZE: 200, // gap between the two parts of the pipe
  PIPE_WIDTH: 100, // width of the pipe
};
