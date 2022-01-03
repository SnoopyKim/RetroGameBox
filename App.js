import { StatusBar } from "expo-status-bar";
import Game1Screen from "./";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
let backgroundImg = require("./bg_images/main_bg.png");
let gameselectImg = require("./bg_images/selectBox.png");

export default function App() {
  const [loaded] = useFonts({
    DungGeunMo: require("./assets/fonts/DungGeunMo.ttf"),
  });

  if (!loaded) {
    return null;
  }

  <StatusBar style="light" />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{ title: "메인화면" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
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
    fontSize: 39,
    color: "yellow",
    fontFamily: "DungGeunMo",
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
