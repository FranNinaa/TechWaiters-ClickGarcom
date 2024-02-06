import prismaClient from "../../prisma";

interface ItemRequest {
    item_id: string,
}

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