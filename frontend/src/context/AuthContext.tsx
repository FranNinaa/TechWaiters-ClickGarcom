import { createContext, ReactNode, useState} from 'react'
import {api} from '../services/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void
    signUp:(credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    Id: string;
    Nome: string;
    Email: string;
}

type SignInProps = {
    Email: string;
    Password: string;
}

type SignUpProps = {
    Nome: string;
    Email: string;
    Password: string
}

type AuthProviderProps = {
 children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut () {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('Erro ao deslogar!!')
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({Email, Password}: SignInProps){
        try {
            const response = await api.post('/login',{
                Email,
                Password
            
            })
            //console.log(response.data)

            const {Id, Nome, token} = response.data;

            //gerar cookies
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 1 mes
                path: '/'
            })

            setUser({
                Id,
                Nome,
                Email
            })

            //passar para proximas requisição o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //redirecionar o usuario para a pagina de dashboard
            Router.push('/dashboard')
            

        } catch (error) {
            if (error instanceof Error) {
                console.log('Erro ao logar na aplicação!! Mensagem do erro: ' + error.message);
            } else {
                console.log('Erro ao logar na aplicação!! Erro desconhecido.');
            }
        }





    }

    async function signUp({Nome, Email, Password}:SignUpProps) {
        try {
            const response = await api.post('/users',{
                Nome,
                Email,
                Password
            })

            Router.push('/')

        } catch (error) {
            console.log("erro ao cadastrar", error)
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp }}>
           {children}
        </AuthContext.Provider>
    )
}