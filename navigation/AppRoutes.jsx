import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SnakeGameScreen from '../games/SnakeGame';
import BirdGameScreen from '../games/BirdGame';
import NPCGameScreen from '../games/NPCGame';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name='SnakeGame' component={SnakeGameScreen} />
      <Stack.Screen name='BirdGame' component={BirdGameScreen} />
      <Stack.Screen name='NPCGame' component={NPCGameScreen} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppRoutes;
