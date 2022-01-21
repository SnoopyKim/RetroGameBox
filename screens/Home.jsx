import { StatusBar } from 'expo-status-bar';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageButton from '../components/buttons/ImageButton';

const backgroundImg = require('../assets/images/main_bg.png');
const gameselectImg = require('../assets/images/selectBox.png');

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style='light' />
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        resizeMode='cover'
      >
        <Text style={styles.titleText}>레트로 게임 모음</Text>
        <ScrollView>
          <View style={styles.boxContainer}>
            <ImageButton
              src={gameselectImg}
              onPressed={() => navigation.navigate('SnakeGame')}
              title={'SnakeGame'}
              titleColor={'white'}
              titleSize={30}
              width={200}
              height={200}
            />
          </View>
          <View style={styles.boxContainer}>
            <ImageButton
              src={gameselectImg}
              onPressed={() => navigation.navigate('BirdGame')}
              title={'BirdGame'}
              titleColor={'white'}
              titleSize={30}
              width={200}
              height={200}
            />
          </View>
          <View style={styles.boxContainer}>
            <ImageButton
              src={gameselectImg}
              onPressed={() => navigation.navigate('NPCGame')}
              title={'NPCGame'}
              titleColor={'white'}
              titleSize={30}
              width={300}
              height={200}
            />
          </View>
        </ScrollView>
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
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'DGM',
    fontSize: 40,
    color: 'yellow',
  },
  boxContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  gameSelectBox: {
    margin: -50,
    transform: [{ scale: 0.5 }],
  },
});

export default HomeScreen;
