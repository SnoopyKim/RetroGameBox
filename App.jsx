import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { AuthContextProvider } from './context/auth/auth-context';
import { DatabaseContextProvider } from './context/database/database-context';
import AppRoutes from './navigation/AppRoutes';

export default () => {
  return (
    <AuthContextProvider>
      <DatabaseContextProvider>
        <App />
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
