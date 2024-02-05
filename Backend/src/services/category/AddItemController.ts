import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
    async handle(req: Request, res: Response){
      const { pedido_id, produto_id, quantidade} = req.body;

        const addItem = new AddItemService();

        const ordemPedido = await addItem.execute({
            pedido_id,
            produto_id,
            quantidade
        })
        return res.json(ordemPedido);
    }
}
export {AddItemController}