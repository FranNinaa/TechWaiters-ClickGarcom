import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuteRequest {
    Email: string;
    Password: string;
}

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
        

        return { ok: true }
    }
}
export { AuteUserService }