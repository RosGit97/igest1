import React from 'react';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
    Home: undefined
    Rendimentos : undefined
    Despesas: undefined
    Poupancas: undefined
    // Auxi: undefined
    Cadastro: undefined
    Login: undefined
    AddGasto: undefined
    AddRendimentos:undefined
    AddPoupanca:undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>