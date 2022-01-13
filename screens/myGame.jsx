import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import Wall from "../myGameComponents/Wall";
import Basket from "../myGameComponents/Basket";
import Matter from "matter-js";
import Constants from "../myGameComponents/Constants";
import { GameEngine } from "react-native-game-engine";

export default class Mygame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 20,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );

    let crane = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 8,
      Constants.MAX_HEIGHT / 12,
      Constants.MAX_WIDTH,
      50,
      { isStatic: false }
    );

    let basket = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 3.4,
      Constants.MAX_HEIGHT / 7,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let basket2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 1,
      Constants.MAX_HEIGHT / 7,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let basket3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 50 - 1,
      Constants.MAX_HEIGHT / 7,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );

    Matter.Events.on(engine, "collisionStart", (event) => {
      var pairs = event.pairs;
    });
    Matter.World.add(world, crane, ceiling, floor, basket, basket2, basket3);

    return {
      crane: {
        body: crane,
        size: [Constants.MAX_WIDTH / 10, Constants.MAX_HEIGHT / 3],
        color: "black",
        renderer: Wall,
      },
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        color: "teal",
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 50],
        color: "teal",
        renderer: Wall,
      },
      basket1: {
        body: basket,
        size: [Constants.MAX_WIDTH / 15, 150],
        color: "teal",
        renderer: Basket,
      },
      basket2: {
        body: basket2,
        size: [Constants.MAX_WIDTH / 12, 150],
        color: "teal",
        renderer: Basket,
      },
      basket3: {
        body: basket3,
        size: [Constants.MAX_WIDTH / 15, 150],
        color: "teal",
        renderer: Basket,
      },
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          style={styles.gameContainer}
          running={this.state.running}
          entities={this.entities}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
