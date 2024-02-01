import prismaClient from "../../prisma";
import { hash} from 'bcryptjs'

interface UserRequest {
    Nome: string;
    Email: string;
    Password: string;
}

class CreateUserService {
    async execute({ Nome, Email, Password }: UserRequest) {
        //verifica se mandou um email
        if (!Email) {
            throw new Error("Email incorreto");
        }

        //verifica se o email ja esta cadastrado na aplicação
        const userAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                Email: Email
            }
        })
        if (userAlreadyExists) {
            throw new Error("Email já cadastrado");
        }

        const passwordHash = await hash(Password, 8)

        const user = await prismaClient.usuario.create({
            data: {
                Nome: Nome,
                Email: Email,
                Password: passwordHash,
            },
            select: {
               Id: true,
                Nome: true,
                Email: true, 
            }
        })

        return { user}
    }
}
export { CreateUserService }