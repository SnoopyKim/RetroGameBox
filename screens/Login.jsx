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
} from 'react-native';
import ImageButton from '../components/buttons/ImageButton';
import TextButton from '../components/buttons/TextButton';
import Input from '../components/form/Input';
import LoginForm from '../components/form/LoginForm';
import { AuthContext } from '../context/auth/auth-context';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const LoginScreen = ({ navigation }) => {
  const { isAuthenticated, guestLogin, emailLogin, register } =
    useContext(AuthContext);

  const [option, setOption] = useState('login');
  const isOptionLogin = option === 'login';

  const colorAnim = useRef(new Animated.Value(0)).current;

  const onPressTab = (selectedOption) => {
    if (option === selectedOption) return;
    Animated.timing(colorAnim, {
      toValue: isOptionLogin ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setOption(selectedOption));
  };

  const loginColor = {
    tab: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['purple', 'transparent'],
    }),
    text: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', 'purple'],
    }),
  };

  const registerColor = {
    tab: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'purple'],
    }),
    text: colorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['purple', 'white'],
    }),
  };

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Home');
    }
  }, [isAuthenticated]);

  const onLogin = (email, password) => {
    console.log('Login', email, password);
  };
  const onRegister = (email, password, name) => {
    console.log('Register', email, password, name);
  };

  return (
    <SafeAreaView style={styles.center}>
      <StatusBar />
      <View style={styles.tab}>
        <AnimatedTouchable
          style={[styles.tabItem, { backgroundColor: loginColor.tab }]}
          onPress={() => onPressTab('login')}
        >
          <Animated.Text style={[styles.tabText, { color: loginColor.text }]}>
            로그인
          </Animated.Text>
        </AnimatedTouchable>
        <AnimatedTouchable
          style={[styles.tabItem, { backgroundColor: registerColor.tab }]}
          onPress={() => onPressTab('register')}
        >
          <Animated.Text
            style={[styles.tabText, { color: registerColor.text }]}
          >
            회원가입
          </Animated.Text>
        </AnimatedTouchable>
      </View>

      <View style={styles.formWrapper}>
        <LoginForm
          isRegister={!isOptionLogin}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      </View>
      <View style={{ width: 280, marginTop: 20 }}>
        <TextButton onPressed={() => guestLogin()} title={'게스트 로그인'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    width: 300,
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'purple',
    borderWidth: 2,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabItemEnabled: {
    backgroundColor: 'purple',
  },
  tabText: {
    fontFamily: 'DGM',
    fontSize: 14,
    color: 'purple',
  },
  tabTextEnabled: {
    color: 'white',
  },
  formWrapper: {
    width: 300,
    padding: 10,
    marginTop: 20,
    backgroundColor: 'purple',
  },
});

export default LoginScreen;
