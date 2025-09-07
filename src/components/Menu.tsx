
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
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import Foundation from 'react-native-vector-icons/Foundation';

const Stack = createStackNavigator();
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
interface saldoData {
    id: number;
    idUser: number;
    valor: string;
}
interface DadosBD {
    id: number;
    idUsuario: string;
    produto: string;
    valor: string;
    categoria: string,
    data: string,

}
interface DadosBDR {
    id: number;
    fonte_rendimento: string;
    valor: string;
    data: string;
    idUsuario: string;
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

    const [open1, setOpen1] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    // if (!fontLoaded) {
    //     return null;
    // }

    // Exemplo de notificações (pode vir do banco de dados depois)
    const [notificacoes, setNotificacoes] = useState<string[]>([]); // lista de notificações


    // buscar a percentagem gasta do rendimento mensal

    const [dadosBD, setDadosBD] = useState<DadosBD[]>([]);
    const [dadosBDR, setDadosBDR] = useState<DadosBDR[]>([]);
    const [totalGasto, setTotalGasto] = useState<number>(0);
    const [totalRendimento, setTotalRendimento] = useState<number>(0);


    const checkPercent = async () => {
        try {

            // if (totalRendimento) {
            const percent = ((totalGasto / totalRendimento) * 100).toFixed(2);
            if (parseFloat(percent) >= 80) {
                adicionarNotificacao("⚠️ Atenção: você já gastou " + percent + "% do seu rendimento!");
                console.log("teste" + percent)
            }
            console.log("teste" + percent)

            // }


        } catch (error) {
            console.error("Erro ao calcular percentagem:", error);
        }
    };

    useEffect(() => {
        // const checkPercent = async () => {
        //     try {
        //         const percent = ((totalGasto / totalRendimento) * 100).toFixed(2);

        //         if (parseFloat(percent) >= 80) {
        //             adicionarNotificacao("⚠️ Atenção: você já gastou " + percent + "% do seu rendimento!");
        //         }
        //     } catch (error) {
        //         console.error("Erro ao calcular percentagem:", error);
        //     }
        // };

        // checkPercent();

    }, [totalGasto, totalRendimento]); // dispara sempre que estes valores mudarem


    // const checkDiaSalario = async () => {
    //     try {
    //         const agora = new Date();
    //         const diaAtual = agora.getDate();
    //         const mesAtual = agora.getMonth() + 1; // Janeiro = 0
    //         const anoAtual = agora.getFullYear();

    //         // Verifica se existe algum registo neste mês até ao dia atual
    //         const existeRegistro = dadosBDR.some((item) => {
    //             const [diaStr, mesStr, anoStr] = item.data.split("/");
    //             const dia = parseInt(diaStr, 10);
    //             const mes = parseInt(mesStr, 10);
    //             const ano = parseInt(anoStr, 10);

    //             return (
    //                 ano === anoAtual &&
    //                 mes === mesAtual &&
    //                 dia <= diaAtual
    //             );
    //         });

    //         if (existeRegistro === false) {
    //             adicionarNotificacao("⚠️ Atenção: Você ainda não registou nenhum rendimento este mês!");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao verificar rendimento:", error);
    //     }
    // };

    //     checkPercent();
    //     checkDiaSalario();
    // }, [totalGasto, totalRendimento]); // dispara sempre que estes valores mudarem


    // F buscar a percentagem gasta do rendimento mensal

    const handleClickButtonModalConfirm = () => {
        setModalVisible(false);

        if (selectedValue == userName) {
            alert('você mudou para o perfil pessoal ');
            setIdActual(id);
            // navigation.replace('Poupancas', { userName: userName, id: id });

        } else {
            alert('você mudou para o perfil de familia ');
            setIdActual(idFamilia);

        }
        // navigation.replace('Home', { 
        //         userName: userName, 
        //         id: idActual, 
        //         idFamilia: idFamilia})
        // pegarSaldo
        // fetchData();
        // fetchData1();
        // checkPercent();
        setuserActual(selectedValue);


    };

