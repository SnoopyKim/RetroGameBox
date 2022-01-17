import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import GameScreen from "../screens/Game";
import Game1Screen from "../screens/Game1";
import GameExScreen from "../screens/GameEx";
import GameEx2Screen from "../screens/GameEx2";
import GameMy from "../screens/myGame";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Game1"
        component={Game1Screen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="GameEx"
        component={GameExScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="GameEx2"
        component={GameEx2Screen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="GameMy"
        component={GameMy}
        options={{ header: () => null }}
      />
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
