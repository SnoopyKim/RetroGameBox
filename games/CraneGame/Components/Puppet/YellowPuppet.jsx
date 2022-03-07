import React, { Component, useState } from "react";
import { View, Image } from "react-native";
import Constants from "../../Constants";
import yellowslime from "../../../../assets/images/yellowSlime.gif";

export default function yellowPuppets({ bodies }) {
  const yellowPuppets = bodies.map((body, idx) => {
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
          source={yellowslime}
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
      {yellowPuppets}
    </View>
  );
}
