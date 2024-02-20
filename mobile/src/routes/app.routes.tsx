// Importação do React e da função de criação de um stack navigator do React Navigation
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importação dos componentes das telas utilizadas nas rotas
import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

// Definição dos tipos para os parâmetros esperados em cada tela do navigator
export type StackList = {
    Dashboard: undefined;
    Order: {
        mesa: number | string;
        pedido_id: string;
    };
    FinishOrder: {
        mesa: number | string;
        pedido_id: string;
    };
}
// Criação do stack navigator com os tipos definidos acima
const Stack = createNativeStackNavigator<StackList>();

// Função que retorna o componente do navigator com as telas configuradas
function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />
            <Stack.Screen
                name="FinishOrder"
                component={FinishOrder}
                options={{
                    title: 'Finalizando',
                    headerStyle: {
                        backgroundColor: '#1d1d2e',
                    },
                    headerTintColor: '#FFF'
                }}
            />

        </Stack.Navigator>
    )

}

// Exportação das rotas para serem utilizadas na aplicação
export default AppRoutes;   