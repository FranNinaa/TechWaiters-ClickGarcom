import prismaClient from "../../prisma";

// Declara a classe DetailUserService, que encapsula a lógica para recuperar detalhes de um usuário específico.
class DetailUserService {

    async execute(user_id: string) {

        //busca informações do usuario logado
        const user = await prismaClient.usuario.findFirst({
            where: {
                Id: user_id
            }, 
            select:{
                Id: true,
                Nome: true,
                Email: true
            }
        })
        return user;
    }
}

export { DetailUserService }