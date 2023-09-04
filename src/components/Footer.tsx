
import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';


export default function Footer() {
    const home = require("../../assets/icons/home.png");
    const undo = require("../../assets/icons/undo.png");
    const user = require("../../assets/icons/User.png");
    return (
        <View style={styles.containerFooter}>
            <ImageBackground source={undo} resizeMode='cover' style={{marginStart: 10,width: 50,height: 50,}}/>
            <ImageBackground source={home} resizeMode='cover' style={{width: 50,height: 50}}/>
            <ImageBackground source={user} resizeMode='cover' style={{marginEnd: 10,width: 50,height: 50,}}/>

        </View>
    );
}

const styles = StyleSheet.create({

    containerFooter: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#49688D',
        
        alignItems: 'center',
        justifyContent: 'space-between',
        
        // width: '100%',
        // maxHeight: '8%',
        
        // borderRightWidth: 700,
        // borderLeftWidth: 700,
        // borderBottomWidth: 80,
        width: '100%',
        maxHeight: '8%',
        // borderLeftColor: 'transparent',
        // borderRightColor: 'transparent',
        // borderBottomColor: '#49688D',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
    },
    home:{
        // marginTop: 15,
        
        width: 50,
        height: 50,
    },
    undo:{
        // marginTop: 15,
        width: 50,
        height: 50,
    }
});