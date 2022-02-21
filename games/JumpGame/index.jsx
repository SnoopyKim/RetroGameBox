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
  View,
} from "react-native";
import Constants from "./Constants";
import Floor from "./components/Floor";
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
      Constants.MAX_HEIGHT / 4,
      Constants.MAX_WIDTH,
      Constants.MAX_HEIGHT / 4,
      { isStatic: true }
    );

    Matter.World.add(matterEngine.current.world, [floor]);
    return {
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, Constants.MAX_HEIGHT / 4],
        color: "purple",
        renderer: Floor,
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
            <Text>Time</Text>
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
    height: 100,
    position: "absolute",
    backgroundColor: "black",
    top: Constants.MAX_HEIGHT / 1.45,
    flexDirection: "column",
  },
});

export default JumpGameScreen;
