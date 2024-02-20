// Importações necessárias do Next.js e nookies para manipulação de cookies
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError"; // Erro customizado para problemas com o token de autenticação

/**
 // Função para adicionar verificação de autenticação em páginas SSR.
 * @param fn A função GetServerSideProps original que precisa de autenticação.
 * @returns Uma nova função GetServerSideProps com a verificação de autenticação.
 */

export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        // Parse dos cookies para verificar se existe um token de autenticação
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        // Se não houver token, redireciona para a página de login
        if(!token){
            return {
                redirect: {
                    destination: "/", 
                    permanent: false 
                }
            };
        }

        try {
            // Tenta executar a função GetServerSideProps original
            return await fn(ctx);
        } catch (error) {
            // Caso um erro de token de autenticação seja capturado
            if(error instanceof AuthTokenError){
                // Destrói o cookie do token para "deslogar" o usuário
                destroyCookie(ctx, '@nextauth.token');

                // Redireciona para a página de login
                return {
                    redirect: {
                        destination: "/", 
                        permanent: false 
                    }
                };
            }

            // Para outros tipos de erro, retorna uma página de erro genérica (404)
            return {
                notFound: true 
            };
        }   
    }
}
