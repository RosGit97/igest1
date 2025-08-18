
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { Fruktur_400Regular } from '@expo-google-fonts/fruktur';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "./types";
import { propsStack } from ".";
import Axios from "axios";
import { ProgressBar } from 'react-native-paper';


const Stack = createStackNavigator();
type AddPoupancasScreenRouteProp = RouteProp<RootStackParamList, 'Poupancas'>;
type AddPoupancasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Poupancas'>;
interface DadosBD {
    id: number;
    objectivo: string;
    valorActual: number;
    dataPoupanca: string;
    idUsuario: string;
    tempoPoupanca: string;
    valorMensal: string;
    valorPrevisto: number;
}
export default function Poupancas() {
    const navigation = useNavigation<AddPoupancasScreenNavigationProp>();
    const add = require("../../assets/icons/add.png");
    const fundo = require("../../assets/icons/fundo1.jpg");
    const [dadosBD, setDadosBD] = useState<DadosBD[]>([]);
    const route = useRoute<AddPoupancasScreenRouteProp>();
    const userName = route.params.userName;
    const id = route.params.id;
    const [fontLoaded] = useFonts({ Frijole_400Regular, Fruktur_400Regular });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DadosBD | null>(null);

    const [valorAdd, setValorAdd] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [mainModalVisible, setMainModalVisible] = useState(true);
    const [addValueModalVisible, setAddValueModalVisible] = useState(false);
    const [addedValue, setAddedValue] = useState('');
    const [idAux, setIdAux] = useState(0);

    const closeMainModal = () => setMainModalVisible(false);
    const openAddValueModal = () => setAddValueModalVisible(true);
    const closeAddValueModal = () => setAddValueModalVisible(false);

    const getBarColor = (percent: number): string => {
        if (percent < 33) return '#f44336';      // Vermelho (baixa)
        if (percent < 66) return '#FF9800';      // Laranja (média)
        return '#4CAF50';                        // Verde (alta)
    };

    const confirmAddValue = async () => {
        console.log('Valor adicionado:', addedValue);
        console.log('Valor adicionado1:', idAux);
        handleClickButton();
        setAddValueModalVisible(false);
        navigation.replace('Poupancas', { userName: userName, id: id });

    };

    const calcularPercentagem = (valorAtual: number, valorDesejado: number): number => {
        if (valorDesejado <= 0) return 0;
        const percent = (valorAtual / valorDesejado) * 100;
        return percent > 100 ? 100 : percent; // Limita a 100%
    };

    const handleClickButton = async () => {
        // Preparar os dados para envio
        const dados = {
            idPoupanca: idAux, // Usar o ID da poupança do item clicado
            valorAdd: addedValue, // Usar o novo valor do item clicado
        };

        try {
            // Enviar os dados para o backend
            const response = await Axios.post("http://192.168.100.11:3001/atualizarValorAtual", dados);

            // Verificar se a resposta foi bem-sucedida
            if (response.status === 200) {
                console.log("Valor atualizado com sucesso:", response.data);
                setSuccessMessage("Valor atualizado com sucesso!");
                alert("Valor atualizado com sucesso!");

                // 

                const dadosPS = {
                    // Seus dados para enviar no corpo da requisição POST
                    idActual: id,

                };
                Axios.post("http://192.168.100.11:3001/pegarSaldo", dadosPS)
                    .then(response => {
                        // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                        const responseData = response.data;
                        // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                        console.log('sucesso:', responseData[0].valor);

                        // chamada da funçao que actualiza o saldo
                        const dadosAS = {
                            // Seus dados para enviar no corpo da requisição POST
                            idActual: id,
                            novoValor: parseFloat(responseData[0].valor) -
                                parseFloat(addedValue.replace("R$", "").replace(/\./g, "").replace(",", ".")),
                        };
                        Axios.post("http://192.168.100.11:3001/atualizarSaldo", dadosAS)
                            .then(response => {
                                // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                                const responseData = response.data;
                                // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                                // console.log('sucesso:', responseData[0].valor);


                            }).catch(error => {
                                // Se houver algum erro na requisição, você pode tratá-lo aqui
                                console.error('Erro ao fazer requisição:', error);
                                setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
                            });
                        // chamada da funçao que actualiza o saldo
                    }).catch(error => {
                        // Se houver algum erro na requisição, você pode tratá-lo aqui
                        console.error('Erro ao fazer requisição:', error);
                        setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
                    });
                // adiçao de saldo

                // 


            } else {
                console.warn("Resposta do servidor não indica sucesso:", response);
                setSuccessMessage("Erro ao atualizar o valor. Por favor, tente novamente.");
            }
        } catch (error) {
            // Tratar erros da requisição
            console.error("Erro ao fazer requisição:", error);
            setSuccessMessage("Erro ao atualizar o valor. Por favor, tente novamente.");
            alert("Ocorreu um erro ao atualizar o valor2. Tente novamente mais tarde.");
        }
    };



    useEffect(() => {
        // Função para buscar os dados da API
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.100.11:3001/getPoupancas?valor=${id}`);
                const json = await response.json();
                setDadosBD(json);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);


    if (!fontLoaded) {
        return null;
    }

    // const [fontLoaded2] = useFonts({ Fruktur_400Regular });

    // if (!fontLoaded2) {
    //     return null;
    // }
    const closeModal = () => {
        setModalVisible(false); // Fecha o modal
        setSelectedItem(null); // Limpa o item selecionado
    };

    const handlePress = (item: DadosBD) => {
        // Aqui você pode adicionar a lógica para o que deve acontecer ao clicar no item
        console.log('Item pressionado:', item);
        setSelectedItem(item); // Define o item selecionado
        setModalVisible(true); // Exibe o modal
        // Chama a função handleClickButton passando o item como parâmetro
        // handleClickButton(item);

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
                <Text style={styles.textCabecalho}>Poupancas</Text>
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
                                <TouchableOpacity
                                    style={styles.viewValor}
                                    onPress={() => {
                                        handlePress(item);
                                        setIdAux(item.id);
                                    }}>
                                    <Text style={styles.textValor}>{item.objectivo}</Text>
                                    <Text style={styles.textValor}>{item.valorActual}</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                        ListEmptyComponent={
                            <Text style={[styles.textValor, styles.viewValor]}>Vazio</Text>
                        }
                    />

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
                                            <Text style={styles.valorFinalLabel}>UTILIZADOR: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.idUsuario}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>DATA: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.dataPoupanca}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>OBJECTIVO: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.objectivo}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>TEMPO: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.tempoPoupanca}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>VALOR ACTUAL: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.valorActual}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>VALOR MENSAL: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.valorMensal}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={styles.valorFinalLabel}>VALOR FINAL: </Text>
                                            <Text style={styles.valorFinalValue}>{selectedItem.valorPrevisto}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>

                                            <ProgressBar progress={calcularPercentagem(selectedItem.valorActual, selectedItem.valorPrevisto) / 100}
                                                color={getBarColor(calcularPercentagem(selectedItem.valorActual, selectedItem.valorPrevisto))}
                                                style={{ width: 100, height: 10, borderRadius: 5 }} />
                                            <Text style={{ textAlign: 'center', marginTop: 5 }}>{calcularPercentagem(selectedItem.valorActual, selectedItem.valorPrevisto).toFixed(2)}%</Text>
                                        </View>

                                    </>
                                )}
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity

                                        onPress={closeModal}
                                    >
                                        <ImageBackground
                                            source={require('../../assets/icons/close.png')} // Caminho da imagem
                                            resizeMode="cover"
                                            style={{ marginStart: 10, marginTop: 7, width: 50, height: 55, }}
                                        >

                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity

                                        onPress={openAddValueModal}
                                    >
                                        <ImageBackground
                                            source={require('../../assets/icons/addMoney2.png')} // Caminho da imagem
                                            resizeMode="cover"
                                            style={{ marginStart: 10, width: 45, height: 45 }}
                                        >

                                        </ImageBackground>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>

                    {/* Modal para adicionar valor */}
                    <Modal visible={addValueModalVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.addValueModal}>
                                <Text style={styles.modalTitle}>Adicionar Valor</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o valor"
                                    keyboardType="number-pad"
                                    value={addedValue}
                                    onChangeText={setAddedValue}
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        onPress={confirmAddValue}

                                        style={styles.okButton}>
                                        <Text style={styles.okButtonText}>OK</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={closeAddValueModal} style={styles.cancelButton}>
                                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{
                    height: 'auto',
                    width: 'auto',
                    alignSelf: 'flex-end',
                    marginEnd: 5,

                }}><TouchableOpacity

                    onPress={() => navigation.navigate('AddPoupanca', { userName: userName, id: id })}

                >
                        <ImageBackground source={add} resizeMode='cover' style={{ width: 60, height: 60 }} />

                    </TouchableOpacity>


                </View>
            </View>

        </View >
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

    // teste

    // modalContainer: {
    //     flex: 1,
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // modalContent: {
    //     width: '80%',
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     padding: 20,
    //     alignItems: 'center',
    // },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginStart: 10,
        width: 45,
        height: 45,
    },
    addValueModal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    // modalTitle: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 15,
    // },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    okButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginEnd: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginStart: 5,
        alignItems: 'center',
    },
    okButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});