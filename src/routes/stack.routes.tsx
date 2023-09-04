import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Rendimentos from "../components/Rendimentos";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../components/Menu';
const Stack = createStackNavigator();


export default function StackRoutes() {

  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Rendimentos"
        component={Rendimentos}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>

  )
}

