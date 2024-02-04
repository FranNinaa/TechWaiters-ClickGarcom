import prismaClient from "../../prisma";

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