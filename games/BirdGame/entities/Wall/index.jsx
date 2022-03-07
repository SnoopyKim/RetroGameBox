import { View } from "react-native";

export default function Wall({ size, body }) {
  const [width, height] = size;
  const { x, y } = body.position;

  return (
    <View
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y - height / 2,
        width: width,
        height: height,
        backgroundColor: "#a300ef",
      }}
    />
  );
}
