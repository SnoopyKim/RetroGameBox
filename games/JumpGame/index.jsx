import { StatusBar } from "expo-status-bar";
import Matter from "matter-js";
import { useReducer, useRef, useState, useEffect } from "react";
import { render } from "react-dom";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import Constants from "./Constants";
import Floor from "./components/Floor";
import Player from "./components/Player";
import { GameEngine } from "react-native-game-engine";
import AssetLoading from "../../components/AssetLoading";

const initState = {};
const backgroundImg = require("../../assets/images/main_bg.png");

const JumpGameScreen = () => {
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [gameState, setGameState] = useState(initState);
  const timer = useRef(null);

  const initEntities = () => {
    matterEngine.current = Matter.Engine.create({ enableSleeping: false });

    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 1.45 - 25,
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
    let player = Matter.Bodies.rectangle(40, floor.position.y - 50, 40, 40, {
      isStatic: true,
    });

    Matter.World.add(matterEngine.current.world, [
      floor,
      floor2,
      floor3,
      player,
    ]);
    return {
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
        renderer: Player,
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
            running={gameState.running}
          ></GameEngine>
        </AssetLoading>
        <View style={styles.controls}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity>
              <View>
                <Image
                  source={require("../../assets/images/redBtn.png")}
                  resizeMode="contain"
                  style={{ width: 120, height: 120 }}
                ></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Image
                  source={require("../../assets/images/redBtn.png")}
                  resizeMode="contain"
                  style={{ width: 120, height: 120 }}
                ></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <Image
                  source={require("../../assets/images/redBtn.png")}
                  resizeMode="contain"
                  style={{ width: 120, height: 120 }}
                ></Image>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
  },
  gameContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  controls: {
    flex: 1,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT / 4,
    position: "absolute",
    backgroundColor: "black",
    top: Constants.MAX_HEIGHT / 1.45,
    flexDirection: "column",
  },
});

export default JumpGameScreen;
