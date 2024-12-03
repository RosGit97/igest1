
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Rendimentos from "./Rendimentos";
import Menu from "./Menu";
import Despesas from "./Despesas";
import Poupancas from "./Poupancas";
import Cadastro from "./Cadastro";
import Cadastro1 from "./Cadastro1";
import Login from "./Login";
import AddGasto from "./AddGasto";
import VGrafico from "./VGrafico";
import AddRendimentos from "./AddRendimentos";
import AddPoupanca from "./AddPoupanca";
import CadastroFamilia from "./CadastroFamilia";

export default function Auxi( ) {

    const Stack = createStackNavigator();

    return (
       
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Home"
                    component={Menu}
                    options={{ headerShown: false }}
                /> 
                <Stack.Screen
                    name="Rendimentos"
                    component={Rendimentos}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Despesas"
                    component={Despesas}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Poupancas"
                    component={Poupancas}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CadastroFamilia"
                    component={CadastroFamilia}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cadastro1"
                    component={Cadastro1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddGasto"
                    component={AddGasto}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VGrafico"
                    component={VGrafico}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddRendimentos"
                    component={AddRendimentos}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddPoupanca"
                    component={AddPoupanca}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        
    );
}

const styles = StyleSheet.create({

    containerHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        // backgroundColor: 'transparent',
        width: '100%',
        height: '100%',

    },
    text: {
        color: '#49688D',
        fontSize: 40,
    },

    textInput: {
        width: '80%',
        height: 50,

        borderBottomWidth: 0.5,
        borderBottomColor: '#C0C0C0',
    },
    button: {
        // marginTop: 20,
        width: '100%',
        height: 80,


        borderTopStartRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopEndRadius: 20,

        borderBottomWidth: 0.25,
        borderBottomColor: '#49688D',
        borderTopWidth: 0.25,
        borderTopColor: '#49688D',
        borderLeftWidth: 0.25,
        borderLeftColor: '#49688D',
        borderRightWidth: 0.25,
        borderRightColor: '#49688D',
    },
    viewButton: {
        width: '90%',
        maxHeight: 80,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontFamily: 'Frijole_400Regular',
        color: '#49688D',
        fontSize: 20,
        width: '70%',
        marginLeft: 15,
    }
});