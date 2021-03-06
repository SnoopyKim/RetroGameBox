import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageButton from "../components/buttons/ImageButton";
import { AuthContext } from "../context/auth/auth-context";
import { DialogContext } from "./../context/dialog/dialog-context";
import SettingIcon from "../assets/images/icon_setting.svg";
import RankIcon from "../assets/images/icon_rank.svg";

const backgroundImg = require("../assets/images/main_bg.png");
const gameselectImg = require("../assets/images/selectBox.png");
const craneImg = require("../assets/images/CraneBg.png");
const JumpImg = require("../assets/images/JumpBg.png");
const NpcImg = require("../assets/images/NpcBg.png");
const BirdImg = require("../assets/images/BirdBg.png");

const HomeScreen = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { showSettingDialog, showRankDialog } = useContext(DialogContext);

  if (!isAuthenticated) {
    navigation.replace("Login");
    return <></>;
  }

  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        fadeDuration={0}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.action}
            onPress={() => showRankDialog()}
          >
            <RankIcon width={30} height={30} style={{ color: "whitesmoke" }} />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity
            style={styles.action}
            onPress={() => showSettingDialog()}
          >
            <SettingIcon
              width={30}
              height={30}
              style={{ color: "whitesmoke" }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleText}>레트로 게임 모음</Text>
        <ScrollView style={{ marginTop: 50 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={styles.boxContainer}>
              <ImageButton
                src={craneImg}
                onPressed={() => navigation.navigate("CraneGame")}
                title={" "}
                titleColor={"white"}
                titleSize={20}
                width={150}
                height={150}
              />
            </View>
            <View style={styles.boxContainer}>
              <ImageButton
                src={JumpImg}
                onPressed={() => navigation.navigate("JumpGame")}
                title={" "}
                titleColor={"white"}
                titleSize={20}
                width={150}
                height={150}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.gameTxt}>뽑아뽑아</Text>
            <Text style={styles.gameTxt}>올라올라</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <View style={styles.boxContainer}>
              <ImageButton
                src={BirdImg}
                onPressed={() => navigation.navigate("BirdGame")}
                title={" "}
                titleColor={"white"}
                titleSize={20}
                width={150}
                height={150}
              />
            </View>
            <View style={styles.boxContainer}>
              <ImageButton
                src={NpcImg}
                onPressed={() => navigation.navigate("NPCGame")}
                title={" "}
                titleColor={"white"}
                titleSize={20}
                width={150}
                height={150}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.gameTxt}>날아날아</Text>
            <Text style={styles.gameTxt}>싸워싸워</Text>
          </View>
        </ScrollView>
        <Text style={styles.footerText}>SnoopyKim, 312Prime 제작</Text>
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
  header: {
    position: "absolute",
    right: 20,
    top: 30,
    flexDirection: "row",
  },
  action: {
    padding: 6,
    backgroundColor: "#800080aa",
    borderRadius: 10,
  },
  titleText: {
    marginTop: 120,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "DGM",
    fontSize: 36,
    color: "#f2ff5e",
    textShadowColor: "#f2ff5e",
    textShadowRadius: 8,
  },
  boxContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  gameTxt: {
    fontFamily: "DGM",
    fontSize: 25,
    color: "white",
  },
  footerText: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "#800080aa",
    color: "whitesmoke",
    fontFamily: "DGM",
    fontSize: 12,
    borderRadius: 5,
  },
});

export default HomeScreen;
