import prismaClient from "../../prisma";

interface ProductRequest{
    Nome: string,
    Descricao: string,
    Preco: string,
    Banner: string,
    categoria_id: string
}

class CreateProductService {
    async execute({Nome, Descricao, Preco, Banner, categoria_id}: ProductRequest) {

        const product = await prismaClient.produto.create({
            data: {
                Nome: Nome,
                Descricao: Descricao,
                Preco: Preco,
                Banner: Banner,
                categoria_id: categoria_id,
            }
        })

        return product
    }
}

export { CreateProductService }