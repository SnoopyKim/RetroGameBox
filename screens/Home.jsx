import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
} from "react-native";

const backgroundImg = require("../bg_images/main_bg.png");
const gameselectImg = require("../bg_images/selectBox.png");

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        resizeMode="cover"
      >
        <Text style={styles.titleText}>레트로 게임 모음</Text>
        <View style={styles.boxContainer}>
          <Button
            title="Go to game"
            onPress={() => navigation.navigate("Game1")}
          />
          <Button
            title="Go to game2"
            onPress={() => navigation.navigate("GameEx")}
          />
        </View>
        <View style={styles.boxContainer}>
          <Button
            title="Go to game3"
            onPress={() => navigation.navigate("GameEx2")}
          />
          <Button
            title="Go to game4"
            onPress={() => navigation.navigate("GameMy")}
          />
        </View>
        <View style={styles.boxContainer}>
          <Image style={styles.gameSelectBox} source={gameselectImg} />
          <Image style={styles.gameSelectBox} source={gameselectImg} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
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
    fontFamily: "DGM",
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
    margin: 10,
    marginTop: 10,
    width: 150,
    height: 150,
  },
});

export default HomeScreen;
