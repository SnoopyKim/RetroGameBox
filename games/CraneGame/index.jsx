import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import RedPuppet from "./Components/Puppet/RedPuppet";
import BluePuppet from "./Components/Puppet/BluePuppet";
import YellowPuppet from "./Components/Puppet/YellowPuppet";
import Wall from "./Components/Wall";
import Shelf from "./Components/Shelf";
import Crane from "./Components/Crane";
import Matter, { Engine } from "matter-js";
import Physics from "./Physics";
import Constants from "./Constants";
import { DialogContext } from "../../context/dialog/dialog-context";
import { GameEngine } from "react-native-game-engine";
import AssetLoading from "../../components/AssetLoading";
import ExitIcon from "../../assets/images/icon_exit.svg";
const backgroundImg = require("../../assets/images/main_bg.png");
const redBtn = require("../../assets/images/rainbowBtn.gif");

let deepPurple = "purple";

export default class CraneGameScreen extends Component {
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
    this.showConfirmDialog = DialogContext;
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
  exitGame = () => {
    showConfirmDialog("게임 종료", "게임을 나가시겠습니까?", () => {
      navigation.goBack();
    });
  };
  reset = () => {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.setState({
      time: 60,
      score: 0,
      isGrab: false,
      isMove: false,
      running: true,
    });
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
        color: deepPurple,
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 40],
        color: deepPurple,
        renderer: Wall,
      },
      shelf: {
        body: shelf,
        size: [45, 97],
        color: deepPurple,
        renderer: Shelf,
        rotate: 58,
      },
      basket: {
        body: basket,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 1.2],
        color: deepPurple,
        renderer: Wall,
      },
      basket2: {
        body: basket2,
        size: [Constants.MAX_WIDTH / 18, Constants.MAX_HEIGHT / 2],
        color: deepPurple,
        renderer: Wall,
      },
      basket3: {
        body: basket3,
        size: [Constants.MAX_WIDTH / 18 + 3, Constants.MAX_HEIGHT / 6],
        color: deepPurple,
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
              <Text style={{ color: "white", fontSize: 20, fontFamily: "DGM" }}>
                score:{this.state.score} Time:{this.state.time}
              </Text>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => {
                  this.gameEngine.dispatch({ type: "resetGame" }),
                    this.setState(this.reset);
                }}
              >
                <Text style={{ fontFamily: "DGM" }}>리셋</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.craneBtn}
                disabled={this.state.isGrab}
                onPress={() => {
                  if (this.state.running === false) {
                    this.setState({ running: true });
                  } else {
                    if (this.state.isMove === false) {
                      this.setState({ isMove: true });
                      this.gameEngine.dispatch({ type: "craneMove" });
                      if (this.state.time === 60) {
                        this.setState(this.setupTicks);
                      }
                    } else {
                      this.gameEngine.dispatch({ type: "craneStop" });
                      this.setState({ isMove: false, isGrab: true });
                    }
                  }
                }}
              >
                <View style={styles.control}>
                  <Image
                    source={redBtn}
                    resizeMode="contain"
                    style={{ width: 140, height: 140 }}
                  ></Image>
                  <Text style={styles.textBox}>
                    {this.state.isGrab ? "뽑기" : "이동"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={this.exitGame}
              style={{
                justifyContent: "flex-start",
                alignContent: "flex-end",
              }}
            >
              <ExitIcon width={26} height={26} style={{ color: "white" }} />
            </TouchableOpacity>
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
  header: {
    position: "absolute",
    width: Constants.MAX_WIDTH,
    height: 56,
    paddingTop: 10,
    paddingEnd: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
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
    backgroundColor: "black",
    top: Constants.MAX_HEIGHT / 1.45,
    flexDirection: "column",
  },
  controlRow: {
    justifyContent: "center",
    alignItems: "center",
    height: Constants.MAX_HEIGHT / 12,
    backgroundColor: "blue",
    width: Constants.MAX_WIDTH,
    flexDirection: "row",
  },
  textBox: {
    fontSize: 35,
    fontFamily: "DGM",
    position: "absolute",
  },
  control: {
    width: 120,
    height: 120,
    position: "absolute",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  craneBtn: {
    width: 120,
    height: 120,
    alignItems: "flex-end",
    backgroundColor: "white",
    borderRadius: 140,
    justifyContent: "center",
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
    borderStyle: "dotted",
  },
});
