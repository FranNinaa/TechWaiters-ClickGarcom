import prismaClient from "../../prisma";

// Define uma interface para tipar de forma segura os dados de entrada do método execute.
interface ItemRequest {
    item_id: string,
}

// Declara a classe RemoveItemService, que encapsula a lógica para remover um item de um pedido.
class RemoveItemService {
    async execute({ item_id }: ItemRequest) {

        const item = await prismaClient.itemPedido.delete({
            where: {
                Id: item_id,
            }
        });

        return item;
    }
}

export { RemoveItemService }