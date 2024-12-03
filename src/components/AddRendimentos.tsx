
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Pressable, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { propsStack } from ".";
import Axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "@react-native-community/datetimepicker"
import { TextInputMask } from 'react-native-masked-text';

export default function AddRendimentos() {
  const navigation = useNavigation<propsStack>();

  const fundo = require("../../assets/icons/fundo1.jpg");

  const [values, setValues] = useState();
  var use = null;
  const [fonteRendimento, setFonteRendimento] = useState("");
  const [valorRendimento, setValorRendimento] = useState('0')
  const [valorRendimentoReal, setValorRendimentoReal] = useState(0)

  const [nomeGasto, setNomeGasto] = useState("");
  const [valorGasto, setValorGasto] = useState("");
  const [dataGasto, setDataGasto] = useState("");
  const [tipoGasto, setTipoGasto] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dia = date.getDate(); // Obtem o dia do mês (1-31)
  const mes = date.getMonth() + 1; // Obtem o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
  const ano = date.getFullYear(); // Obtem o ano com quatro dígitos
  const [successMessage, setSuccessMessage] = useState('');

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
    const dados = {
      // dados para enviar no corpo da requisição POST
      categoria: fonteRendimento,
      nomeGasto: nomeGasto,
      valorGasto: valorGasto,
      dataGasto: dia+"/"+mes+"/"+ano,
      tipo_gasto: tipoGasto,
    };
    Axios.post("http://192.168.100.6:3001/registoGasto", dados)
    .then(response => {
      // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
      console.log('Dados enviados com sucesso:', response.data);
      setSuccessMessage('Inserção de dados feita com sucesso!');
      alert('Inserção de dados feita com sucesso!')
    }).catch(error => {
      // Se houver algum erro na requisição, você pode tratá-lo aqui
      console.error('Erro ao fazer requisição:', error);
      setSuccessMessage('Erro ao inserir dados. Por favor, tente novamente.');
      alert('Erro ao inserir dados. Por favor, tente novamente.')
    });

  };

  function double() {
    handleClickButton();
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

      <TextInput
        placeholder="fonte da renda(salario, negócios)"
        style={styles.textInput}
        onChangeText={(text) => setFonteRendimento(text)}
      ></TextInput>
      <TextInputMask
        type={'money'}
        value={valorRendimento}
        style={styles.textInput}
        maxLength={18}
        onChangeText={value => {
          setValorRendimento(value);
          value = value.replace('AOA','');
          value = value.replace('.','');
          value = value.replace(',','');
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
      {/* {showPicker && (

        <Pressable 
          onPress={toggleDatePicker}
        >
          <TextInput
            placeholder="sat aug 21 2004"
            value={dataGasto}
            onChangeText={setDataGasto}
            editable={false}
            onPressIn={toggleDatePicker}
          />
        </Pressable>
        
      )} */}
      {/* <TextInput
        placeholder="tipo de gasto"
        style={styles.textInput}
        onChangeText={(text) => setTipoGasto(text)}
      >
      </TextInput> */}
      {/* <RNPickerSelect

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
      /> */}
      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('Home')}
        onPress={
          () => {
            double();
            navigation.navigate('Home');
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