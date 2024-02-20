// Importação do React e da função para criar um stack navigator do React Navigation
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importação da tela de SignIn
import SignIn from "../pages/SignIn"; // Corrigido o nome do import para corresponder à convenção de nomenclatura

// Criação de uma instância do stack navigator
const Stack = createNativeStackNavigator();

// Função que retorna o componente do navigator com a tela de SignIn configurada
function AuthRoutes() {
    return (
        // Configuração do stack navigator
        <Stack.Navigator>
            {/* Definição da tela de SignIn, com o header ocultado para um visual mais limpo */}
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

// Exportação das rotas de autenticação para uso na aplicação
export default AuthRoutes;
