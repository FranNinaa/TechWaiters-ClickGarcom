import {Request, Response} from 'express';
import {SendOrderService} from '../../services/order/SendOrderService';

class SendOrderController{
    async handle(req: Request, res: Response){
        const {pedido_id} = req.body;

        const sendOrder = new SendOrderService();
        const ordemPedido = await sendOrder.execute({
            pedido_id
        });

        return res.json(ordemPedido);
    }
}
export {SendOrderController}