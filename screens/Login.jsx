import { StatusBar } from 'expo-status-bar';
import { useContext, useLayoutEffect, useState, useRef } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Animated,
  View,
  ImageBackground,
} from 'react-native';
import ImageButton from '../components/buttons/ImageButton';
import TextButton from '../components/buttons/TextButton';
import LoginForm from '../components/form/LoginForm';
import { AuthContext } from '../context/auth/auth-context';
import { DatabaseContext } from '../context/database/database-context';
import SwitchTab from './../components/tabs/SwitchTab';
import { DialogContext } from './../context/dialog/dialog-context';

const backgroundImg = require('../assets/images/main_bg.png');

const LoginScreen = ({ navigation }) => {
  const { isAuthenticated, guestLogin, emailLogin, register } =
    useContext(AuthContext);
  const { subscribeProfile } = useContext(DatabaseContext);
  const { showConfirmDialog } = useContext(DialogContext);

  const [option, setOption] = useState(0);
  const isOptionLogin = option === 0;

  useLayoutEffect(() => {
    if (isAuthenticated) {
      subscribeProfile();
      navigation.replace('Home');
    }
  }, [isAuthenticated]);

  const onLogin = (email, password) => {
    emailLogin(email, password);
  };
  const onRegister = (email, password, name) => {
    register(email, password, name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ImageBackground
        style={styles.background}
        source={backgroundImg}
        resizeMode='cover'
      >
        <SwitchTab
          options={['로그인', '회원가입']}
          initialIndex={0}
          selectedColor={'mediumorchid'}
          elevationColor={'purple'}
          onSwitched={(prev, curr) => setOption(curr)}
        />

        <View style={styles.formWrapper}>
          <LoginForm
            isRegister={!isOptionLogin}
            onLogin={onLogin}
            onRegister={onRegister}
            color={'purple'}
          />
        </View>
        <View style={styles.elevationHelper} />
        <View style={{ width: 300, marginTop: 20 }}>
          <TextButton
            borderColor={'purple'}
            color={'purple'}
            leading={require('../assets/images/guest.png')}
            leadingTint={'purple'}
            onPressed={() =>
              showConfirmDialog(
                '게스트 로그인',
                '게스트 계정은 로그아웃 시 다시 로그인할 수 없고, 플레이 기록이 남지 않습니다',
                () => guestLogin()
              )
            }
            title={'게스트 로그인'}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: 300,
    padding: 10,
    marginTop: 20,
    backgroundColor: 'mediumorchid',
    borderRadius: 10,
    zIndex: 1,
  },
  elevationHelper: {
    width: 300,
    height: 20,
    marginTop: -13,
    backgroundColor: 'purple',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
});

export default LoginScreen;
