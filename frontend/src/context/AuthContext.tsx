import { createContext, ReactNode, useState, useEffect} from 'react'
import {api} from '../services/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify';
import Router from 'next/router';

// Tipagens para contexto de autenticação, usuários e propriedades de autenticação
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

// Criação do contexto de autenticação
export const AuthContext = createContext({} as AuthContextData)

// Função para deslogar o usuário
export function signOut () {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        toast.error('Erro ao deslogar!!')
    }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

// Efeito para verificar a existência de um token e autenticar o usuário automaticamente
    useEffect(() => {
        const {'@nextauth.token': token} = parseCookies()

        if(token){
            api.get('/me').then(response => {
                const {Id, Nome, Email} = response.data;
                setUser({
                    Id, 
                    Nome, 
                    Email
                })
            }).catch(() => {
                signOut()
            })
        }
    }, [])

  // Função para realizar login
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
                maxAge: 60 * 60 * 24 * 30, // Define o cookie para expirar em 1 mês
                path: '/'
            })

            setUser({
                Id,
                Nome,
                Email
            })

            //passar para proximas requisição o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            toast.success("Logado com sucesso!")
            
            //redirecionar o usuario para a pagina de dashboard
            Router.push('/dashboard')
            

        } catch (error) {
            if (error instanceof Error) {
                toast.error("Erro ao logar")
                console.log('Erro ao logar na aplicação!! Mensagem do erro: ' + error.message);
            } else {
                toast.error("Erro ao logar")
                console.log('Erro ao logar na aplicação!! Erro desconhecido.');
            }
        }

    }
// Função para registrar um novo usuário
    async function signUp({Nome, Email, Password}:SignUpProps) {
        try {
            const response = await api.post('/users',{
                Nome,
                Email,
                Password
            })

            Router.push('/')

        } catch (error) {
            toast.error("Erro ao cadastrar");
            //console.log("erro ao cadastrar", error)
        }
    }
// Provedor do contexto de autenticação envolvendo os elementos filhos
    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp }}>
           {children}
        </AuthContext.Provider>
    )
}