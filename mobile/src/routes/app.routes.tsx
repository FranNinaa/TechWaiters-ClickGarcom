import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

export type StackList = {
    Dashboard: undefined;
    Order: {
        mesa: number | string;
        pedido_id: string;
    };
}

const Stack = createNativeStackNavigator<StackList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />

        </Stack.Navigator>
    )

}
export default AppRoutes;   