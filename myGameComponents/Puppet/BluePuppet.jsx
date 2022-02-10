import React, { Component, useState } from "react";
import { View, Image } from "react-native";
import Constants from "../Constants";
import blueslime from "../../assets/images/blueSlime.gif";

export default function bluePuppets({ bodies }) {
  const bluePuppets = bodies.map((body, idx) => {
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
          source={blueslime}
        ></Image>
      </View>
    );
  });
  return (
    <View style={{ width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT }}>
      {bluePuppets}
    </View>
  );
}
