import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from "../pages/SignIn";

const Stack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SingIn" component={SingIn} options={{ headerShown: false}}/>
        </Stack.Navigator>
    )

}
export default AuthRoutes;