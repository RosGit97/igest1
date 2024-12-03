
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions, Modal, Button, FlatList } from 'react-native';
import { useFonts, Frijole_400Regular } from '@expo-google-fonts/frijole';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Rendimentos from "./Rendimentos";
import { Entypo } from '@expo/vector-icons';
import TabRoutes from "../routes/tab.routes";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { propsStack } from ".";
import Axios from "axios";

const Stack = createStackNavigator();
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
interface saldoData {
    id: number;
    idUser: number;
    valor: string;
}


export default function Menu() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const rendimentos = require("../../assets/icons/rendimentos.png");
    const despesas = require("../../assets/icons/despesas.png");
    const poupancas = require("../../assets/icons/poupancas.png");
    const [fontLoaded] = useFonts({ Frijole_400Regular });
    const fundo = require("../../assets/icons/fundo1.jpg");
    const user = require("../../assets/icons/User.png")
    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    const [nomeFamilia, setNomeFamilia] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [saldo, setSaldo] = useState("");
    const route = useRoute<HomeScreenRouteProp>();
    const userName = route.params.userName;
    const id = route.params.id;
    const idFamilia = route.params.idFamilia;
    const [idActual, setIdActual] = useState(id);
    const [selectedValue, setSelectedValue] = useState<string>(userName);
    const [userActual, setuserActual] = useState<string>(userName);
    // if (!fontLoaded) {
    //     return null;
    // }


    const handleClickButtonModalConfirm = () => {
        setModalVisible(false);
        if (selectedValue == userName) {
            alert('você mudou para o perfil pessoal ');
            setIdActual(id);
            
        } else {
            alert('você mudou para o perfil de familia ');
            setIdActual(idFamilia);
        }
        pegarSaldo
        setuserActual(selectedValue)

    };

    const handleClickButton = () => {
        setModalVisible(true);
        const dados = {
            // Seus dados para enviar no corpo da requisição POST
            idFamilia: idFamilia,


        };

        Axios.post("http://192.168.100.9:3001/procuraNomeFamilia", dados)
            .then(response => {
                const responseData = response.data;
                // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                console.log('Dados enviados com sucesso:', response.data);
                setNomeFamilia(responseData[0].nomeFamilia);
                // alert('você mudou para o perfil de familia ');
            }).catch(error => {
                // Se houver algum erro na requisição, você pode tratá-lo aqui
                console.error('Erro ao fazer requisição:', error);
                // setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
                alert('Erro ao inserir dados. Por favor, tente novamente.')
            });

    };

    // useEffect(() => {
    //     // Função para buscar os dados da API 
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://192.168.100.9:3001/pegarSaldo');
    //             const json = await response.json();
    //             setSaldo(json);
    //             console.error('Erro ao buscar dados:hbh');
    //         } catch (error) {
    //             console.error('Erro ao buscar dados:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const pegarSaldo = () => {

        const dados = {
            // Seus dados para enviar no corpo da requisição POST
            idActual: idActual,

        };

        Axios.post("http://192.168.100.9:3001/pegarSaldo", dados)
            .then(response => {
                const responseData = response.data;
                // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                console.log('sucesso:', responseData[0].valor);
                setSaldo(responseData[0].valor);
                // setNomeFamilia(responseData[0].nomeFamilia);
                // alert('você mudou para o perfil de familia ');
            }).catch(error => {
                // Se houver algum erro na requisição, você pode tratá-lo aqui
                console.error('Erro ao fazer requisição:', error);
                // setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
                alert('Erro ao inserir dados1. Por favor, tente novamente.')
            });

    };

    const myFunction = () => {
        console.log('Função chamada com saldo:');
    };


    // Use useEffect para chamar pegarSaldo quando idActual mudar
    useEffect(() => {
        if (idActual) {
            pegarSaldo();
        }
    }, [idActual]);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={{ height: '100%' }}>

            {/* <TouchableOpacity
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
                
            ><Entypo name="back" /><Text>back</Text></TouchableOpacity> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Selecione um usuário</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label={`${userName}`} value={userName} />
                            <Picker.Item label={`${nomeFamilia}`} value={nomeFamilia} />

                        </Picker>

                        <TouchableOpacity style={[styles.buttonModal, { backgroundColor: '#90EE90' }]} onPress={handleClickButtonModalConfirm}>
                            <Text style={styles.textButtonModal}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonModal, { backgroundColor: '#ff7b5a' }]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.textButtonModal} >Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.containerHeader}>
                <ImageBackground source={fundo} resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0.2,
                        position: 'absolute',
                    }} />
                <View style={[styles.containerPessoal, { height: height * 0.1 }]}>
                    <View>
                        <Text style={[styles.textContPess, { fontSize: 16, }]}>Seu Saldo :</Text>

                        <Text style={[styles.textContPess, { fontSize: 22, color: '#00FF00' }]}>
                            ${saldo}</Text>


                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity

                            onPress={() =>
                                handleClickButton()

                            }

                        >
                            <ImageBackground source={user} resizeMode='cover' style={{ width: 30, height: 30 }} />
                            <Text style={{ fontSize: 12, color: '#fff' }}>{userActual}</Text>
                        </TouchableOpacity>

                    </View>
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
                        <ImageBackground source={rendimentos} resizeMode='cover' style={{ marginStart: 10, width: 50, height: 50, }} />

                        <Text style={styles.textButton}>MEUS RENDIMENTOS</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Rendimentos', { userName: userName, id: id })}

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
                        onPress={() => navigation.navigate('Despesas', { userName: userName, id: id })}

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
                        onPress={() => navigation.navigate('Poupancas', { userName: userName, id: id })}

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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textContPess: {
        marginLeft: '10%',
        color: '#fff',
    },
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
    },
    containerPessoal: {
        backgroundColor: '#49688D',
        width: '80%',
        borderTopStartRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomWidth: 4,
        borderBottomColor: 'black',
        borderTopWidth: 1,
        borderTopColor: 'black',
        borderLeftWidth: 1,
        borderLeftColor: 'black',
        borderRightWidth: 1,
        borderRightColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonModal: {
        // marginTop: 20,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
    textButtonModal: {
        fontFamily: 'Frijole_400Regular',
        padding: 4,
        color: '#49688D',
        fontSize: 20,
        width: '70%',

    },

});