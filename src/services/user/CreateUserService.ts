import prismaClient from "../../prisma";

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

        const user = await prismaClient.usuario.create({
            data: {
                Nome: Nome,
                Email: Email,
                Password: Password
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