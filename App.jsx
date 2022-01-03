import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AppRoutes from './navigation/AppRoutes';

export default function App() {
  const [fontLoaded] = useFonts({
    DGM: require('./assets/fonts/DungGeunMo.ttf'),
  });
  return !fontLoaded ? <AppLoading /> : <AppRoutes />;
}
