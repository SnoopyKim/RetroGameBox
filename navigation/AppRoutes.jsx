import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import GameMy from '../screens/myGame';
import NPCGameScreen from '../games/NPCGame';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/auth-context';
import NetworkLoading from '../components/NetworkLoading';
import { DatabaseContext } from '../context/database/database-context';
import JumpGameScreen from '../games/JumpGame';
import { DialogContext } from './../context/dialog/dialog-context';
import AlertDialog from './../components/dialogs/AlertDialog';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GameMy" component={GameMy} />
      <Stack.Screen name="JumpGame" component={JumpGameScreen} />
      <Stack.Screen name="NPCGame" component={NPCGameScreen} />
    </Stack.Navigator>
  );
};

const AppRoutes = () => {
  const { isLoading: authLoading } = useContext(AuthContext);
  const { isLoading: dbLoading } = useContext(DatabaseContext);
  const { type: dialogType } = useContext(DialogContext);

  return (
    <NavigationContainer>
      <AppNavigator />
      {(authLoading || dbLoading) && <NetworkLoading />}
      {dialogType === 'alert' && <AlertDialog />}
      {/* {dialogType === 'confirm' && <ConfirmDialog />}
      {dialogType === 'setting' && <SettingDialog />} */}
    </NavigationContainer>
  );
};

export default AppRoutes;
