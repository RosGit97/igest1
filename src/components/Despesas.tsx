
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, ImageBackground, Button, FlatList } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { Fruktur_400Regular } from '@expo-google-fonts/fruktur';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "./types";
import { propsStack } from ".";
import PieChart from 'react-native-pie-chart';
import Axios from "axios";
const Stack = createStackNavigator();
type DespesasScreenRouteProp = RouteProp<RootStackParamList, 'Despesas'>;
type DespesasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Despesas'>;
interface DadosBD {
    id: number;
    idUsuario: string;
    produto: string;
    valor: string;
    categoria: string,
    data: string,

}

export default function Despesas() {
    const navigation = useNavigation<DespesasScreenNavigationProp>();
    const add = require("../../assets/icons/add.png");
    const fundo = require("../../assets/icons/fundo1.jpg");
    const closeButton = require("../../assets/icons/close.png");
    const [dados, setDados] = useState("");
    const [dadosBD, setDadosBD] = useState<DadosBD[]>([]);
    const route = useRoute<DespesasScreenRouteProp>();
    const userName = route.params.userName;
    const id = route.params.id;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DadosBD | null>(null);

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.56.1:3001/getGastos?valor=${id}`);
                const json = await response.json();
                setDadosBD(json);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);


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

        Axios.get("http://192.168.56.1:3001/getGastos")
            .then((res) => {
                // console.log(res.data);
                setDados(res.data)
                console.log(dados)
            });

    };
    const closeModal = () => {
        setModalVisible(false); // Fecha o modal
        setSelectedItem(null); // Limpa o item selecionado
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
    const handlePress = (item: DadosBD) => {

        // Aqui você pode adicionar a lógica para o que deve acontecer ao clicar no item^
        console.log('Item pressionado:', item);
        setSelectedItem(item); // Define o item selecionado
        setModalVisible(true); // Exibe o modal
    };

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

                    <FlatList
                        data={dadosBD}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (

                            <View style={styles.viewValor}>
                                <TouchableOpacity style={styles.viewValor} onPress={() => handlePress(item)}>
                                    <Text style={styles.textValor}>{item.produto}</Text>
                                    <Text style={styles.textValor}>{item.valor}</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                        ListEmptyComponent={
                            <Text style={[styles.textValor, styles.viewValor]}>Vazio</Text>
                        }
                    />

                    {/* Modal */}
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {selectedItem && (
                                    <>

                                        <Text style={styles.modalTitle}>Detalhes</Text>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>PRODUTO:</Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.produto}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>VALOR:</Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.valor}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>CATEGORIA:</Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.categoria}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>NOME:</Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.idUsuario}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>DATA:</Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.data}</Text>
                                        </View>
                                    </>
                                )}
                                <TouchableOpacity

                                    onPress={closeModal}
                                >
                                    <ImageBackground
                                        source={require('../../assets/icons/close.png')} // Caminho da imagem
                                        resizeMode="cover"
                                        style={{ marginStart: 10, width: 50, height: 50, }}
                                    >
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>
                <View style={styles.addView}>
                    <TouchableOpacity

                        onPress={() => navigation.navigate('AddGasto', { userName: userName, id: id })}

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
    addView: {

        height: 'auto',
        width: 'auto',
        alignSelf: 'flex-end',
        marginEnd: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",

    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: '#49688D',
        borderWidth: 2,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    valorFinalLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333", // Cor do texto para "Valor Final"
        marginRight: 8, // Espaçamento entre os textos
    },
    valorFinalValue: {
        fontSize: 18,
        fontWeight: "600",
        color: "#007BFF", // Cor do texto para o valor
    },
});