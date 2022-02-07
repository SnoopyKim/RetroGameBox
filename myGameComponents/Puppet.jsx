import React, { Component } from "react";
import { View, Image } from "react-native";
import Constants from "./Constants";

export default function Puppet({ bodies }) {
  const puppets = bodies.map((body, idx) => {
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
            width: null,
            height: null,
            resizeMode: "stretch",
          }}
          source={require("retrogamebox/assets/images/slime.gif")}
        ></Image>
      </View>
    );
  });
  return (
    <View style={{ width: Constants.MAX_WIDTH, height: Constants.MAX_HEIGHT }}>
      {puppets}
    </View>
  );
}
