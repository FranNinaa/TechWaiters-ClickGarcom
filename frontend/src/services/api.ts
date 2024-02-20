// Importa o axios e tipos relevantes, além de funções/utilitários do Next.js e do próprio sistema
import axios, { AxiosError, AxiosInstance  } from 'axios'
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOut } from '../context/AuthContext'  // Função para deslogar o usuário


// Função para configurar um cliente API com Axios, opcionalmente recebendo o contexto do lado do servidor
export function setupAPIClient(ctx?: GetServerSidePropsContext): AxiosInstance {
  let cookies = parseCookies(ctx);

// Cria uma instância do Axios com configurações base, incluindo a URL base da API e o token de autenticação
  const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, 
    (error: AxiosError) => {
    // Verifica se 'response' existe no objeto de erro antes de tentar acessar 'status'
    if(error.response && error.response.status === 401){
      // qualquer erro 401 (nao autorizado) devemos deslogar o usuario
      if(typeof window !== undefined){
        // Chamar a funçao para deslogar o usuario
        signOut();
        
      }else{
        return Promise.reject(new AuthTokenError())
      }
    }       
 // Retorna a instância do Axios configurada
    return Promise.reject(error);

  })

  return api;

}