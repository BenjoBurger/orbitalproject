import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./login";
import Password from "./password";
import SignUp from "./signUp";
import Inputs from "./inputs";
import DishesApp from "./dishes";
import Reviews from "./reviews";

const Stack = createStackNavigator();

const linking = {
  prefixes: [
  ],
  config: {
  },
};

export default function AppLayout() {
  return (
    <NavigationContainer linking={linking} independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Password" component={Password} options={{headerShown: false}}/>
        <Stack.Screen name="Inputs" component={Inputs} options={{headerShown: false}}/>
        <Stack.Screen name="DishesApp" component={DishesApp} options={{headerShown: false}}/>
        <Stack.Screen name="Reviews" component={Reviews} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}