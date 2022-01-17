import React, { Component } from "react";
import { View } from "react-native";

export default class Puppet extends Component {
  render() {
    const { body, item } = this.props;
    const radius = body.circleRadius;
    const x = body.position.x - radius;
    const y = body.position.y - radius;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: body.circleRadius * 2,
          height: body.circleRadius * 2,
          backgroundColor: this.props.color,
          borderRadius: body.circleRadius,
        }}
      ></View>
    );
  }
}
