import { View, Image } from "react-native";
import React, { Component } from "react";

export default class Ground extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
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
      >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "stretch",
          }}
          source={require("../../../assets/images/ground.png")}
        />
      </View>
    );
  }
}
