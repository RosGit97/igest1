
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { propsStack } from ".";

export default function Login() {
  const navigation = useNavigation<propsStack>();

  const fundo = require("../../assets/icons/fundo1.jpg");
  return (
    <View style={styles.containerHeader}>
      {/* here, i will be define the especifications of background */}
      <ImageBackground source={fundo} resizeMode='cover'
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.2,
          position: 'absolute',
        }} />
        <Text style={styles.text}>Bem-Vindo!</Text>
        <TextInput placeholder="Nome de usuario" style={styles.textInput}></TextInput>
        <TextInput placeholder="senha" secureTextEntry={true} style={styles.textInput}></TextInput>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={{color: '#C0C0C0'}}>Esqueceu a senha?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cadastro')}

        >
          <Text style={styles.textButton}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={{color: '#C0C0C0'}}>Não tem uma conta?</Text>
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
  }
});