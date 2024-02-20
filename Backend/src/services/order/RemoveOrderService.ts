import prismaClient from "../../prisma";

// Define uma interface para garantir a tipagem correta dos dados de entrada do método execute.
interface PedidoRequest {
    pedido_id: string,
}

// Declara a classe RemoveOrderService, que encapsula a lógica para remover um pedido específico.
class RemoveOrderService {
    async execute({ pedido_id }: PedidoRequest) {

        const pedido = await prismaClient.pedido.delete({
            where: {
               Id: pedido_id,
            }
        })

        return pedido;
    }
}

export { RemoveOrderService }