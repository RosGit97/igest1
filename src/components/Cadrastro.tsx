
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { propsStack } from ".";
import Axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Cadastro() {
  const navigation = useNavigation<propsStack>();

  const fundo = require("../../assets/icons/fundo1.jpg");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  const [date, setDate] = useState(new Date());
  const dia = date.getDate(); // Obtem o dia do mês (1-31)
  const mes = date.getMonth() + 1; // Obtem o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
  const ano = date.getFullYear(); // Obtem o ano com quatro dígitos

 
  const [showPicker, setShowPicker] = useState(false);
  const handleClickButton = () => {
    const dados = {
      // Seus dados para enviar no corpo da requisição POST
      nome: nome,
      sobrenome: sobrenome,
      nascimento: dia+"/"+mes+"/"+ano,
      password: password,

    };
    Axios.post("http://192.168.100.6:3001/registoUser", dados)
      .then(response => {
        // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
        console.log('Dados enviados com sucesso:', response.data);
        setSuccessMessage('Inserção de dados feita com sucesso!');
        alert('Inserção de dados feita com sucesso!')
      }).catch(error => {
        // Se houver algum erro na requisição, você pode tratá-lo aqui
        console.error('Erro ao fazer requisição:', error);
        setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
      });

  };

  function double() {
    handleClickButton();
    // alert(successMessage)
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)

  }

  const onChange = (type: any, selectedDate: Date | undefined) => {
    // if (type == "set") {
    //   const currentDate = selectedDate;
    //   setDate(currentDate);
    //   if (Platform.OS === "android") {
    //     toggleDatePicker();
    //     // setDataGasto(date.toString())
    //   }
    // }
    // else {
    //   toggleDatePicker();
    // }
    const currentDate = selectedDate || date;
    setDate(currentDate);
    toggleDatePicker();
    console.log(date.toDateString())
  }

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
      <Text style={styles.text}>Cadastre-se!</Text>
      <TextInput
        placeholder="Nome"
        style={styles.textInput}
        onChangeText={(text) => setNome(text)}
      ></TextInput>
      <TextInput
        placeholder="Sobrenome"
        style={styles.textInput}
        onChangeText={(text) => setSobrenome(text)}
      ></TextInput>

      <Pressable
        onPress={toggleDatePicker}
      >
        <TextInput
          placeholder="nascimento"
          style={styles.textInput}
          onChangeText={(text) => setNascimento(date.toString())}

          // onPressIn={toggleDatePicker}
          value={date.toDateString()}
          editable={false}
        >
        </TextInput>
      </Pressable>
      {showPicker && (

        <DateTimePicker
          mode="date"

          display="spinner"
          onChange={onChange}
          value={date}
        />
      )}

      <TextInput 
        placeholder="senha" 
        secureTextEntry={true} 
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        ></TextInput>


      <TouchableOpacity
        style={styles.button}
        onPress={
          () => {
            double();
            navigation.navigate('Login');
          }
        }
      >
        <Text style={styles.textButton}>Submeter</Text>
      </TouchableOpacity>

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