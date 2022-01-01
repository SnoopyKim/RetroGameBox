import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
let backgroundImg = require('./bg_images/main_bg.png');

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={backgroundImg} />
      <StatusBar style="light" />
      <View>
        <Button title="cheese"></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
  },
});
