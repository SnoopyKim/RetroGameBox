import { View } from 'react-native';

export default function Floor({ body }) {
  const { x, y } = body.position;
  const { max, min } = body.bounds;
  const width = max.x - min.x;
  const height = max.y - min.y;

  return (
    <View
      style={{
        position: 'absolute',
        top: y - height / 2,
        left: x - width / 2,
        width,
        height,
        backgroundColor: 'black',
      }}
    />
  );
}
