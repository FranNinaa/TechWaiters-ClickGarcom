import prismaClient from "../../prisma";

// Define uma interface para tipar os dados de entrada do serviço, garantindo que os dados necessários sejam fornecidos.
interface OrderRequest{
    Mesa: number,
    Nome: string,
}

// Declara a classe CreateOrderService, responsável pela criação de pedidos no sistema.
class CreateOrderService {
    async execute({Mesa, Nome}: OrderRequest) {

        const pedido = await prismaClient.pedido.create({
            data:{
                Mesa: Mesa,
                Nome: Nome,
            }
        })

        console.log(pedido)

        return pedido;
    }
}

export { CreateOrderService }