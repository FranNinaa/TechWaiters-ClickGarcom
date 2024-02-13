import React, { useState, useContext } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackList } from "../../routes/app.routes";
import { AuthContext } from "../../contexts/AuthContext";

import { api } from '../../services/api';



export default function Dashboard() {
    const { signOut } = useContext(AuthContext);
    //a variavel segue as props de NativeStackNavigationProp e diciona as props de StackList
    const navegation = useNavigation<NativeStackNavigationProp<StackList>>();

    const [mesa, setMesa] = useState('');

    async function abrirMesa() {
        //se Mesa estiver vazia, retorna
        if (mesa === "") {
            return;
        }

        const response = await api.post('/pedido', {
            Mesa: Number(mesa)
        })
        //se o usuario digita a mesa é direcionado para a tela Order
        navegation.navigate('Order', { mesa: mesa, pedido_id: response.data.Id });

        setMesa('');
    }

    return (
        <SafeAreaView style={styles.container}>

            <Image
                style={styles.logo}
                source={require("../../assets/Logo_sem_palavra.png")}          
            />

            <Text style={styles.title}>Novo Pedido</Text>

            <TextInput style={styles.input}
                placeholder="Numero da mesa"
                placeholderTextColor={"#fff"}
                keyboardType="numeric"
                value={mesa}
                onChangeText={setMesa}
            />

            <TouchableOpacity style={styles.button} onPress={abrirMesa}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signOut} onPress={signOut}>
                <Text style={styles.signOutText}>Sair</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );

}

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