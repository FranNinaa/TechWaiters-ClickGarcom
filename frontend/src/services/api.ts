import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

import { signOut } from '../context/AuthContext'

export function setupAPIClient(ctx = undefined){
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3000',
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

    return Promise.reject(error);

  })

  return api;

}