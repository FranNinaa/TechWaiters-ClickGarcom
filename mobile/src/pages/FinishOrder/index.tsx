// Importações básicas do React Native e ícones do Expo
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

// Importações do React Navigation para navegação e acesso a parâmetros da rota
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackList } from "../../routes/app.routes";

// Importação do cliente Axios configurado para fazer requisições à API
import { api } from "../../services/api";

// Definição dos tipos para os parâmetros da rota
type RouteDetail = {
    FinishOrder: {
        mesa: number | string; 
        pedido_id: string; 
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetail, 'FinishOrder'>;

export default function FinishOrder() {
    // Hook do React Navigation para acessar os parâmetros da rota atual
    const route = useRoute<FinishOrderRouteProp>();
    // Hook para a navegação entre telas
    const navigation = useNavigation<NativeStackNavigationProp<StackList>>();

    // Função para finalizar o pedido
    async function handleFinish() {
        try {
            // Requisição PUT para a API para marcar o pedido como enviado/finalizado
            await api.put('/ordemPedido/send', {
                pedido_id: route.params?.pedido_id
            });

            // Após finalizar, navega de volta para a tela inicial/topo da pilha de navegação
            navigation.popToTop();

        } catch (error) {
            console.log('erro ao finalizar'); 
        }
    }

    // Renderização do componente
    return (
        <View style={styles.container}>

            {/* Mensagem alertando o usuário sobre a ação de finalização */}
            <Text style={styles.alert}>Você deseja finalizar o pedido?</Text>
            
            {/* Exibição do número da mesa */}
            <Text style={styles.title}>Mesa {route.params?.mesa}</Text>

            {/* Botão para acionar a função de finalização do pedido */}
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar Pedido</Text>
                <Feather name='shopping-cart' size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    );
}

// Estilização do componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    alert: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e',
    }
})