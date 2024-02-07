import { Request, Response } from 'express';
import { FinishOrderService } from '../../services/order/FinishOrderService';

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { pedidoId } = req.body;

    const finishOrderService = new FinishOrderService();

    const pedidos = await finishOrderService.execute({ 
        pedidoId 
    });

    return res.json(pedidos);
  }
}
export { FinishOrderController };