    const handleClickButton = () => {
        setModalVisible(true);
        const dados = {
            // Seus dados para enviar no corpo da requisição POST
            idFamilia: idFamilia,


        };

        Axios.post("http://192.168.56.1:3001/procuraNomeFamilia", dados)
            .then(response => {
                const responseData = response.data;
                // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                // console.log('Dados enviados com sucesso:', response.data);
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
    //             const response = await fetch('http://192.168.56.1:3001/pegarSaldo');
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

        Axios.post("http://192.168.56.1:3001/pegarSaldo", dados)
            .then(response => {
                const responseData = response.data;
                // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
                // console.log('sucesso:', responseData[0].valor);
                // console.log('sucesso id:', idActual);
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


    // testando
    const fetchData = async () => {
        try {
            const response = await fetch(`http://192.168.56.1:3001/getGastos?valor=${idActual}`);
            const json = await response.json();
            setDadosBD(json);

            // Data atual
            const agora = new Date();
            const mesAtual = agora.getMonth();   // 0 = Janeiro
            const anoAtual = agora.getFullYear();

            // Filtro para gastos do mês atual
            const gastosUltimoMes = json.filter((item: DadosBD) => {
                const [dia, mes, ano] = item.data.split("/"); // formato DD/MM/YYYY
                const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia));

                return (
                    dataItem.getMonth() === mesAtual &&
                    dataItem.getFullYear() === anoAtual
                );
            });

            // Soma dos valores
            const soma = gastosUltimoMes.reduce((acc: number, item: DadosBD) => {
                return acc + (Number(item.valor) || 0);
            }, 0);

            setTotalGasto(soma);

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };


    const fetchData1 = async () => {
        try {
            const response = await fetch(`http://192.168.56.1:3001/getRendimentos?valor=${idActual}`);
            const json1 = await response.json();
            setDadosBDR(json1);




            // Data atual
            const agora = new Date();
            const mesAtual = agora.getMonth();   // 0 = Janeiro
            const anoAtual = agora.getFullYear();

            // Filtro para gastos do mês atual
            const rendimentosUltimoMes = json1.filter((item: DadosBDR) => {
                const [dia, mes, ano] = item.data.split("/"); // formato DD/MM/YYYY
                const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia));

                return (
                    dataItem.getMonth() === mesAtual &&
                    dataItem.getFullYear() === anoAtual
                );
            });

            // Soma dos valores
            const soma = rendimentosUltimoMes.reduce((acc: number, item: DadosBDR) => {
                return acc + (Number(item.valor) || 0);
            }, 0);


            // 
            // const agora = new Date();
            const diaAtual = agora.getDate();
            // const mesAtual = agora.getMonth() + 1; // Janeiro = 0
            // const anoAtual = agora.getFullYear();

            // Verifica se existe algum registo neste mês até ao dia atual

            // const existeRegistro = dadosBDR.some((item) => {
            //     const [diaStr, mesStr, anoStr] = item.data.split("/");
            //     const dia = parseInt(diaStr, 10);
            //     const mes = parseInt(mesStr, 10);
            //     const ano = parseInt(anoStr, 10);

            //     return (
            //         ano === anoAtual &&
            //         mes === mesAtual &&
            //         dia <= diaAtual &&
            //         dia > 0
            //     );
            // });

            const existeRegistro = json1.some((item: DadosBDR) => {
                const [diaStr, mesStr, anoStr] = item.data.split("/");
                const dia = parseInt(diaStr, 10);
                const mes = parseInt(mesStr, 10);
                const ano = parseInt(anoStr, 10);
                // console.log(diaAtual + "/" + mesAtual+ "/"+anoAtual);
                return (
                    ano === anoAtual &&
                    mes === mesAtual + 1 &&
                    dia <= diaAtual
                );
            });


            // console.log(existeRegistro);
            if (existeRegistro === false) {
                adicionarNotificacao("⚠️ Atenção: Você ainda não registou nenhum rendimento este mês!");
            }
            // 

            // const checkDiaSalario = async () => {
            //     try {

            //     } catch (error) {
            //         console.error("Erro ao verificar rendimento:", error);
            //     }
            // };
            // checkDiaSalario();

            setTotalRendimento(soma);


        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };
    // 

    const myFunction = () => {
        console.log('Função chamada com saldo:');
    };


    // Use useEffect para chamar pegarSaldo quando idActual mudar
    // useEffect(() => {
    //     if (idActual) {

    //         pegarSaldo();
    //         console.log('sucesso id use:', idActual);
    //     }
    // }, [idActual]);

    // if (!fontLoaded) {
    //     return null;
    // }

    // 

    useFocusEffect(
        useCallback(() => {
            // Função que recarrega o saldo
            // if (idActual) {

            //     pegarSaldo();
            //     // cconsole.log('sucesso id use:', idActual);
            // }

            // const fetchData = async () => {
            //     try {
            //         const response = await fetch(`http://192.168.56.1:3001/getGastos?valor=${id}`);
            //         const json = await response.json();
            //         setDadosBD(json);

            //         // Data atual
            //         const agora = new Date();
            //         const mesAtual = agora.getMonth();   // 0 = Janeiro
            //         const anoAtual = agora.getFullYear();

            //         // Filtro para gastos do mês atual
            //         const gastosUltimoMes = json.filter((item: DadosBD) => {
            //             const [dia, mes, ano] = item.data.split("/"); // formato DD/MM/YYYY
            //             const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia));

            //             return (
            //                 dataItem.getMonth() === mesAtual &&
            //                 dataItem.getFullYear() === anoAtual
            //             );
            //         });

            //         // Soma dos valores
            //         const soma = gastosUltimoMes.reduce((acc: number, item: DadosBD) => {
            //             return acc + (Number(item.valor) || 0);
            //         }, 0);

            //         setTotalGasto(soma);

            //     } catch (error) {
            //         console.error("Erro ao buscar dados:", error);
            //     }
            // };

            // fetchData();

            // Função para buscar os dados da API

            // const fetchData1 = async () => {
            //     try {
            //         const response = await fetch(`http://192.168.56.1:3001/getRendimentos?valor=${id}`);
            //         const json1 = await response.json();
            //         setDadosBDR(json1);




            //         // Data atual
            //         const agora = new Date();
            //         const mesAtual = agora.getMonth();   // 0 = Janeiro
            //         const anoAtual = agora.getFullYear();

            //         // Filtro para gastos do mês atual
            //         const gastosUltimoMes = json1.filter((item: DadosBDR) => {
            //             const [dia, mes, ano] = item.data.split("/"); // formato DD/MM/YYYY
            //             const dataItem = new Date(Number(ano), Number(mes) - 1, Number(dia));

            //             return (
            //                 dataItem.getMonth() === mesAtual &&
            //                 dataItem.getFullYear() === anoAtual
            //             );
            //         });

            //         // Soma dos valores
            //         const soma = gastosUltimoMes.reduce((acc: number, item: DadosBDR) => {
            //             return acc + (Number(item.valor) || 0);
            //         }, 0);


            //         // 
            //         // const agora = new Date();
            //         const diaAtual = agora.getDate();
            //         // const mesAtual = agora.getMonth() + 1; // Janeiro = 0
            //         // const anoAtual = agora.getFullYear();

            //         // Verifica se existe algum registo neste mês até ao dia atual

            //         // const existeRegistro = dadosBDR.some((item) => {
            //         //     const [diaStr, mesStr, anoStr] = item.data.split("/");
            //         //     const dia = parseInt(diaStr, 10);
            //         //     const mes = parseInt(mesStr, 10);
            //         //     const ano = parseInt(anoStr, 10);

            //         //     return (
            //         //         ano === anoAtual &&
            //         //         mes === mesAtual &&
            //         //         dia <= diaAtual &&
            //         //         dia > 0
            //         //     );
            //         // });

            //         const existeRegistro = json1.some((item: DadosBDR) => {
            //             const [diaStr, mesStr, anoStr] = item.data.split("/");
            //             const dia = parseInt(diaStr, 10);
            //             const mes = parseInt(mesStr, 10);
            //             const ano = parseInt(anoStr, 10);
            //             // console.log(diaAtual + "/" + mesAtual+ "/"+anoAtual);
            //             return (
            //                 ano === anoAtual &&
            //                 mes === mesAtual + 1 &&
            //                 dia <= diaAtual
            //             );
            //         });


            //         // console.log(existeRegistro);
            //         if (existeRegistro === false) {
            //             adicionarNotificacao("⚠️ Atenção: Você ainda não registou nenhum rendimento este mês!");
            //         }
            //         // 

            //         // const checkDiaSalario = async () => {
            //         //     try {

            //         //     } catch (error) {
            //         //         console.error("Erro ao verificar rendimento:", error);
            //         //     }
            //         // };
            //         // checkDiaSalario();

            //         setTotalRendimento(soma);

            //     } catch (error) {
            //         console.error('Erro ao buscar dados:', error);
            //     }
            // };

            // fetchData1();
            // alert("renda total = " + totalRendimento + " id =" + idActual);
            // console.log("entrou");
            // checkPercent();

        }, [idActual])
    );
    // funcões chamadas logo que a pagina é carregada (open)
    useEffect(() => {

        // funcões chamadas logo que a pagina é carregada
        // alert("Carregou ");

        // função que busca o saldo do utilizador 
        if (idActual) {

            pegarSaldo();
            // cconsole.log('sucesso id use:', idActual);
        }

        fetchData();

        fetchData1();



        // 

        // Função para buscar os dados da API
        // console.log("entrou");
        // const checkDiaSalario = async () => {
        //     try {
        //         const agora = new Date();
        //         const diaAtual = agora.getDate();
        //         const mesAtual = agora.getMonth() + 1; // Janeiro = 0
        //         const anoAtual = agora.getFullYear();

        //         // Verifica se existe algum registo neste mês até ao dia atual
        //         const existeRegistro = dadosBDR.some((item) => {
        //             const [diaStr, mesStr, anoStr] = item.data.split("/");
        //             const dia = parseInt(diaStr, 10);
        //             const mes = parseInt(mesStr, 10);
        //             const ano = parseInt(anoStr, 10);

        //             return (
        //                 ano === anoAtual &&
        //                 mes === mesAtual &&
        //                 dia <= diaAtual &&
        //                 dia > 0
        //             );
        //         });
        //         console.log(existeRegistro);
        //         if (existeRegistro === false) {
        //             adicionarNotificacao("⚠️ Atenção: Você ainda não registou nenhum rendimento este mês!");
        //         }
        //     } catch (error) {
        //         console.error("Erro ao verificar rendimento:", error);
        //     }
        // };
        // checkDiaSalario();
    }, []);
    // funcões chamadas logo que a pagina é carregada (close)


    useEffect(() => {
        // Função para buscar os dados da API 
        if (totalRendimento && totalGasto) {
            console.log("renda total = " + totalRendimento + " id =" + idActual);
            checkPercent();
        }
    }, [totalRendimento, totalGasto]);

    useEffect(() => {
        // Função para buscar os dados da API 
        
        pegarSaldo();
        if (totalRendimento && totalGasto) {
            console.log("renda total = " + totalRendimento + " id =" + idActual);
            checkPercent();
        }
    }, [idActual]);


    // função para adicionar notificação
    const adicionarNotificacao = (nova: string) => {
        setNotificacoes((prev) => {
            // só adiciona se ainda não existir
            if (prev.includes(nova)) {
                return prev;
            }
            return [...prev, nova];
        });
    };
    // 

    // teste
    const [open, setOpen] = useState(false);
    // 

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
                            <Text style={styles.textButtonModal}>Cancelar</Text>
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
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity

                            onPress={() =>
                                handleClickButton()

                            }

                        >
                            <ImageBackground source={user} resizeMode='cover' style={{ width: 30, height: 30, margin: 'auto' }} />
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
                        onPress={() => navigation.navigate('Rendimentos', { userName: userName, id: idActual })}

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
                        onPress={() => navigation.navigate('Despesas', { userName: userName, id: idActual })}

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
                        onPress={() => navigation.navigate('Poupancas', { userName: userName, id: idActual })}

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

            <View style={styles.containerFooter}>
                {/* Menu */}
                <View style={styles.tabBar}>
                    <TouchableOpacity style={styles.tabItem}>

                        <Foundation name="graph-trend" color="#222" size={24} />
                        <Text style={{ fontSize: 12 }}>Previsões</Text>
                    </TouchableOpacity>

                    {/* Botão central */}
                    <TouchableOpacity
                        style={styles.fabButton}
                        onPress={() => setOpen1(!open1)}
                    >
                        <Icon name={open1 ? "close" : "add"} size={28} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabItem}
                        onPress={() => setModalVisible1(true)} // 👉 abre o modal
                    >
                        <View style={{ position: "relative" }}>
                            <Icon name="notifications-outline" size={24} color="#222" />

                            {/* Badge */}
                            {notificacoes.length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{notificacoes.length}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={{ fontSize: 12 }}>Notificações</Text>
                    </TouchableOpacity>
                </View>

                {/* Exemplo: menu extra quando clica no botão central */}
                {open && (
                    <View style={styles.extraMenu}>
                        <TouchableOpacity style={styles.extraItem}>
                            <Text style={styles.extraText}>
                                <Icon name="person-add-outline" size={24} color="#222" /> Adicionar membro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.extraItem}>
                            <Text style={styles.extraText}>
                                <Icon name="person-remove-outline" size={24} color="#222" /> remover membro</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Modal de Notificações */}
                <Modal
                    visible={modalVisible1}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible1(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Notificações</Text>

                            <FlatList
                                data={notificacoes}
                                keyExtractor={(_, index) => index.toString()} // usa o índice como chave
                                renderItem={({ item }) => (
                                    <View style={styles.notificationItem}>
                                        <Icon name="notifications" size={20} color="#555" />
                                        <Text style={styles.notificationText}>{item}</Text>
                                    </View>
                                )}
                            />

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible1(false)}
                            >
                                <Text style={{ color: "#fff" }}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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

    // teste
    containerFooter: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        // justifyContent: "flex-end",
        maxHeight: 70,
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        height: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 5,
        elevation: 5,
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        maxWidth: 70,
    },
    fabButton: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: "#e91e63",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30, // empurra para cima do menu
    },
    extraMenu: {
        position: "absolute",
        bottom: 90,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        elevation: 5,
    },
    extraItem: {
        padding: 10,

    },
    extraText: {
        fontSize: 16,

    },
    // 

    // 
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "70%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    notificationText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#333",
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    badge: {
        position: "absolute",
        right: -6,
        top: -4,
        backgroundColor: "red",
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    // 

});