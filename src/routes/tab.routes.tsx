import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Header from "../components/Header";
import Login from "../components/Login";
import Menu from "../components/Menu";
import Auxi from "../components/auxi";
import Rendimentos from "../components/Rendimentos";
import Footer from "../components/Footer";
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import StackRoutes from "./stack.routes";
import Routes from ".";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    const [fontLoaded] = useFonts({ Frijole_400Regular });
    const navigation = useNavigation();

    if (!fontLoaded) {
        return null;
    }
    const fundo = require("../../assets/icons/home.png");
    const home = require("../../assets/icons/home.png");
    const undo = require("../../assets/icons/undo.png");
    const user = require("../../assets/icons/User.png");
    return (


        <Tab.Navigator
            initialRouteName="Login"
            screenOptions={({ route }) => ({
                headerTitle: () => {

                    return <Text style={{
                        fontFamily: 'Frijole_400Regular',
                        color: '#fff',
                        fontSize: 40,
                    }}>IGEST</Text>;
                },

                headerBackground: () => {

                    return <View style={{
                        backgroundColor: '#49688D',
                        width: '100%',
                        height: '100%',
                        borderBottomStartRadius: 15,
                        borderBottomEndRadius: 15,
                    }}></View>;
                },

                tabBarBackground: () => {

                    return <View style={{
                        backgroundColor: '#49688D',
                        width: '100%',
                        height: '100%',
                        borderTopStartRadius: 15,
                        borderTopEndRadius: 15,
                    }}></View>
                }

                
            })}
        >


            {/* <Tab.Screen
                name="Back"
                component={Auxi}
                options={{
                    tabBarActiveTintColor: '#fff',
                    tabBarIcon: ({ color, size }) => <TouchableOpacity onPress={() => navigation.goBack()}
                    ><Entypo name="back" color={color} size={size} /></TouchableOpacity>
                }}
            /> */}
            
            <Tab.Screen
                name="login"
                component={Auxi}
                options={{
                    tabBarActiveTintColor: '#C0C0C0',
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle-o" color={color} size={size} />
                }}

            /><Tab.Screen
            name="Home"
            component={Menu}
        
            options={{
                tabBarActiveTintColor: '#C0C0C0',
                tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />
            }}
        />
            {/* <Tab.Screen
                name="rendimentos"
                
                component={StackRoutes}
            options={{
                tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle-o" color={color} size={size} />
            }}

            /> */}

        </Tab.Navigator>


    )
}

