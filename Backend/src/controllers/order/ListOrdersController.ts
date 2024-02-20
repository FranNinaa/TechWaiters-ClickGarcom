import { Request, Response } from "express";
import { ListOrderServices } from  '../../services/order/ListOrderServices'

// Define a classe ListOrderController para lidar com as requisições de listagem de pedidos.
class ListOrderController{
    async handle(req: Request, res: Response){
        const listOrder = new ListOrderServices();

        const pedidos = await listOrder.execute();
        
        return res.json(pedidos);

    }
}
export { ListOrderController }