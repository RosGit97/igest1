import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import {useFonts,Frijole_400Regular} from '@expo-google-fonts/frijole';

export default function Header() {

  const [fontLoaded] = useFonts({Frijole_400Regular});

  if(!fontLoaded){
    return null;
  }
    const fundo = require("../../assets/icons/home.png");
  return (
    <View style={styles.containerHeader}>
        <Text style={styles.text}>IGEST</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    
    containerHeader: {
        flex: 1,
        backgroundColor: '#49688D',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        maxHeight: '10%',
        
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
    },
    text:{
        fontFamily: 'Frijole_400Regular',
        color: '#fff',                            
        fontSize: 40,

    },
  });