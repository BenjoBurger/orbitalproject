import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dishes from '../screens/dishes';
import Review from '../screens/review';

const Stack = createStackNavigator();

function MyStack() {
    console.log(2);
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Dishes" component = {Dishes}/>
            <Stack.Screen name = "Review" component = {Review}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyStack();