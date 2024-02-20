import prismaClient from "../../prisma";

// Define uma interface para garantir a tipagem correta dos dados de entrada do método execute.
interface ItemRequest{
    pedido_id: string;
    produto_id: string;
    Quantidade: number;
    Observacao: string;
}
// Declara a classe AddItemService, que encapsula a lógica para adicionar um novo item a um pedido.
class AddItemService{
    async execute({pedido_id, produto_id, Quantidade, Observacao}: ItemRequest){

        const ordemPedido = await prismaClient.itemPedido.create({
            data: {
                pedido_id: pedido_id,
                produto_id: produto_id,
                Quantidade: Quantidade,
                Observacao: Observacao,
            }
        })

        return ordemPedido;
    }
}
export {AddItemService}