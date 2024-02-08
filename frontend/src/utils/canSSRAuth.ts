import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

// Função que verifica se o usuário está logado
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        // Se o usuário não estiver logado, redireciona para a página de login
        if(!token){
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            };
        }

        try {
            return await fn(ctx);
        } catch (error) {
            if(error instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token');

                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                };
            }

            // Retorna uma resposta genérica ou lança um erro
            return {
                notFound: true 
            };
        }   
    }
}
