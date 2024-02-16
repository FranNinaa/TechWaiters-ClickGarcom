import prismaClient from "../../prisma";

interface PedidoRequest {
    pedido_id: string,
}

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