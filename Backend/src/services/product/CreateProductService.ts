import prismaClient from "../../prisma";


// Define uma interface para garantir a digitação correta dos dados de entrada para o método de execução do serviço.
// Isso ajuda a manter a integridade e consistência dos dados que estão sendo passados ​​para a função
interface ProductRequest{
    Nome: string,
    Descricao: string,
    Preco: string,
    Banner: string,
    categoria_id: string
}
// Declara a classe CreateProductService, que encapsula a lógica para criar um novo produto.
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