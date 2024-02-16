import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController {
    async handle(req: Request, res: Response) {

        const pedido_id = req.query.pedido_id as string;

        const removeOrder = new RemoveOrderService();

        const pedido = removeOrder.execute({
            pedido_id
        });

        return res.json(pedido);

    }
}

export { RemoveOrderController }