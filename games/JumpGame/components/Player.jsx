import React from "react";

import { Image, View } from "react-native";

function Player({ body, direction }) {
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
      }}
    >
      <Image
        style={{
          flex: 1,
          width: null,
          height: null,
          transform: direction ? [{ scaleX: -1 }] : [{ scaleX: 1 }],
          resizeMode: "stretch",
        }}
        source={require("../../../assets/images/redSlime.gif")}
      />
    </View>
  );
}

export default React.memo(Player);
