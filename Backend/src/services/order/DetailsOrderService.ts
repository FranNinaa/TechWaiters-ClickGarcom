import prismaClient from "../../prisma";

interface DetailsRequest {
    pedidoId: string;

}

class DetailsOrderService {
    async execute({ pedidoId}: DetailsRequest){
        const pedidos = await prismaClient.itemPedido.findMany({
            where: {
                pedido_id: pedidoId
            },
            include:{
                produto: true,
                pedido: true
            }
        })
        return pedidos;

    }
}
export { DetailsOrderService}