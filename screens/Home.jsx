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
import { DialogContext } from './../context/dialog/dialog-context';
import SettingIcon from '../assets/images/icon_setting.svg';
import RankIcon from '../assets/images/icon_rank.svg';

const backgroundImg = require('../assets/images/main_bg.png');
const gameselectImg = require('../assets/images/selectBox.png');
const craneImg = require('../assets/images/CraneBg.png');
const JumpImg = require('../assets/images/JumpBg.png');
const NPCImg = require('../assets/images/NPCBg.jpg');

const HomeScreen = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { showSettingDialog, showRankDialog } = useContext(DialogContext);

  if (!isAuthenticated) {
    navigation.replace('Login');
    return <></>;
  }

  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style='light' />
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        fadeDuration={0}
        resizeMode='cover'
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => showRankDialog()}>
            <RankIcon width={30} height={30} style={{ color: 'whitesmoke' }} />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity onPress={() => showSettingDialog()}>
            <SettingIcon
              width={30}
              height={30}
              style={{ color: 'whitesmoke' }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleText}>레트로 게임 모음</Text>
        <ScrollView
          style={{ width: '90%', alignSelf: 'center' }}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.boxContainer}>
            <ImageButton
              src={craneImg}
              onPressed={() => navigation.navigate('CraneGame')}
              title={'뽑아뽑아'}
              titleColor={'white'}
              titleSize={30}
              width={200}
              height={200}
            />
          </View>
          <View style={styles.boxContainer}>
            <ImageButton
              src={JumpImg}
              onPressed={() => navigation.navigate('JumpGame')}
              title={'올라올라'}
              titleColor={'white'}
              titleSize={30}
              width={200}
              height={200}
            />
          </View>
          <View style={styles.boxContainer}>
            <ImageButton
              src={NPCImg}
              onPressed={() => navigation.navigate('NPCGame')}
              title={'싸워싸워'}
              titleColor={'white'}
              titleSize={30}
              width={200}
              height={200}
            />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
  },
  header: {
    position: 'absolute',
    right: 20,
    top: 30,
    flexDirection: 'row',
  },
  titleText: {
    marginTop: 80,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'DGM',
    fontSize: 36,
    color: 'yellow',
    textShadowColor: 'yellow',
    textShadowRadius: 8,
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
  footerText: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#333333aa',
    color: 'whitesmoke',
    fontFamily: 'DGM',
    fontSize: 12,
    borderRadius: 5,
  },
});

export default HomeScreen;
