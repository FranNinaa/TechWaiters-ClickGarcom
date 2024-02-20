import { Request, Response } from "express";
import { DetailsOrderService } from "../../services/order/DetailsOrderService";

// Define a classe DetailsOrderController para lidar com requisições relacionadas aos detalhes do pedido.
class DetailsOrderController{
    async handle(req: Request, res: Response){
     
        const  pedido_id = req.query.pedido_id as string;

        const detailsOrderService = new DetailsOrderService();

        const details = await detailsOrderService.execute({ 
            pedido_id 
        }); 
        return res.json(details);
    }
}

export { DetailsOrderController }