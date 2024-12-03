import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Rendimentos from "../components/Rendimentos";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from '../components/Menu';
import Login from '../components/Login';
import Auxi from '../components/auxi';
const Stack = createStackNavigator();


export default function StackRoutes() {

  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Auxi}
        options={{ headerShown: false }}
      />



      {/* <Stack.Screen
        name="Rendimentos"
        component={Rendimentos}
        options={{ headerShown: false }}
      /> */}

    </Stack.Navigator>

  )
}

