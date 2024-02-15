import { Request, Response } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { pedido_id } = req.body;

    const finishOrderService = new FinishOrderService();

    const pedidos = await finishOrderService.execute({ 
      pedido_id 
    });

    return res.json(pedidos);
  }
}
export { FinishOrderController };

