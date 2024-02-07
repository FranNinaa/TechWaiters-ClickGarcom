import { createContext, ReactNode, useState} from 'react'

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SiggnInProps) => Promise<void>;
    
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SiggnInProps = {
    email: string;
    password: string;
}
type AuthProviderProps = {
 children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({email, password}: SiggnInProps){
        console.log('login',email) 
        console.log('senha',password)
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
           {children}
        </AuthContext.Provider>
    )
}