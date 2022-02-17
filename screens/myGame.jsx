import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import RedPuppet from "../myGameComponents/Puppet/RedPuppet";
import BluePuppet from "../myGameComponents/Puppet/BluePuppet";
import YellowPuppet from "../myGameComponents/Puppet/YellowPuppet";
import Wall from "../myGameComponents/Wall";
import Shelf from "../myGameComponents/Shelf";
import Crane from "../myGameComponents/Crane";
import Matter, { Engine } from "matter-js";
import Physics from "../myGameComponents/Physics";
import Constants from "../myGameComponents/Constants";
import { GameEngine } from "react-native-game-engine";
import AssetLoading from "../components/AssetLoading";

const backgroundImg = require("../assets/images/main_bg.png");

export default class Mygame extends Component {
  constructor(props) {
    super(props);
    this.timeInterval = null;
    const defaultTime = 60;
    this.state = {
      running: true,
      isMove: false,
      isGrab: false,
      score: 0,
      time: defaultTime,
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }
  setupTicks = () => {
    this.timeInterval = setInterval(this.timerTick, 1000);
  };
  timerTick = () => {
    if (this.state.time === 0) {
      this.setState({ running: false });
    } else {
      this.setState({
        time: this.state.time - 1,
      });
    }
  };
  reset = () => {
    this.setState({
      time: 60,
      score: 0,
      isGrab: false,
      isMove: false,
      running: true,
    });
    this.setState(this.setupTicks);
  };

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
      Constants.MAX_HEIGHT / 6 - Constants.MAX_HEIGHT / 4,
      15,
      Constants.MAX_HEIGHT / 1.5,
      { isStatic: true }
    );

