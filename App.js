import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, SafeAreaView } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from './navigation/AppRoutes';

let backgroundImg = require('./bg_images/main_bg.png');

export default function App() {
  return <AppRoutes />;
}
