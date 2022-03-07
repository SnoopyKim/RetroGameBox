import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import CraneGameScreen from '../games/CraneGame';
import NPCGameScreen from '../games/NPCGame';
import JumpGameScreen from '../games/JumpGame';
import BirdGameScreen from './../games/BirdGame';
import DialogController from './DialogController';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CraneGame" component={CraneGameScreen} />
      <Stack.Screen name="JumpGame" component={JumpGameScreen} />
      <Stack.Screen name="BirdGame" component={BirdGameScreen} />
      <Stack.Screen name="NPCGame" component={NPCGameScreen} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
      <DialogController />
    </NavigationContainer>
  );
};

export default AppRoutes;
