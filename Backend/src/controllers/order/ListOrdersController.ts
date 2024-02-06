import { Request, Response } from "express";
import { ListOrderServices } from  '../../services/order/ListOrderServices'

class ListOrderController{
    async handle(req: Request, res: Response){
        const listOrder = new ListOrderServices();

        const pedidos = await listOrder.execute();
        
        return res.json(pedidos);

    }
}
export { ListOrderController }