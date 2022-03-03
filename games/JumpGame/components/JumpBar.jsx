import { View } from "react-native";
import React, { Component } from "react";

export default class JumpBar extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - 25;
    const y = this.props.body.position.y - height / 2;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color,
          rotation: this.props.rotate,
        }}
      ></View>
    );
  }
}
