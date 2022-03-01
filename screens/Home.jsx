import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
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
} from 'react-native';
import ImageButton from '../components/buttons/ImageButton';
import { AuthContext } from '../context/auth/auth-context';

import SettingIcon from '../assets/images/icon_setting.svg';
import { DialogContext } from './../context/dialog/dialog-context';

const backgroundImg = require('../assets/images/main_bg.png');
const gameselectImg = require('../assets/images/selectBox.png');

const HomeScreen = ({ navigation }) => {
  const { isAuthenticated, name, logout } = useContext(AuthContext);
  const { showAlertDialog } = useContext(DialogContext);

  if (!isAuthenticated) {
    navigation.replace('Login');
    return <></>;
  }

  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style="light" />
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.setting}
          onPress={() =>
            showAlertDialog('TITLE', 'CONTENTfskjdfksbdfkbsdkjfsfsdfsdfsdf')
          }
        >
          <SettingIcon width={30} height={30} style={{ color: 'white' }} />
        </TouchableOpacity>
        <Text style={styles.titleText}>레트로 게임 모음</Text>
        <ScrollView>
          <View style={styles.boxContainer}>
            <ImageButton
              src={gameselectImg}
              onPressed={() => navigation.navigate('GameMy')}
              title={'312Game'}
              titleColor={'white'}
              titleSize={30}
              width={200}
              height={200}
            />
          </View>
          <View style={styles.boxContainer}>
            <ImageButton
              src={gameselectImg}
              onPressed={() => navigation.navigate('JumpGame')}
              title={'JumpGame'}
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
  setting: {
    position: 'absolute',
    right: 20,
    top: 30,
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
    margin: 10,
    marginTop: 10,
    width: 150,
    height: 150,
  },
});

export default HomeScreen;
