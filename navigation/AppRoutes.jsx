import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import GameMy from '../screens/myGame';
import BirdGameScreen from '../games/BirdGame';
import NPCGameScreen from '../games/NPCGame';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth-context';
import NetworkLoading from '../components/NetworkLoading';
import { DatabaseContext } from '../context/database/database-context';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='GameMy' component={GameMy} />
      <Stack.Screen name='BirdGame' component={BirdGameScreen} />
      <Stack.Screen name='NPCGame' component={NPCGameScreen} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const { isLoading: authLoading } = useContext(AuthContext);
  const { isLoading: dbLoading } = useContext(DatabaseContext);
  return (
    <NavigationContainer>
      <AppNavigator />
      {(authLoading || dbLoading) && <NetworkLoading />}
    </NavigationContainer>
  );
};

export default AppRoutes;
