// Importação dos tipos necessários do Express e da função `verify` do pacote `jsonwebtoken` para validação do token.
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

// Definição de uma interface para tipar o payload do token JWT, que contém o subject (sub) do token.
interface Payload {
    sub: string;
}

// Definição da função `isAuthenticated`, que será usada como middleware nas rotas que requerem autenticação.
export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
   // Tenta recuperar o token JWT do cabeçalho `Authorization` da requisição.
   const authToken = req.headers.authorization;

    // Verifica se o token foi fornecido. Caso contrário, retorna um erro 401 (Não Autorizado).
    if (!authToken) {
        return res.status(401).end();
    }

     // Extrai o token do cabeçalho `Authorization`. O token geralmente vem no formato "Bearer <token>", por isso é feito o split e pegamos a segunda parte.
     const [, token] = authToken.split(" ");

    
     try {
        // Tenta verificar e decodificar o token usando a chave secreta do JWT.
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        //console.log(sub) teste para ver se ta retornando o id do usuario
        //Recupera o id do usuário do token e o adiciona ao objeto `req` para que as rotas subsequentes possam acessá-lo.
        req.user_id = sub;
    
         return next();

       

    } catch (error) {
        // Em caso de falha na verificação do token, retorna um erro 401 (Não Autorizado).
        return res.status(401).end();
    }
}
