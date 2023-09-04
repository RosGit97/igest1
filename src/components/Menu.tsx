
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { createStackNavigator } from '@react-navigation/stack';
import Rendimentos from "./Rendimentos";
import { Entypo } from '@expo/vector-icons';
import TabRoutes from "../routes/tab.routes";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from ".";
const Stack = createStackNavigator();


export default function Menu() {
    const navigation = useNavigation<propsStack>();
    const rendimentos = require("../../assets/icons/rendimentos.png");
    const despesas = require("../../assets/icons/despesas.png");
    const poupancas = require("../../assets/icons/poupancas.png");
    const [fontLoaded] = useFonts({ Frijole_400Regular });
    const fundo = require("../../assets/icons/fundo1.jpg");

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={{ height: '100%' }}>

            <TouchableOpacity
                style={{ 
                    position: 'absolute',
                    marginTop: 10,
                    marginLeft: 10,
                    maxHeight: 20, 
                    width: 50, 
                    flex: 1, 
                    flexDirection: 'row', 
                    backgroundColor: 'blue', 
                    alignItems: 'center',
                justifyContent: 'center', }}
                onPress={() => navigation.goBack()}
                
            ><Entypo name="back" /><Text>back</Text></TouchableOpacity>
            <View style={styles.containerHeader}>
                <ImageBackground source={fundo} resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0.2,
                        position: 'absolute',
                    }} />

                <View style={styles.viewButton}>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f7faff',
                        opacity: 0.7,
                    }}>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', }}>
                        <ImageBackground source={rendimentos} resizeMode='cover' style={{ marginStart: 10, width: 50, height: 50, }} />

                        <Text style={styles.textButton}>MEUS RENDIMENTOS</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Rendimentos')}

                    >
                    </TouchableOpacity>
                </View>

                <View style={styles.viewButton}>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f7faff',
                        opacity: 0.7,
                    }}>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', }}>
                        <ImageBackground source={despesas} resizeMode='cover' style={{ marginStart: 10, width: 50, height: 50, }} />

                        <Text style={styles.textButton}>MINHAS DESPESAS</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Despesas')}

                    >
                    </TouchableOpacity>
                </View>

                <View style={styles.viewButton}>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f7faff',
                        opacity: 0.7,
                    }}>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', }}>
                        <ImageBackground source={poupancas} resizeMode='cover' style={{ marginStart: 10, width: 50, height: 50, }} />

                        <Text style={styles.textButton}>MINHAS POUPANÇAS</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Poupancas')}

                    >
                    </TouchableOpacity>
                </View>



                {/* <Stack.Navigator initialRouteName="rendimentos">

            <Stack.Screen
                 name="rendimentos"
                 component={TabRoutes}
             // options={{ headerShown: false }}
             />
         </Stack.Navigator> */}

            </View>
        </View>
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