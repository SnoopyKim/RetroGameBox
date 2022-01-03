import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const backgroundImg = require('../bg_images/main_bg.png');
const gameselectImg = require('../bg_images/selectBox.png');

const HomeScreen = () => {
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
  },
  titleText: {
    marginTop: 90,
    textAlign: 'center',
    fontFamily: 'DGM',
    fontSize: 40,
    color: 'yellow',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  gameSelectBox: {
    margin: -50,
    transform: [{ scale: 0.5 }],
  },
});

export default HomeScreen;
