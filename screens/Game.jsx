import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const GameScreen = () => {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style="light" />
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

export default GameScreen;
