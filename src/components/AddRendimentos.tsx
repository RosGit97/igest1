
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Pressable, Platform } from 'react-native';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "./types";
import Axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "@react-native-community/datetimepicker"
import { TextInputMask } from 'react-native-masked-text';


const Stack = createStackNavigator();
type AddRendimentosScreenRouteProp = RouteProp<RootStackParamList, 'AddRendimentos'>;
type AddRendimentosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddRendimentos'>;

export default function AddRendimentos() {
  const navigation = useNavigation<AddRendimentosScreenNavigationProp>();

  const fundo = require("../../assets/icons/fundo1.jpg");

  const [values, setValues] = useState();
  var use = null;
  const [fonteRendimento, setFonteRendimento] = useState("5");
  const [valorRendimento, setValorRendimento] = useState('0');
  const [valorAnterior, setValorAnterior] = useState('0');
  const [valorRendimentoReal, setValorRendimentoReal] = useState(0);
  const [dataGasto, setDataGasto] = useState("")
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false)
  const dia = date.getDate(); // Obtem o dia do mês (1-31)
  const mes = date.getMonth() + 1; // Obtem o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
  const ano = date.getFullYear(); // Obtem o ano com quatro dígitos
  const [successMessage, setSuccessMessage] = useState('');
  const route = useRoute<AddRendimentosScreenRouteProp>();
  const userName = route.params.userName;
  const id = route.params.id;
  const data2 = dia + "/" + mes + "/" + ano;
  const toggleDatePicker = () => {
    setShowPicker(!showPicker)

  }

  const onChange = (type: any, selectedDate: Date | undefined) => {

    const currentDate = selectedDate || date;
    setDate(currentDate);
    toggleDatePicker();
    console.log(date.toDateString())
  }
  const handleClickButton = () => {
    console.log("valor" + valorRendimento.replace("R$", "").replace(".", "").replace(",", "."));
    const dados = {
      // dados para enviar no corpo da requisição POST
      fonteRendimento: fonteRendimento,
      valorRendimento: valorRendimento.replace("R$", "").replace(".", "").replace(",", "."),
      data: data2,
      idUsuario: id,
    };
    Axios.post("http://192.168.100.11:3001/registoRendimento", dados)
      .then(response => {
        // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
        console.log('Dados enviados com sucesso:', response.data);
        setSuccessMessage('Inserção de dados feita com sucesso!');
        // alert('Inserção de dados feita com sucesso!')
        // adiçao de saldo
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
              novoValor: parseFloat(responseData[0].valor) +
                parseFloat(valorRendimento.replace("R$", "").replace(/\./g, "").replace(",", ".")),
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
      }).catch(error => {
        // Se houver algum erro na requisição, você pode tratá-lo aqui
        console.error('Erro ao fazer requisição:', error);
        setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
        alert('Erro ao inserir dados. Por favor, tente novamente.')
      });

  };


  function double() {
    handleClickButton();
    // consultaSaldo();
    // addSaldo();
    console.log(valorRendimento.replace("R$", ""));
    // alert(successMessage)
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
      <Text style={styles.text}>Registo de receitas</Text>


      <RNPickerSelect

        style={{
          inputAndroid: {

            paddingHorizontal: 10,
            // backgroundColor: 'red',
            borderRadius: 5,
            width: 340,
            height: 50,

            borderBottomWidth: 0.5,
            borderBottomColor: '#C0C0C0',
          },
        }}

        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => setFonteRendimento(value)}
        items={[
          { label: 'Salário', value: 'Salario' },
          { label: 'Negócio', value: 'Negocio' },
        ]}
      />
      <TextInputMask
        type={'money'}
        value={valorRendimento}
        style={styles.textInput}
        maxLength={18}
        onChangeText={value => {
          setValorRendimento(value);
          value = value.replace('AOA', '');
          value = value.replace('.', '');
          value = value.replace(',', '');
          setValorRendimentoReal(Number(value));
        }}
      >

      </TextInputMask>
      {/* <TextInput
        placeholder="o que comprou?"
        style={styles.textInput}
        onChangeText={(text) => setNomeGasto(text)}
      ></TextInput> */}
      {/* <TextInput
        placeholder="quanto gastou?"
        style={styles.textInput}
        onChangeText={(text) => setValorGasto(text)}
      ></TextInput> */}



      <Pressable
        onPress={toggleDatePicker}
      >
        <TextInput
          placeholder="quando recebeu?"
          style={styles.textInput}
          onChangeText={(text) => setDataGasto(date.toString())}

          // onPressIn={toggleDatePicker}
          value={date.toDateString()}
          editable={false}
        >
        </TextInput>
      </Pressable>


      {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
      {showPicker && (

        <DateTimePicker
          mode="date"

          display="spinner"
          onChange={onChange}
          value={date}
        />
      )}
      <TouchableOpacity
        style={styles.button}

        onPress={
          () => {

            if (!fonteRendimento.replaceAll(" ", "") || !valorRendimento.replaceAll(" ", "") || !data2.replaceAll(" ", "")) {
              alert("Preencha todos campos!");
            } else {
              double();
              // navigation.navigate('Home', { userName: userName, id: id });
              navigation.navigate('Rendimentos', { userName: userName, id: id })
              alert("saldo adicionado!" + valorRendimento);
            }

          }
        }
      >
        <Text style={styles.textButton}>Salvar</Text>
      </TouchableOpacity>
      {/* {successMessage ? <Text>{successMessage}</Text> : null} */}

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