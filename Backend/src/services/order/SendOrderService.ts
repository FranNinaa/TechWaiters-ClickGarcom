import prismaClient from "../../prisma";

// Define uma interface para assegurar a tipagem correta dos dados de entrada do método execute.
interface OrderRequest{
    pedido_id: string; // ID do pedido a ser atualizado.
}

// Declara a classe SendOrderService, encapsulando a lógica para marcar um pedido como não rascunho.
class SendOrderService{
    async execute({pedido_id}: OrderRequest){
        const ordemPedido = await prismaClient.pedido.update({
            where: {
                Id: pedido_id 
            },
            data: {
                Rascunho: false // Atualiza o campo Rascunho do pedido para false, indicando que não é mais um rascunho.
            }
        })
        // Retorna os detalhes do pedido atualizado.
        return ordemPedido;
    }
}

export {SendOrderService}
