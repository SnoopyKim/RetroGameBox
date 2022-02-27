import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import GameMy from "../screens/myGame";
import JumpGameScreen from "../games/JumpGame";
import NPCGameScreen from "../games/NPCGame";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name="GameMy" component={GameMy} />
      <Stack.Screen name="JumpGame" component={JumpGameScreen} />
      <Stack.Screen name="NPCGame" component={NPCGameScreen} />
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
