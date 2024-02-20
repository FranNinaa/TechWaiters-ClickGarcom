import prismaClient from "../../prisma";

// Define uma interface para garantir a tipagem correta dos dados de entrada do método execute.
interface DetailsRequest {
    pedido_id: string;

}

// Declara a classe DetailsOrderService, que encapsula a lógica para recuperar os detalhes de um pedido específico.
class DetailsOrderService {
    async execute({ pedido_id }: DetailsRequest) {
        const pedidos = await prismaClient.itemPedido.findMany({
            where: {
                pedido_id: pedido_id
            },
            include: {
                produto: true,
                pedido: true
            }
        })
        
        return pedidos;

    }
}
export { DetailsOrderService }