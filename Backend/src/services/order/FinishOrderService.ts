import prismaClient from "../../prisma";

interface OrderRequest{
  pedido_id: string;
}

class FinishOrderService {
  async execute({pedido_id}: OrderRequest) {
    const pedidos = await prismaClient.pedido.update({
        where: {
            Id: pedido_id
        },
        data:{
            Status: true,
        }
    })
    return pedidos;
  }
}
export { FinishOrderService };