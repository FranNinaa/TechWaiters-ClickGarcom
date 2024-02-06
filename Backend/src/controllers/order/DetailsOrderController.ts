import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/order/DetailsOrderService";

class DetailsOrderController{
    async handle(req: Request, res: Response){
     
        const pedidoId = req.query.pedidoId as string;

        const detailsOrderService = new DetailsOrderService();

        const details = await detailsOrderService.execute({ 
            pedidoId 
        }); 
        return res.json(details);
    }
}

export { DetailsOrderController }