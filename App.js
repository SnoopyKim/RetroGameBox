import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";
let backgroundImg = require("./bg_images/main_bg.png");
let gameselectImg = require("./bg_images/selectBox.png");

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        resizeMode="cover"
      >
        <Text style={styles.titleText}>레트로 게임 모음</Text>
        <View style={styles.boxContainer}>
          <Image style={styles.gameSelectBox} source={gameselectImg}></Image>
          <Image style={styles.gameSelectBox} source={gameselectImg}></Image>
        </View>
        <View style={styles.boxContainer}>
          <Image style={styles.gameSelectBox} source={gameselectImg}></Image>
          <Image style={styles.gameSelectBox} source={gameselectImg}></Image>
        </View>
        <View style={styles.boxContainer}>
          <Image style={styles.gameSelectBox} source={gameselectImg}></Image>
          <Image style={styles.gameSelectBox} source={gameselectImg}></Image>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
  },
  titleText: {
    marginTop: 90,
    textAlign: "center",
    fontSize: 40,
    color: "yellow",
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  gameSelectBox: {
    margin: -50,
    transform: [{ scale: 0.5 }],
  },
});
