import prismaClient from "../../prisma";

interface DetailsRequest {
    pedido_id: string;

}

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
        console.log(pedidos)
        return pedidos;

    }
}
export { DetailsOrderService }