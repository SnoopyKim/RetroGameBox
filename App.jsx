import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { AuthContextProvider } from './context/auth/auth-context';
import { DatabaseContextProvider } from './context/database/database-context';
import { DialogContextProvider } from './context/dialog/dialog-context';
import AppRoutes from './navigation/AppRoutes';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default () => {
  return (
    <AuthContextProvider>
      <DatabaseContextProvider>
        <DialogContextProvider>
          <App />
        </DialogContextProvider>
      </DatabaseContextProvider>
    </AuthContextProvider>
  );
};

function App() {
  const [fontLoaded] = useFonts({
    DGM: require('./assets/fonts/DungGeunMo.ttf'),
  });

  return !fontLoaded ? <AppLoading /> : <AppRoutes />;
}
