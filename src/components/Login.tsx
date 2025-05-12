
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { propsStack } from ".";
import Axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [userName, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const fundo = require("../../assets/icons/fundo1.jpg");
  const user = require("../../assets/icons/User.png");
  const eyeHide = require("../../assets/icons/eyeHide.png");
  const eyeVisible = require("../../assets/icons/eyeVisible.png");
  const [userId, setUserId] = useState("");

  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocus2 = () => setIsFocused2(true);
  const handleBlur2 = () => setIsFocused2(false);
  const handleClickButton = () => {
    const dados = {
      // Seus dados para enviar no corpo da requisição POST
      nome: userName,
      password: password,

    };
    // Axios.post('http://192.168.100.14:3001/loginUser', dados)
    //   .then(response => {
    //     // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
    //     const responseData = response.data;

    //     if (Array.isArray(responseData) && responseData.length > 0) {
    //       setUserId(responseData[0].id);
    //       alert('Bem-vindo de volta ' + responseData[0].nome);
    //       navigation.navigate('Home', { userName: responseData[0].nome, id: responseData[0].id, idFamilia:responseData[0].idFamilia}); // Navega para a tela Home após login bem-sucedido
          
    //     } else {
    //       alert('Nome de usuário ou senha inválidos');
    //     }

    //   }).catch(error => {
    //     // Se houver algum erro na requisição, você pode tratá-lo aqui
    //     alert('Erro ao conectar-se a base de dados!')
    //   });

    Axios.post('http://192.168.100.14:3001/loginUser', dados)
    .then(response => {
        const responseData = response.data;

        // Verifique se a resposta contém um objeto de usuário
        
        if (responseData.message === "Login bem-sucedido.") {
            setUserId(responseData.user.id);
            alert('Bem-vindo de volta ' + responseData.user.nome);
            navigation.navigate('Home', { 
                userName: responseData.user.nome, 
                id: responseData.user.id, 
                idFamilia: responseData.user.idFamilia 
            });
        } else {
            alert('Nome de usuário ou senha inválidos');
        }

    }).catch(error => {
        alert('Erro ao conectar-se à base de dados!1');
    });

  };
  return (
    <View style={[styles.containerHeader, { height: height }]}>
      {/* here, i will be define the especifications of background */}
      <ImageBackground source={fundo} resizeMode='cover'
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.2,
          position: 'absolute',
        }} />
      <View style={[styles.loginView, { height: height * 0.1, top: height * 0.05 }]}>
        <Text style={styles.textLogin}>Login</Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerHeader}
        extraScrollHeight={300} // Altura extra para rolar além do teclado
        enableOnAndroid={true} // Habilita o recurso no Android
      >
        <View style={[styles.painelLateral, { height: height * 0.8, top: height * 0.1 }]}>
          <Text style={styles.text}>Bem-Vindo!</Text>
          <View style={[styles.textInput,{ borderColor: isFocused ? '#00f' : '#ccc' }]}>
            <TextInput
              placeholder="ID"
              style={{
                width: '82%',
                height: '100%',
                marginStart: '2%',
                marginEnd: '2%'
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={(text) => setNome(text)}
            ></TextInput>
            <ImageBackground source={user} resizeMode='cover' style={{ width: 25, height: 25, marginVertical: 'auto' }} />
          </View>
          <View style={[styles.textInput,{ borderColor: isFocused2 ? '#00f' : '#ccc' }]}>
            <TextInput
              placeholder="senha"
              secureTextEntry={!showPassword}
              value={password}
              style={{
                width: '82%',
                height: '100%',
                marginStart: '2%',
                marginEnd: '2%'
              }}
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TouchableOpacity onPress={toggleShowPassword} style={{ width: 20, height: 20, marginVertical: 'auto'}}>
              <Text>
                
                {showPassword ? <ImageBackground source={eyeVisible} resizeMode='cover' style={{ width: 20, height: 20, marginVertical: '0%'}}/> : <ImageBackground source={eyeHide} resizeMode='cover' style={{ width: 20, height: 20, marginVertical: '0%'}}/>}
              </Text>
            </TouchableOpacity>
            

          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              
              if (!userName.replaceAll(" ", "") || !password.replaceAll(" ", "")) {
                alert("Preencha todos campos!");
              } else {
                handleClickButton();
              }
            }
            }

          >
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
          <Text style={{ color: '#C0C0C0' }}>Esqueceu a senha?</Text>

          <TouchableOpacity
            style={styles.button}


            onPress={() =>

              navigation.navigate('Cadastro1')}

          >
            <Text style={styles.textButton}>Criar conta</Text>
          </TouchableOpacity>

          <Text style={{ color: '#C0C0C0' }}>Não tem uma conta?</Text>

        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  containerHeader: {
    flex: 1,

    backgroundColor: 'fff',
    // backgroundColor: 'transparent',

    
  },
  text: {
    color: '#fff',
    fontSize: 40,
    marginBottom: 80,
  },

  textLogin: {
    color: '#fff',
    fontSize: 40,
  },

  textInput: {
    width: '80%',
    height: 50,
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderBottomWidth: 5,
    borderBottomColor: '#DCDCDC',
    marginVertical: 5,
    color: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
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
  textButton: {
    color: '#49688D',
    fontSize: 20,
  },

  painelLateral: {
    backgroundColor: '#49688D',
    width: '85%',
    borderTopStartRadius: 60,
    marginStart: '15%',
    opacity: 0.92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginView: {
    width: '50%',
    backgroundColor: 'black',
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',

  }
});