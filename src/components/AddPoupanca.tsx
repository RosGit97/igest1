import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Pressable, Platform } from 'react-native';
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "./types";
import { propsStack } from ".";
import Axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "@react-native-community/datetimepicker"
import { TextInputMask } from 'react-native-masked-text';

const Stack = createStackNavigator();
type AddPoupancaScreenRouteProp = RouteProp<RootStackParamList, 'AddPoupanca'>;
type AddPoupancaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddPoupanca'>;

export default function AddPoupanca() {
  const navigation = useNavigation<AddPoupancaScreenNavigationProp>();

  const fundo = require("../../assets/icons/fundo1.jpg");

  const [values, setValues] = useState();
  var use = null;
  const [objectivo, setObjectivo] = useState("");
  const [tempoPoupanca, setTempoPoupanca] = useState("");
  const [valorPrevisto, setValorPrevisto] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [valorMensalReal, setValorMensalReal] = useState(0);
  const [valorPrevistoReal, setValorPrevistoReal] = useState(0);
  const [dataPoupanca, setDataPoupanca] = useState("");

  const [tipoGasto, setTipoGasto] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dia = date.getDate(); // Obtem o dia do mês (1-31)
  const mes = date.getMonth() + 1; // Obtem o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
  const ano = date.getFullYear(); // Obtem o ano com quatro dígitos
  const [successMessage, setSuccessMessage] = useState('');

  const route = useRoute<AddPoupancaScreenRouteProp>();
  const userName = route.params.userName;
  const id = route.params.id;
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
  const handleClickButton = () => {
    const dados = {
      // Seus dados para enviar no corpo da requisição POST
      objectivo: objectivo,
      tempoPoupanca: tempoPoupanca,
      // valorPrevisto: valorPrevisto.replace("R$", ""),
      // valorMensal: valorMensal.replace("R$", ""),
      valorPrevisto: valorPrevistoReal,
      valorMensal: valorMensalReal,
      dataPoupanca: dia + "/" + mes + "/" + ano,
      idUsuario: id,
      tipo_gasto: tipoGasto,
    };
    Axios.post("http://192.168.56.1:3001/registoPoupanca", dados)
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
    console.log(valorPrevistoReal)
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
      <Text style={styles.text}>Plano de poupança</Text>

      <TextInput
        placeholder="Qual o seu objectivo"
        style={styles.textInput}
        onChangeText={(text) => setObjectivo(text)}
      ></TextInput>
      <TextInput
        placeholder="Em quanto tempo pretende alcançar esse objectivo?"
        style={styles.textInput}
        onChangeText={(text) => setTempoPoupanca(text)}
      ></TextInput>

      {/* <TextInputMask
        type={'money'}
        placeholder="Qual o valor que pretende obter no final?"
        value={valorPrevisto}
        style={styles.textInput}
        maxLength={18}
        onChangeText={value => {
          setValorPrevisto(value);
          value = value.replace('AOA', '');
          value = value.replace('.', '');
          value = value.replace(',', '');
          setValorPrevistoReal(Number(value));
        }}
      ></TextInputMask> */}


      {/* testing number input */}

      <TextInputMask
        type={'money'}
        options={{
          precision: 2, // Número de casas decimais
          separator: ',', // Separador decimal
          delimiter: '.', // Separador de milhar
          unit: 'AOA ', // Símbolo da moeda
          suffixUnit: '', // Sufixo da unidade (caso necessário)
        }}
        placeholder="Qual o valor que pretende obter no final?"
        value={valorPrevisto}
        style={styles.textInput}
        keyboardType="number-pad" // Define teclado numérico
        maxLength={18}
        onChangeText={(formattedValue) => {
          setValorPrevisto(formattedValue); // Atualiza o valor formatado
          const numericValue = Number(
            formattedValue
              .replace('AOA', '') // Remove o prefixo da moeda
              .replace(/\./g, '') // Remove separadores de milhar
              .replace(',', '.') // Substitui vírgula por ponto para decimais
              .trim() // Remove espaços em branco
          );
          setValorPrevistoReal(numericValue); // Atualiza o valor numérico real
        }}
      />

      {/*  */}

      {/* testing input 2 */}

      <TextInputMask
        type={'money'}
        options={{
          precision: 2, // Define 2 casas decimais
          separator: ',', // Usa vírgula como separador decimal
          delimiter: '.', // Usa ponto como separador de milhar
          unit: 'AOA ', // Define "AOA" como prefixo
          suffixUnit: '', // Sem sufixo adicional
        }}
        placeholder="Qual o valor que pretende adicionar mensalmente?"
        value={valorMensal}
        style={styles.textInput}
        keyboardType="number-pad" // Garante teclado numérico
        maxLength={18}
        onChangeText={(formattedValue) => {
          setValorMensal(formattedValue); // Atualiza o valor formatado
          const numericValue = Number(
            formattedValue
              .replace('AOA', '') // Remove o prefixo da moeda
              .replace(/\./g, '') // Remove separadores de milhar
              .replace(',', '.') // Substitui vírgula por ponto para decimais
              .trim() // Remove espaços em branco extras
          );
          setValorMensalReal(numericValue); // Atualiza o valor numérico real
        }}
      ></TextInputMask>

      {/*  */}

      {/* <TextInputMask
        type={'money'}
        placeholder="Qual o valor que pretende adicionar mensalmente?"
        value={valorMensal}
        style={styles.textInput}
        maxLength={18}
        onChangeText={value => {
          setValorMensal(value);
          value = value.replace('AOA', '');
          value = value.replace('.', '');
          value = value.replace(',', '');
          setValorMensalReal(Number(value));
        }}
      ></TextInputMask> */}

      {showPicker && (

        <DateTimePicker
          mode="date"

          display="spinner"
          onChange={onChange}
          value={date}
        />
      )}

      <Pressable
        onPress={toggleDatePicker}
      >
        <TextInput
          placeholder="quando fez esse gasto?"
          style={styles.textInput}
          onChangeText={(text) => setDataPoupanca(date.toString())}

          // onPressIn={toggleDatePicker}
          value={date.toDateString()}
          editable={false}
        >
        </TextInput>
      </Pressable>


      {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}


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
        onValueChange={(value) => setTipoGasto(value)}
        items={[
          { label: 'Pessoal', value: 'Pessoal' },
          { label: 'Familiar', value: 'Familiar' },
        ]}
      />
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('Home')}
        onPress={
          () => {

            if (!objectivo.replaceAll(" ", "") || !tempoPoupanca.replaceAll(" ", "") || !valorPrevisto.replaceAll(" ", "") ||
              !valorMensal.replaceAll(" ", "") || !date) {
              alert("Preencha todos campos!");
            } else {
              double();
              navigation.navigate('Poupancas', { userName: userName, id: id })
              alert("Poupança criada com sucesso!");
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