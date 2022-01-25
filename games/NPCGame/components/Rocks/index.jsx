import { Image, View } from 'react-native';
import Constants from '../../Constants';

export default function Rocks({ bodies }) {
  const rocks = bodies.map((body, idx) => {
    const { x, y } = body.position;
    const rad = body.circleRadius;
    return (
      <View
        key={idx}
        style={{
          width: rad * 2,
          height: rad * 2,
          position: 'absolute',
          left: x - rad,
          top: y - rad,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'stretch',
          }}
          fadeDuration={0}
          source={require('retrogamebox/assets/images/rock.png')}
        />
      </View>
    );
  });
  return (
    <View
      style={{
        width: Constants.GAME_WIDTH,
        height: Constants.GAME_HEIGHT,
      }}
    >
      {rocks}
    </View>
  );
}
