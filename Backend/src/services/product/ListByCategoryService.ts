import prismaClient from "../../prisma";

interface ProductRequest {
    categoria_id: string
}

class ListByCategoryService {
    async execute({ categoria_id }: ProductRequest) {
        const findByCategory = await prismaClient.produto.findMany({
            where: {
                categoria_id: categoria_id
            }
        })

        return findByCategory
    }
}

export { ListByCategoryService }