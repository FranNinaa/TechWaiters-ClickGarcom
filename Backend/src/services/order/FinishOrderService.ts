import prismaClient from "../../prisma";

interface OrderRequest{
    pedidoId: string;
}

class FinishOrderService {
  async execute({pedidoId}: OrderRequest) {
    const pedidos = await prismaClient.pedido.update({
        where: {
            Id: pedidoId
        },
        data:{
            Status: true,
        }
    })
    return pedidos;
  }
}
export { FinishOrderService };