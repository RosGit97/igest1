
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { Fruktur_400Regular } from '@expo-google-fonts/fruktur';
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { propsStack } from ".";
import PieChart from 'react-native-pie-chart';
import Axios from "axios";
const Stack = createStackNavigator();
export default function Despesas() {
    const navigation = useNavigation<propsStack>();
    const add = require("../../assets/icons/add.png");
    const fundo = require("../../assets/icons/fundo1.jpg");
    const [dados, setDados] = useState("");

    const [fontLoaded] = useFonts({ Frijole_400Regular, Fruktur_400Regular });
    // const handleClickButton = () => {

    //     Axios.get("http://192.168.100.10:3001/verGastos")
    //         .then((res) => {
    //             console.log(res.data);
    //             setDados(res.data)
    //             const pieData = res.data.map((value,index) =>({
    //                 value,
    //                 key: `${index}`
    //             }))
    //         });

    // };
    const handleClickButton = () => {

            Axios.get("http://192.168.100.10:3001/getGastos")
                .then((res) => {
                    // console.log(res.data);
                    setDados(res.data)
                    console.log(dados)
                });
    
        };
        
    // function double() {
    //     handleClickButton();
        
    //   }
    if (!fontLoaded) {
        return null;
    }

    // const [listGastos, setListGastos]=useState()


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
                <Text style={styles.textCabecalho}>Despesas</Text>
                <View style={{
                    flex: 1,
                    marginTop: 5,
                    width: '100%',
                    maxHeight: '80%',
                    minHeight: '80%',


                }}>
                    {/* <View style={styles.viewValor}>
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
                    </View> */}
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={double}

                    >
                        <Text>ver grafico</Text>
                        {/* <ImageBackground  resizeMode='cover' style={{ width: 60, height: 60 }} /> */}

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleClickButton}

                    >
                        <Text>historico</Text>
                        {/* <ImageBackground  resizeMode='cover' style={{ width: 60, height: 60 }} /> */}

                    </TouchableOpacity>

                </View>
                <View style={{
                    flex: 1,

                    height: '20%',
                    width: '100%',
                    alignItems: 'flex-end',

                }}><TouchableOpacity

                    onPress={() => navigation.navigate('AddGasto')}

                >
                        <ImageBackground source={add} resizeMode='cover' style={{ width: 60, height: 60 }} />

                    </TouchableOpacity>


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
    button: {
        marginTop: 20,
        width: 150,
        height: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius: 30,
        borderBottomEndRadius: 30,
        borderBottomWidth: 0.25,
        borderBottomColor: '#DCDCDC',
        // borderTopWidth: 0.25,
        // borderTopColor: '#DCDCDC',
        borderLeftWidth: 0.25,
        borderLeftColor: '#DCDCDC',
        borderRightWidth: 0.25,
        borderRightColor: '#DCDCDC',
      },
});