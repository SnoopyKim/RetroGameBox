import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
} from "react-native";
import ImageButton from "../components/buttons/ImageButton";
import TextButton from "../components/buttons/TextButton";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar />
      <TextButton
        title="로그인"
        onPressed={() => navigation.navigate("Home")}
        leading={require("../assets/images/selectBox.png")}
        trailing={require("../assets/images/selectBox.png")}
      />
      <ImageButton
        width={100}
        height={100}
        src={require("../assets/images/selectBox.png")}
        onPressed={() => ToastAndroid.show("까꿍", ToastAndroid.SHORT)}
        title={"로그인"}
        titleColor={"white"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "DGM",
    fontSize: 16,
  },
});

export default LoginScreen;
