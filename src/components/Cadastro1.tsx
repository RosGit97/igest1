
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { propsStack } from ".";
import Axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Cadastro1() {
  const navigation = useNavigation<propsStack>();

  const fundo = require("../../assets/icons/fundo1.jpg");
    const { height } = Dimensions.get('window');


  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocus2 = () => setIsFocused2(true);
  const handleBlur2 = () => setIsFocused2(false);
  const handleFocus3 = () => setIsFocused3(true);
  const handleBlur3 = () => setIsFocused3(false);
  const handleFocus4 = () => setIsFocused4(true);
  const handleBlur4 = () => setIsFocused4(false);
  const handleFocus5 = () => setIsFocused5(true);
  const handleBlur5 = () => setIsFocused5(false);


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

      <View style={[styles.CadastroView, { height: height * 0.1, top: height * 0.05 }]}>
        <Text style={styles.textCadastro}>Cadastro</Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.containerHeader}
        extraScrollHeight={300} // Altura extra para rolar além do teclado
        enableOnAndroid={true} // Habilita o recurso no Android
      >
        <View style={[styles.painelLateral, { height: height * 0.8, top: height * 0.1 }]}>
          <Text style={styles.textCadastro}>Tem familia registada?</Text>
          
          
          <TouchableOpacity
            style={styles.button}
            onPress={() =>

                navigation.navigate('Cadastro')}
  
          >
            <Text style={styles.textButton}>Sim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>

                navigation.navigate('CadastroFamilia')}
          >
            <Text style={styles.textButton}>Não</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>

  );
}

const styles = StyleSheet.create({

  containerHeader: {
    flex: 1,

    // backgroundColor: '#fff',
    // backgroundColor: 'transparent',
    width: '100%',
    height: '100%',

  },
  text: {
    color: '#49688D',
    fontSize: 40,
  },

  textCadastro: {
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
    borderTopEndRadius: 60,
    marginStart: 0,
    opacity: 0.92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CadastroView: {
    width: '50%',
    backgroundColor: 'black',
    borderTopStartRadius: 50,
    borderBottomStartRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '50%',

  }
});