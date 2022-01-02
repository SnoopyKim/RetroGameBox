import { SafeAreaView, Image, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.center}>
      <StatusBar style="light" />
      <Button title="Go to Game" onPress={() => navigation.navigate('Game')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
  },
});
