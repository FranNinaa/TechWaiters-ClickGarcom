// Importações necessárias do React e React Native, bem como o contexto de autenticação
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/AuthContext"

// Acessa a função signIn e o estado loadingAuth do contexto de autenticação
export default function SingIn() {
    const { signIn, loadingAuth } = useContext(AuthContext)

// Estados locais para armazenar o email e a senha digitados pelo usuário
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    // Função chamada ao pressionar o botão de login
    async function handleLogin() {
        if ((Email === '') || (Password === '')) {
            return
        }

        await signIn({ Email, Password })
    }

    return (
        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Digite seu email"
                    style={styles.input}
                    placeholderTextColor={"#f0f0f0"}
                    value={Email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    placeholderTextColor={"#f0f0f0"}
                    secureTextEntry={true}
                    value={Password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {/*na interface se for verdadeiro mostra a bolinha do carregando no botão */}
                    {loadingAuth ?
                        (<ActivityIndicator size={25} color={"#fff"} />)
                        :
                        (<Text style={styles.buttonText}>Acessar</Text>)
                    }

                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#101026"
    },
    logo: {
        marginBottom: 18,
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 6,
        borderColor: "#8A8A8A",
        borderWidth: 1,
        paddingHorizontal: 8,
        color: "#fff"
    },
    button: {
        width: "95%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }

})