// Importações do Next.js e nookies para manipulação de cookies
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

/**
 * Função de verificação para páginas acessíveis apenas por visitantes (não autenticados).
 * @param fn - A função GetServerSideProps original que será executada caso o usuário não esteja autenticado.
 * @returns - Retorna a função GetServerSideProps modificada para incluir a verificação de autenticação.
 */
export function canSSRGuest<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    // Retorna uma nova função GetServerSideProps
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        // Analisa os cookies presentes no contexto da requisição
        const cookies = parseCookies(ctx);

        // Se o cookie de autenticação existir, redireciona o usuário para o dashboard
        if (cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: "/dashboard", 
                    permanent: false 
                }
            };
        }
        // Caso contrário, executa a função GetServerSideProps original passada como argumento
        return await fn(ctx);
    }
}