    let craneBar = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 8,
      Constants.MAX_HEIGHT / 4,
      10,
      100,
      { isStatic: true, name: "craneBar" }
    );

    let cranePin1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 6 + 5,
      crane.position.y + 20 + Constants.MAX_HEIGHT / 4,
      7,
      50,
      {
        isStatic: true,
        collisionFilter: {
          category: 0x0010,
        },
        angle: 45,
      }
    );
    let cranePin2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 6 - 5,
      crane.position.y + 20 + Constants.MAX_HEIGHT / 4,
      7,
      50,
      {
        isStatic: true,
        collisionFilter: {
          category: 0x0010,
        },
        angle: -45,
      }
    );
    let cranePin3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 6 - 5,
      crane.position.y + 20 + Constants.MAX_HEIGHT / 4,
      7,
      60,
      {
        isStatic: true,
        name: "cranePin",
        collisionFilter: {
          category: 0x0010,
        },
        angle: -20,
      }
    );
    let cranePin4 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 6 - 5,
      crane.position.y + 20 + Constants.MAX_HEIGHT / 4,
      7,
      60,
      {
        isStatic: true,
        name: "cranePin",
        collisionFilter: {
          category: 0x00010,
        },
        angle: 20,
      }
    );

    let shelf = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 3.5 - 41,
      Constants.MAX_HEIGHT / 1.5 - 29,
      45,
      97,
      { isStatic: true, angle: 70 }
    );

    let basket = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH,
      Constants.MAX_HEIGHT / 3 - 10,
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
      Constants.MAX_WIDTH / 18 + 3,
      Constants.MAX_HEIGHT / 6,
      { isStatic: true }
    );
    let scoreBar = Matter.Bodies.rectangle(
      -30,
      Constants.MAX_HEIGHT / 1.6,
      30,
      20,
      { isStatic: true, name: "scoreBar" }
    );

    //크레인에 잡힘
    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (bodyA.name === "craneBar" && this.state.isGrab === true) {
          this.gameEngine.dispatch({ type: "craneGrab", puppet: bodyB });
        }
      });
    });
    // 스코어 1up
    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (bodyA.name === "scoreBar") {
          this.gameEngine.dispatch({ type: "scoreUp", rPuppet: bodyB });
          this.setState({
            score: this.state.score + 5,
            time: this.state.time + 2,
          });
          if (this.state.score % 10 === 0) {
            this.gameEngine.dispatch({ type: "speedUp" });
          }
        }
      });
    });

    Matter.World.add(world, [
      crane,
      craneBar,
      cranePin1,
      cranePin2,
      cranePin3,
      cranePin4,
      ceiling,
      floor,
      shelf,
      basket,
      basket2,
      basket3,
      scoreBar,
    ]);

    return {
      physics: { engine: engine, world: world },
      crane: {
        body: crane,
        size: [15, Constants.MAX_HEIGHT / 2],
        color: "gold",
        renderer: Crane,
      },
      craneBar: {
        body: craneBar,
        size: [10, 100],
        color: "transparent",
        renderer: Crane,
      },
      cranePin1: {
        body: cranePin1,
        size: [7, 50],
        color: "gold",
        renderer: Crane,
        rotate: 45,
      },
      cranePin2: {
        body: cranePin2,
        size: [7, 50],
        color: "gold",
        renderer: Crane,
        rotate: -45,
      },
      cranePin3: {
        body: cranePin3,
        size: [7, 60],
        color: "gold",
        renderer: Crane,
        rotate: -10,
      },
      cranePin4: {
        body: cranePin4,
        size: [7, 60],
        color: "gold",
        renderer: Crane,
        rotate: 10,
      },
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        color: "purple",
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 40],
        color: "purple",
        renderer: Wall,
      },
      shelf: {
        body: shelf,
        size: [45, 97],
        color: "purple",
        renderer: Shelf,
        rotate: 58,
      },
      basket: {
        body: basket,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 1.2],
        color: "purple",
        renderer: Wall,
      },
      basket2: {
        body: basket2,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 2],
        color: "purple",
        renderer: Wall,
      },
      basket3: {
        body: basket3,
        size: [Constants.MAX_WIDTH / 18 + 3, Constants.MAX_HEIGHT / 6],
        color: "purple",
        renderer: Wall,
      },
      redPuppets: {
        bodies: [],
        renderer: RedPuppet,
      },
      yellowPuppets: {
        bodies: [],
        renderer: YellowPuppet,
      },
      bluePuppets: {
        bodies: [],
        renderer: BluePuppet,
      },
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImg}
          resizeMode="stretch"
        >
          <GameEngine
            ref={(ref) => {
              this.gameEngine = ref;
            }}
            style={styles.gameContainer}
            running={this.state.running}
            systems={[Physics]}
            entities={this.entities}
            onEvent={(e) => {
              if (e.type === "resetCrane") {
                this.setState({ isGrab: false });
              }
            }}
          >
            <StatusBar hidden={true} />
          </GameEngine>
          <View style={styles.controls}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20, fontFamily: "DGM" }}>
                score:{this.state.score} Time:{this.state.time}
              </Text>
              <TouchableOpacity style={styles.resetBtn}>
                <Text style={{ fontFamily: "DGM" }}>리셋</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity
                disabled={this.state.isGrab}
                onPress={() => {
                  if (this.state.isMove === false) {
                    this.gameEngine.dispatch({ type: "craneMove" });
                    this.setState({ isMove: true });
                    if (this.state.time === 60) {
                      this.setState(this.setupTicks);
                    }
                  } else {
                    this.gameEngine.dispatch({ type: "craneStop" });
                    this.setState({ isMove: false, isGrab: true });
                  }
                }}
              >
                <View style={styles.control}>
                  <Text style={styles.textBox}>
                    {this.state.isMove ? "잡기" : "이동"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
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
    backgroundColor: "teal",
    top: Constants.MAX_HEIGHT / 1.45,
    flexDirection: "column",
  },
  controlRow: {
    justifyContent: "center",
    alignItems: "center",
    top: 20,
    height: Constants.MAX_HEIGHT / 9,
    backgroundColor: "teal",
    width: Constants.MAX_WIDTH,
    flexDirection: "row",
  },
  textBox: {
    fontSize: 35,
    fontFamily: "DGM",
  },
  control: {
    width: 120,
    height: 120,
    margin: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderWidth: 5,
    borderColor: "black",
    borderStyle: "dotted",
  },
  resetBtn: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderWidth: 3,
    borderColor: "black",
  },
});
