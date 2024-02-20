import prismaClient from "../../prisma";

// Define uma interface para garantir a tipagem correta dos dados de entrada do método execute.
// Isso ajuda a garantir que o serviço seja chamado com os dados corretos.
interface OrderRequest{
  pedido_id: string;
}
// Declara a classe FinishOrderService, que encapsula a lógica para finalizar (ou concluir) um pedido.
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