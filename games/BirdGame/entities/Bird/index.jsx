import { View, Image } from 'react-native';

export default function Bird({ body }) {
  const radius = body.circleRadius;
  const x = body.position.x - radius;
  const y = body.position.y - radius;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: radius * 2 + 4,
        height: radius * 2 + 12,
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
        source={require('retrogamebox/assets/images/redSlime.gif')}
      />
    </View>
  );
}
