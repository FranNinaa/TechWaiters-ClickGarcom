import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

// Importa as rotas da aplicação para usuários autenticados
import AppRoutes from "./app.routes"; 

 // Importa as rotas da aplicação para usuários não autenticados
import AuthRoutes from "./auth.routes";

 // Importa o contexto de autenticação
import { AuthContext } from "../contexts/AuthContext";


 // Obtém informações de autenticação do contexto
function Routes() {
    const { isAuthenticated, loading } = useContext(AuthContext);

     // Se estiver carregando, exibe um indicador de atividade
    if (loading) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#101026",
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <ActivityIndicator size={60} color={"#FFF"} />
            </View>
        )
    }
    return (
        // Renderiza AppRoutes se o usuário estiver autenticado, caso contrário, renderiza AuthRoutes
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
}
export default Routes;
