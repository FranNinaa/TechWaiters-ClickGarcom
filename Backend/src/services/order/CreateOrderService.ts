import prismaClient from "../../prisma";

interface OrderRequest{
    Mesa: number,
    Nome: string,
}
class CreateOrderService {
    async execute({Mesa, Nome}: OrderRequest) {

        const pedido = await prismaClient.pedido.create({
            data:{
                Mesa: Mesa,
                Nome: Nome,
            }
        })

        console.log(pedido)

        return pedido;
    }
}

export { CreateOrderService }