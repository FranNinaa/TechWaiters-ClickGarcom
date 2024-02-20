import prismaClient from "../../prisma";

// Define uma interface para garantir a tipagem correta dos dados de entrada do método execute.
interface ProductRequest {
    categoria_id: string
}
// Declara a classe ListByCategoryService, que encapsula a lógica para listar produtos por categoria.
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