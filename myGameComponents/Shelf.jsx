import { View } from "react-native";
import React, { Component } from "react";

export default class Shelf extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2 - 3;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          rotation: 58,
          width: width,
          height: height,
          backgroundColor: this.props.color,
        }}
      ></View>
    );
  }
}
