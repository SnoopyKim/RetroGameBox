import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const GameScreen = () => {
  return (
    <SafeAreaView style={styles.center}>
      <Text>GameScreen</Text>
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

export default GameScreen;
