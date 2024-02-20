import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

// Define a classe AddItemController para lidar com as requisições de adição de itens a pedidos.
class AddItemController {
    async handle(req: Request, res: Response){
      const { pedido_id, produto_id, Quantidade, Observacao} = req.body;

        const addItem = new AddItemService();

// Executa o serviço de adição do item ao pedido com os dados fornecidos e aguarda a conclusão da operação.
        const ordemPedido = await addItem.execute({
            pedido_id,
            produto_id,
            Quantidade,
            Observacao
        })
        return res.json(ordemPedido);
    }
}
export {AddItemController}