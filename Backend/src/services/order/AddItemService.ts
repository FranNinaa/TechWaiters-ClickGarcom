import prismaClient from "../../prisma";

interface ItemRequest{
    pedido_id: string;
    produto_id: string;
    Quantidade: number;
    Observacao: string;
}

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