import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { Mesa, Nome } = req.body;

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            Mesa,
            Nome,
        });

        return res.json(order);
    }
}

export { CreateOrderController }