
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { Fruktur_400Regular } from '@expo-google-fonts/fruktur';


export default function Rendimentos() {

    const add = require("../../assets/icons/add.png");
    const fundo = require("../../assets/icons/fundo1.jpg");

    const [fontLoaded] = useFonts({ Frijole_400Regular, Fruktur_400Regular });

    if (!fontLoaded) {
        return null;
    }

    // const [fontLoaded2] = useFonts({ Fruktur_400Regular });

    // if (!fontLoaded2) {
    //     return null;
    // }


    return (
        <View style={styles.container}>
            <ImageBackground source={fundo} resizeMode='cover'
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0.2,
                    position: 'absolute',
                }} />
            <View style={styles.viewGlobal}>
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
                <Text style={styles.textCabecalho}>Salário</Text>
                <View style={{
                    flex: 1,
                    marginTop: 5,
                    width: '100%',
                    maxHeight: '80%',
                    minHeight: '80%',


                }}>
                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>

                    <View style={styles.viewValor}>
                        <Text style={styles.textValor}>500.000,00 AKZ</Text>
                        <Text style={styles.textValor}>dd/mm/AAAA</Text>
                    </View>


                </View>
                <View style={{
                    flex: 1,

                    height: '20%',
                    width: '100%',
                    alignItems: 'flex-end',

                }}>
                    <ImageBackground source={add} resizeMode='cover' style={{ width: 60, height: 60 }} />

                </View>
            </View>
            

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        // backgroundColor: 'transparent',
        width: '100%',
        height: '100%',

    },

    viewGlobal: {
        width: '90%',
        minHeight: '74%',
        maxHeight: '90%',
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#f7faff',
        // opacity: 0.7,
        borderTopStartRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopEndRadius: 20,

        borderBottomWidth: 1,
        borderBottomColor: '#49688D',
        borderTopWidth: 1,
        borderTopColor: '#49688D',
        borderLeftWidth: 1,
        borderLeftColor: '#49688D',
        borderRightWidth: 1,
        borderRightColor: '#49688D',
    },
    textCabecalho: {
        fontFamily: 'Frijole_400Regular',
        textDecorationLine: 'underline',
        color: '#49688D',
        marginTop: 10,
        fontSize: 20,
        // width: '50%',
        alignItems: 'center',
        verticalAlign: 'top'
    },
    viewValor: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        maxHeight: 40,
        minHeight: 40,
        marginHorizontal: '5%',

        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,

    },
    textValor: {
        fontFamily: 'Fruktur_400Regular',

        fontSize: 20,
    },
});