import prismaClient from "../../prisma";

class ListOrderServices {
  async execute() {
    const pedidos = await prismaClient.pedido.findMany({
        where: {
            Rascunho: false,
            Status: false
        },
        orderBy: {
            created_at: 'desc'
        }
    })
    console.log(pedidos,"teste");
    return pedidos;
    
  }
}
export { ListOrderServices };