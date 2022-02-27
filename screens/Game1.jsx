import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import Matter from "matter-js";
import { GameEngine, dispatch } from "react-native-game-engine";
import { Head } from "../Game1Components/head";
import { Food } from "../Game1Components/food";
import { Tail } from "../Game1Components/tail";
import { GameLoop } from "../Game1Components/systems";
import Constants from "../Game1Components/Constants";

export default class SnakeApp extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
    };
  }

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  onEvent = (e) => {
    if (e.type === "game-over") {
      this.setState({
        running: false,
      });
      Alert.alert("Game Over");
    }
  };
  reset = () => {
    this.engine.swap({
      1: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        nextMove: 10,
        updateFrequency: 10,
        size: 20,
        renderer: <Head />,
      },
      2: {
        position: [
          this.randomBetween(0, Constants.GRID_SIZE - 1),
          this.randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: 20,
        renderer: <Food />,
      },
      3: { size: 20, elements: [], renderer: <Tail /> },
    });
    this.setState({
      running: true,
    });
  };
  render() {
    return (
      <View style={StyleSheet.container}>
        <GameEngine
          ref={(ref) => {
            this.engine = ref;
          }}
          style={[
            {
              width: this.boardSize,
              height: this.boardSize,
              backgroundColor: "#ffffff",
              flex: null,
            },
          ]}
          systems={[GameLoop]}
          entities={{
            head: {
              position: [0, 0],
              xspeed: 1,
              yspeed: 0,
              nextMove: 10,
              updateFrequency: 10,
              size: 20,
              renderer: <Head />,
            },
            food: {
              position: [
                this.randomBetween(0, Constants.GRID_SIZE - 1),
                this.randomBetween(0, Constants.GRID_SIZE - 1),
              ],
              size: 20,
              renderer: <Food />,
            },
            tail: { size: 20, elements: [], renderer: <Tail /> },
          }}
          running={this.state.running}
          onEvent={this.onEvent}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        <Button title="New Game" onPress={this.reset} />
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-up" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-left" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
            <View style={[styles.control, { backgroundColor: null }]} />
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-right" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-down" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: "column",
  },
  controlRow: {
    height: 120,
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  control: {
    width: 120,
    height: 120,
    backgroundColor: "blue",
  },
});

AppRegistry.registerComponent("Snake", () => SnakeApp);
