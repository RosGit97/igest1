import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Image } from "react-native";
import Axios from "axios";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { LineChart } from "react-native-chart-kit";

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Previsao'>;
interface DadoPrevisao {
    mes: string;
    total: number;
}

interface RespostaPrevisao {
    dados: DadoPrevisao[];
    previsao: number;
    meses: number;
    tendencia: string;
}
export default function Previsao() {
    const [dados, setDados] = useState<any>(null);
    const route = useRoute<HomeScreenRouteProp>();
    const id = route.params.id;
    const [date, setDate] = useState(new Date());
    let mes = date.getMonth() + 2; // Obtem o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
    let ano = date.getFullYear();

    // ====================================================
    const [labels, setLabels] = useState<string[]>([]);
    const [valores, setValores] = useState<number[]>([]);
    // ==================================================== 
    if (mes > 12) {
        mes = 1;
        ano += 1;
    }
    // ======================================================================================
    useEffect(() => {
        const dados1 = {
            // Seus dados para enviar no corpo da requisição POST
            id: id,
        };

        // Função para buscar os dados da API 

        Axios.post("http://192.168.100.6:3001/previsao", dados1)
            .then((res) => {
                setDados(res.data);
                // const meses = dados.map((d) => d.mes);
                // const totais = dados.map((d) => parseFloat(d.total.toString()));

                const dadosRecebidos = res.data.dados || res.data; // depende da estrutura da tua API

                // Mapeia diretamente sobre a resposta
                // const meses = dadosRecebidos.map((d: any) => d.mes);
                // const totais = dadosRecebidos.map((d: any) => parseFloat(d.total.toString()));
                const meses = dadosRecebidos.map((d: any) => String(d.mes));
                const totais = dadosRecebidos.map((d: any) => Number(d.total));
                
                // Adiciona ponto de previsão
                meses.push("Previsão");
                totais.push(Number(res.data.previsao));

                setLabels(meses);
                setValores(totais);
                
            })

            .catch(err => console.error(err));
        // console.log("trrer1" + dados.previsao);
    }, [id]);

    // =======================================================================================

    // =======================================================================================

    if (!dados) return <ActivityIndicator size="large" color="#f60" />;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>💰 Previsão de Gastos para {mes}/{ano}</Text>
            <Text style={styles.valor}>{dados.previsao} Kz</Text>
            <Text style={styles.desc}>Baseado em {dados.meses} meses</Text>

            <View>

                {valores.length > 0 && (
                    <LineChart
                        data={{
                            labels: labels,
                            datasets: [{ data: valores }],
                        }}
                        width={Dimensions.get("window").width - 20}
                        height={220}
                        yAxisLabel="Kz"
                        chartConfig={{
                            backgroundColor: "#ffffff",
                            backgroundGradientFrom: "#f5f5f5",
                            backgroundGradientTo: "#e3e3e3",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                        style={{
                            borderRadius: 10,
                            marginVertical: 8,
                        }}
                    />
                )}
            </View>
            <Text style={[
                styles.trend,
                { color: dados.tendencia === "aumentando" ? "red" : "green" }
            ]}>
                Tendência: {dados.tendencia === "aumentando" ? "↑ aumentando" : "↓ diminuindo"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        alignItems: "center",
        margin: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#444"
    },
    valor: {
        fontSize: 28,
        color: "#f60",
        fontWeight: "700",
        marginVertical: 5
    },
    desc: {
        fontSize: 14,
        color: "#777"
    },
    trend: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 8
    }
});