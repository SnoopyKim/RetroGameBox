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
import Puppet from "../myGameComponents/Puppet";
import Wall from "../myGameComponents/Wall";
import Shelf from "../myGameComponents/Shelf";
import Basket from "../myGameComponents/Basket";
import Matter from "matter-js";
import Physics from "../myGameComponents/Physics";
import Constants from "../myGameComponents/Constants";
import { GameEngine, dispatch } from "react-native-game-engine";

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
      Constants.MAX_HEIGHT / 1.5,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      20,
      Constants.MAX_WIDTH,
      40,
      { isStatic: true }
    );

    let crane = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 6,
      175,
      20,
      Constants.MAX_HEIGHT / 3,
      { isStatic: true }
    );

    let shelf = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 3.5 - 35,
      Constants.MAX_HEIGHT / 1.5 - 25,
      40,
      80,
      {
        isStatic: true,
        rotate: 4,
      }
    );

    let basket = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH,
      Constants.MAX_HEIGHT / 3,
      Constants.MAX_WIDTH / 18,
      Constants.MAX_HEIGHT / 1.2,
      { isStatic: true }
    );
    let basket2 = Matter.Bodies.rectangle(
      5,
      Constants.MAX_HEIGHT / 3.5,
      Constants.MAX_WIDTH / 18,
      Constants.MAX_HEIGHT / 2,
      { isStatic: true }
    );
    let basket3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 3.5,
      Constants.MAX_HEIGHT / 1.7,
      Constants.MAX_WIDTH / 18,
      Constants.MAX_HEIGHT / 6,
      { isStatic: true }
    );
    let puppet1 = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 4,
      25,
      { isStatic: false }
    );
    let puppet2 = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      25,
      { isStatic: false }
    );
    let puppet3 = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 1.5,
      Constants.MAX_HEIGHT / 3,
      25,
      { isStatic: false }
    );
    let puppet4 = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 1.5,
      Constants.MAX_HEIGHT / 5,
      25,
      { isStatic: false }
    );
    let puppet5 = Matter.Bodies.circle(
      Constants.MAX_WIDTH / 1.2,
      Constants.MAX_HEIGHT / 2,
      25,
      { isStatic: false }
    );

    Matter.Body.rotate(shelf, 4);

    Matter.Events.on(engine, "collisionactive", (event) => {
      var pairs = event.pairs;
    });
    Matter.World.add(world, [
      crane,
      ceiling,
      floor,
      shelf,
      basket,
      basket2,
      basket3,
      puppet1,
      puppet2,
      puppet3,
      puppet4,
      puppet5,
    ]);

    return {
      physics: { engine: engine, world: world },
      crane: {
        body: crane,
        size: [20, Constants.MAX_HEIGHT / 3],
        color: "silver",
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
        size: [Constants.MAX_WIDTH, 40],
        color: "teal",
        renderer: Wall,
      },
      shelf: {
        body: shelf,
        size: [40, 80],
        color: "teal",
        renderer: Shelf,
      },
      basket: {
        body: basket,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 1.2],
        color: "teal",
        renderer: Wall,
      },
      basket2: {
        body: basket2,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 2],
        color: "teal",
        renderer: Wall,
      },
      basket3: {
        body: basket3,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 6],
        color: "teal",
        renderer: Wall,
      },
      puppet1: {
        body: puppet1,
        color: "tomato",
        renderer: Puppet,
      },
      puppet2: {
        body: puppet2,
        color: "yellow",
        renderer: Puppet,
      },
      puppet3: {
        body: puppet3,
        color: "green",
        renderer: Puppet,
      },
      puppet4: {
        body: puppet4,
        color: "red",
        renderer: Puppet,
      },
      puppet5: {
        body: puppet5,
        color: "blue",
        renderer: Puppet,
      },
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          running={this.state.running}
          systems={[Physics]}
          entities={this.entities}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        <View style={styles.controls}>
          <View style={styles.textControl}>
            <Text style={styles.textBox}>Move</Text>
            <Text style={styles.textBox}>Grab</Text>
            <Text style={styles.textBox}>Stop</Text>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                alert("cheese");
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("Press Button2");
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("Press Button3");
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    flex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  controls: {
    flex: 1,
    width: Constants.MAX_WIDTH,
    height: 100,
    backgroundColor: "orange",
    top: Constants.MAX_HEIGHT / 1.45,
    flexDirection: "column",
  },
  textControl: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    height: 80,
    flexDirection: "row",
  },
  controlRow: {
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    height: Constants.MAX_HEIGHT / 5,
    backgroundColor: "orange",
    width: Constants.MAX_WIDTH,
    flexDirection: "row",
  },
  textBox: {
    marginVertical: 15,
    width: 100,
    fontSize: 25,
    textAlign: "center",
  },
  control: {
    width: 80,
    height: 80,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
  },
});
