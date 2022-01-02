import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar />
      <Text>LoginScreen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
