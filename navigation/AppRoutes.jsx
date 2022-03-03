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
import ConfirmDialog from '../components/dialogs/ConfirmDialog';
import SettingDialog from '../components/dialogs/SettingDialog';
import RankDialog from '../components/dialogs/RankDialog';
import RegisterDialog from '../components/dialogs/RegisterDialog';
import NameDialog from '../components/dialogs/NameDialog';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='GameMy' component={GameMy} />
      <Stack.Screen name='JumpGame' component={JumpGameScreen} />
      <Stack.Screen name='NPCGame' component={NPCGameScreen} />
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
      {dialogType === 'alert' && <AlertDialog />}
      {dialogType === 'confirm' && <ConfirmDialog />}
      {dialogType === 'setting' && <SettingDialog />}
      {dialogType === 'rank' && <RankDialog />}
      {dialogType === 'register' && <RegisterDialog />}
      {dialogType === 'name' && <NameDialog />}
      {(authLoading || dbLoading) && <NetworkLoading />}
    </NavigationContainer>
  );
};

export default AppRoutes;
