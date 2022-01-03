import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import TextButton from '../components/buttons/TextButton';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar />
      <Text style={styles.title}>LoginScreen</Text>
      <TextButton
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'DGM',
    fontSize: 16,
  },
});

export default LoginScreen;
