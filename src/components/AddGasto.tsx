
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
type AddGastoScreenRouteProp = RouteProp<RootStackParamList, 'AddGasto'>;
type AddGastoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddGasto'>;

export default function AddGasto() {
  const navigation = useNavigation<AddGastoScreenNavigationProp>();

  const fundo = require("../../assets/icons/fundo1.jpg");

  const [values, setValues] = useState();
  var use = null;
  const [categoria, setCategoria] = useState("");
  const [nomeGasto, setNomeGasto] = useState("");
  const [valorGasto, setValorGasto] = useState("");
  const [valorGastoReal, setValorGastoReal] = useState(0);
  const [dataGasto, setDataGasto] = useState("");
  const [tipoGasto, setTipoGasto] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dia = date.getDate(); // Obtem o dia do mês (1-31)
  const mes = date.getMonth() + 1; // Obtem o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
  const ano = date.getFullYear(); // Obtem o ano com quatro dígitos
  const [successMessage, setSuccessMessage] = useState('');

  const route = useRoute<AddGastoScreenRouteProp>();
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
    console.log(dataGasto)

  }
  const handleClickButton = () => {
    console.log("valor" + valorGasto.replace("R$", "").replace(".", "").replace(",", "."));
    // const valorSemMoeda = valorGasto.replace(/[^\d,.-]/g, ''); // Remove símbolos de moeda e pontos de milhar, preservando vírgulas e números
    // console.log(valorGasto);
    const dados = {
      // Seus dados para enviar no corpo da requisição POST
      categoria: categoria,
      nomeGasto: nomeGasto,
      valorGasto: valorGasto.replace("R$", "").replace(".", "").replace(",", "."),
      dataGasto: dia+"/"+mes+"/"+ano,
      tipo_gasto: tipoGasto,
      idUsuario: id,
    };
    Axios.post("http://192.168.56.1:3001/registoGasto", dados)
      .then(response => {
        // Aqui dentro do bloco then, você tem acesso aos dados retornados pela requisição
        console.log('Dados enviados com sucesso:', response.data);
        setSuccessMessage('Inserção de dados feita com sucesso!');
        // alert('Inserção de dados feita com sucesso!')

        // teste

        // adiçao de saldo
        const dadosPS = {
          // Seus dados para enviar no corpo da requisição POST
          idActual: id,

        };
        Axios.post("http://192.168.56.1:3001/pegarSaldo", dadosPS)
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
                parseFloat(valorGasto.replace("R$", "").replace(/\./g, "").replace(",", ".")),
            };
            Axios.post("http://192.168.56.1:3001/atualizarSaldo", dadosAS)
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

        // teste

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
      <Text style={styles.text}>Registo de despesa</Text>

      <TextInput
        placeholder="categoria"
        style={styles.textInput}
        onChangeText={(text) => setCategoria(text)}
      ></TextInput>
      <TextInput
        placeholder="o que comprou?"
        style={styles.textInput}
        onChangeText={(text) => setNomeGasto(text)}
      ></TextInput>
      <TextInputMask
        type={'money'}
        placeholder="quanto gastou?"
        value={valorGasto}
        style={styles.textInput}
        maxLength={18}
        onChangeText={value => {
          setValorGasto(value); // Atualiza o valor no estado sem modificações
          value = value.replace('AOA', '');
          value = value.replace('.', '');
          value = value.replace(',', '');
          setValorGastoReal(Number(value));
        }}


      >
      </TextInputMask>

      {/* <TextInputMask
        type={'money'}
        placeholder="quanto gastou?"
        value={valorGasto}
        style={styles.textInput}
        maxLength={18}
        onChangeText={value => {
          setValorGasto(value);
          // value = value.replace('AOA','');
          // value = value.replace('.','');
          // value = value.replace(',','');
          // setValorGasto(Number(value));
        }}
      ></TextInputMask> */}



      <Pressable
        onPress={toggleDatePicker}
      >
        <TextInput
          placeholder="quando fez esse gasto?"
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
      {showPicker && (

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

      )}
      {/* <TextInput
        placeholder="tipo de gasto"
        style={styles.textInput}
        onChangeText={(text) => setTipoGasto(text)}
      >
      </TextInput> */}
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
            if (!nomeGasto.replaceAll(" ", "") || !categoria.replaceAll(" ", "") || !tipoGasto.replaceAll(" ", "")) {
              alert("Preencha todos campos!1-" + nomeGasto + "2-" + categoria + "3-" + dataGasto + "4-" + tipoGasto);
            } else {
              double();
              navigation.navigate('Despesas', { userName: userName, id: id })
              
              alert("gasto registado!" + valorGasto);
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