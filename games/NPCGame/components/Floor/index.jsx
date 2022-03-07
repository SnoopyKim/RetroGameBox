import React from "react";
import { View, Image } from "react-native";
import { IMAGES } from "../../Constants";

function Floor({ body }) {
  const { x, y } = body.position;
  const { max, min } = body.bounds;
  const width = max.x - min.x;
  const height = max.y - min.y;

  return (
    <View
      style={{
        position: "absolute",
        top: y - height / 2,
        left: x - width / 2,
        width,
        height,
        backgroundColor: "black",
      }}
    >
      <Image
        style={{
          flex: 1,
          resizeMode: "stretch",
        }}
        source={IMAGES.GROUND}
        fadeDuration={0}
      />
    </View>
  );
}

export default React.memo(Floor);
