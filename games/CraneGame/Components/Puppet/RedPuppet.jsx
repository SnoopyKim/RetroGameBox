import React, { Component, useState } from "react";
import { View, Image } from "react-native";
import Constants from "../../Constants";
import redslime from "../../../../assets/images/redSlime.gif";

export default function redPuppets({ bodies }) {
  const redPuppets = bodies.map((body, idx) => {
    const radius = body.circleRadius;
    const x = body.position.x - radius;
    const y = body.position.y - radius;

    return (
      <View
        key={idx}
        style={{
          width: radius * 2,
          height: radius * 2,
          position: "absolute",
          left: x,
          top: y,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: 2 * radius,
            height: 2 * radius,
            resizeMode: "stretch",
          }}
          source={redslime}
        ></Image>
      </View>
    );
  });
  return (
    <View
      style={{
        position: "absolute",
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
      }}
    >
      {redPuppets}
    </View>
  );
}
