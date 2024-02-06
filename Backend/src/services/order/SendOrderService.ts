import prismaClient from "../../prisma";

interface OrderRequest{
    pedido_id: string;
}

class SendOrderService{
    async execute({pedido_id}: OrderRequest){
        const ordemPedido = await prismaClient.pedido.update({
            where: {
                Id: pedido_id
            },
            data: {
                Rascunho: false
            }
        })
        return ordemPedido;

    }
}
export {SendOrderService}