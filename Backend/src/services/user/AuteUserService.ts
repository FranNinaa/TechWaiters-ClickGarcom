import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";

// Define uma interface para garantir a tipagem correta dos dados de entrada do método execute.
interface AuteRequest {
    Email: string;
    Password: string;
}

// Declara a classe AuteUserService, que encapsula a lógica de autenticação do usuário.
class AuteUserService {
    async execute({ Email, Password }: AuteRequest) {
        //verifica se o email existe
        const user = await prismaClient.usuario.findFirst({
            where: {
                Email
            }
        })
        if (!user) {
            throw new Error("Email/Password incorreto !!")
        }
        //verifica se a senha está correta
        const passwordMatch = await compare(Password, user.Password)

        if (!passwordMatch) {
            throw new Error("Email/Password incorreto !!")
            
        }

        //se ñ deu nenhum erro gerar um token ao usuario
       const token = sign(
        {
            Nome: user.Nome,
            Email: user.Email
        },
        process.env.JWT_SECRET,
        {
            subject: user.Id,
            expiresIn: '90d'
        }
       )

        return {
            Id: user.Id,
            Nome: user.Nome,
            Email: user.Email,
            Token: token
         }
    }
}
export { AuteUserService }