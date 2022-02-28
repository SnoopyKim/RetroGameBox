import { StatusBar } from "expo-status-bar";
import Matter from "matter-js";
import { useReducer, useRef, useState, useEffect } from "react";
import { render } from "react-dom";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  View,
} from "react-native";
import Constants from "./Constants";
import Floor from "./components/Floor";
import Spike from "./components/Spike";
import Player from "./components/Player";
import MoveSystem from "./MoveSystem";
import { GameEngine } from "react-native-game-engine";
import AssetLoading from "../../components/AssetLoading";

const initState = {
  running: true,
};
const backgroundImg = require("../../assets/images/main_bg.png");

const JumpGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [gameState, setGameState] = useState(initState);
  //나중에 initstate에 통합할것. 시간과 방향임.
  const timer = useRef(null);
  let directionLR;

  const initEntities = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    //1 2 3층
    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 1.2 - 25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      floor.position.y - 170,
      Constants.MAX_WIDTH,
      20,
      { isStatic: true }
    );
    let floor3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      floor2.position.y - 170,
      Constants.MAX_WIDTH,
      20,
      { isStatic: true }
    );
    let wallLeft = Matter.Bodies.rectangle(
      -25,
      Constants.MAX_HEIGHT / 2,
      50,
      Constants.MAX_HEIGHT,
      { isStatic: true }
    );
    let wallRight = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + 25,
      Constants.MAX_HEIGHT / 2,
      50,
      Constants.MAX_HEIGHT,
      { isStatic: true }
    );
    let spike1 = Matter.Bodies.rectangle(150, floor.position.y - 30, 30, 20, {
      isStatic: true,
    });
    let spike2 = Matter.Bodies.rectangle(300, floor.position.y - 30, 30, 20, {
      isStatic: true,
    });

    // 플레이어 캐릭터
    let player = Matter.Bodies.circle(50, floor.position.y - 100, 25, {
      isStatic: false,
    });
    let jumpBar = Matter.Bodies.rectangle(
      player.position.x,
      player.position.y,
      0,
      0,
      { isStatic: true }
    );

    Matter.World.add(world, [
      floor,
      floor2,
      floor3,
      wallLeft,
      wallRight,
      spike1,
      spike2,
      player,
      jumpBar,
    ]);

    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
      });
    });
    return {
      moveSystem: { engine: engine, world: world },
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        color: "#964b00",
        renderer: Floor,
      },
      floor2: {
        body: floor2,
        size: [Constants.MAX_WIDTH - 90, 20],
        color: "purple",
        renderer: Floor,
      },
      floor3: {
        body: floor3,
        size: [Constants.MAX_WIDTH - 80, 20],
        color: "purple",
        renderer: Floor,
      },
      player: {
        body: player,
        size: [50, 50],
        color: "red",
        renderer: <Player />,
        direction: directionLR ? true : false,
      },
      jumpBar: {
        body: jumpBar,
        size: [50, 10],
        color: "red",
        renderer: Floor,
      },
      spike1: {
        body: spike1,
        size: [100, 40],
        renderer: Spike,
      },
      spike2: {
        body: spike2,
        size: [100, 40],
        renderer: Spike,
      },
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        resizeMode="stretch"
      >
        <AssetLoading>
          <StatusBar style="dark" />
          <GameEngine
            ref={gameEngine}
            style={styles.gameContainer}
            entities={initEntities()}
            systems={[MoveSystem]}
            running={gameState.running}
          ></GameEngine>
        </AssetLoading>
      </ImageBackground>
      <View style={styles.controls}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btns}
            onPressIn={() => {
              directionLR = true;
              console.log(directionLR);
              gameEngine.current.dispatch({ type: "MoveStartL" });
            }}
            onPressOut={() => {
              gameEngine.current.dispatch({ type: "MoveEndL" });
            }}
          >
            <View style={styles.btnSlot}>
              <Image
                source={require("../../assets/images/redBtn.png")}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              ></Image>
              <Text style={styles.textBox}>◀</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btns}
            onPressIn={() => {
              directionLR = false;
              console.log(directionLR);
              gameEngine.current.dispatch({ type: "MoveStartR" });
            }}
            onPressOut={() => {
              gameEngine.current.dispatch({ type: "MoveEndR" });
            }}
          >
            <View style={styles.btnSlot}>
              <Image
                source={require("../../assets/images/redBtn.png")}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              ></Image>
              <Text style={styles.textBox}>▶</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btns}
            onPressIn={() => {
              gameEngine.current.dispatch({ type: "JumpStart" });
            }}
            onPressOut={() => {
              gameEngine.current.dispatch({ type: "JumpEnd" });
            }}
          >
            <View style={styles.btnSlot}>
              <Image
                source={require("../../assets/images/redBtn.png")}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              ></Image>
              <Text style={styles.textBox}>Jump</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#964b00",
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
    marginBottom: 200,
  },
  gameContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    overflow: "hidden",
  },
  controls: {
    flex: 1,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT / 4,
    position: "absolute",
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    top: Constants.MAX_HEIGHT / 1.2,
    flexDirection: "column",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: Constants.MAX_WIDTH,
  },
  btnSlot: {
    width: 100,
    height: 100,
    position: "absolute",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  btns: {
    width: 100,
    height: 100,
    margin: 5,
    alignItems: "flex-end",
    backgroundColor: "white",
    borderRadius: 140,
    justifyContent: "center",
  },
  textBox: {
    fontSize: 35,
    fontFamily: "DGM",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JumpGameScreen;
