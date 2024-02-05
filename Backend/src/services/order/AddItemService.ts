import prismaClient from "../../prisma";

interface ItemRequest{
    pedido_id: string;
    produto_id: string;
    quantidade: number;
}

class AddItemService{
    async execute({pedido_id, produto_id, quantidade}: ItemRequest){

        const ordemPedido = await prismaClient.itemPedido.create({
            data: {
                pedido_id: pedido_id,
                produto_id: produto_id,
                Quantidade: quantidade
            }
        })

        return ordemPedido;
    }
}
export {AddItemService}