import { View } from 'react-native';

export default function Finger({ body }) {
  const { x, y } = body.position;
  const radius = body.circleRadius;

  return (
    <View
      style={{
        position: 'absolute',
        top: y - radius,
        left: x - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        backgroundColor: 'red',
      }}
    />
  );
}
