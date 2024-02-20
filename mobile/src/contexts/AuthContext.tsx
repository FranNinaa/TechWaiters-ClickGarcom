import React, { useState, createContext, ReactNode, useEffect } from "react";

// Biblioteca para armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from "../services/api";

// Tipagem para os dados no contexto de autenticação
type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}
// Tipagem para os dados do usuário
type UserProps = {
    Id: string;
    Nome: string;
    Email: string;
    Token: string;
}

// Tipagem para as propriedades do AuthProvider
type AuthProviderProps = {
    children: ReactNode;
}

// Tipagem para as credenciais de login
type SignInProps = {
    Email: string;
    Password: string;
}

// Criação do contexto de autenticação
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        Id: '',
        Nome: '',
        Email: '',
        Token: '',

    });


    const [loadingAuth, setLoadingAth] = useState(false);
    const [loading, setLoading] = useState(true)
    const isAuthenticated = !!user.Nome;

    // Verifica a existência de dados do usuário ao iniciar o app
    useEffect(() => {

        async function getUser() {
            //Pegar os dados salvos do user
            const userInfo = await AsyncStorage.getItem('@token');

            //trasforma em objeto
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            //verifica se recebe as informações. Se for maior que 0 o usuario fez login
            if (Object.keys(hasUser).length > 0) {

                //api usa o token nas proximas requisições
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.Token}`

                setUser({
                    Id: hasUser.Id,
                    Nome: hasUser.Nome,
                    Email: hasUser.Email,
                    Token: hasUser.Token
                })
            }

            setLoading(false);
        }

        getUser();
    }, [])
 // Função para realizar o login
    async function signIn({ Email, Password }: SignInProps) {
        setLoadingAth(true);

        try {
            const response = await api.post('/login', {
                Email,
                Password
            })

            const data = {
                ...response.data
            }

            const { Id, Nome, Token } = response.data

            await AsyncStorage.setItem("@token", JSON.stringify(data))
            api.defaults.headers.common["Authorization"] = `Bearer ${Token}`

            setUser({
                Id,
                Nome,
                Email,
                Token
            })

            console.log('logado');
            setLoadingAth(false);

        } catch (error) {
            console.log('Erro ao logar');
            setLoadingAth(false)
        }

    }

    //desloga usuario limpando o AsyncStorage
    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    Id: '',
                    Nome: '',
                    Email: '',
                    Token: ''
                })
            })
    }
  // Provedor do contexto, disponibilizando estados e funções para a aplicação
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }} >
            {children}
        </ AuthContext.Provider>
    )
}