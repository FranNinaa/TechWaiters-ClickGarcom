import React, { useState, useContext } from "react";
// Importação de componentes do React Native e ferramentas de navegação
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackList } from "../../routes/app.routes";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from '../../services/api';

export default function Dashboard() {
    // Utiliza o contexto de autenticação para acessar a função de logout
    const { signOut } = useContext(AuthContext);
    // Configuração da navegação com tipagem para auto-sugestão das rotas
    const navigation = useNavigation<NativeStackNavigationProp<StackList>>();

    // Estado para gerenciar o número da mesa inserido pelo usuário
    const [mesa, setMesa] = useState('');

    // Função para abrir uma nova mesa e navegar para a tela de pedido
    async function abrirMesa() {
        if (mesa === "") { 
            return;
        }

        // Cria um novo pedido associado ao número da mesa
        const response = await api.post('/pedido', { Mesa: Number(mesa) });
        // Navega para a tela de pedido com os parâmetros necessários
        navigation.navigate('Order', { mesa: mesa, pedido_id: response.data.Id });

        // Reseta o estado da mesa após o pedido ser criado
        setMesa('');
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Logo e título da tela */}
            <Image style={styles.logo} source={require("../../assets/Logo_sem_palavra.png")}/>
            <Text style={styles.title}>Novo Pedido</Text>

            {/* Campo de entrada para o número da mesa */}
            <TextInput style={styles.input}
                placeholder="Numero da mesa"
                placeholderTextColor={"#fff"}
                keyboardType="numeric"
                value={mesa}
                onChangeText={setMesa}
            />

            {/* Botão para abrir a mesa e iniciar um novo pedido */}
            <TouchableOpacity style={styles.button} onPress={abrirMesa}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>

            {/* Botão de logout */}
            <TouchableOpacity style={styles.signOut} onPress={signOut}>
                <Text style={styles.signOutText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Estilos utilizados no componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "#101026",
    },
    logo: {
        marginBottom: 18,
        width: 70,
        height: 70
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        margin: 24,
    },
    input: {
        width: "90%",
        height: 45,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 6,
        borderColor: "#8A8A8A",
        borderWidth: 1,
        paddingHorizontal: 8,
        color: "#8A8A8A",
    },
    button: {
        width: "90%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 10,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonText: {
        fontSize: 18,
        color: "#101026",
        fontWeight: "bold"

    },
    signOut: {
        width: "90%",
        height: 40,
        backgroundColor: "#272742",
        borderRadius: 10,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: 35,
    },
    signOutText: {
        fontSize: 18,
        color: "#5D5D7B",
        fontWeight: "bold"
    }
})