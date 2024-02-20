import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

// Define a classe ListByCategoryController para lidar com as requisições de listagem de produtos por categoria.
class ListByCategoryController {

    async handle(req: Request, res: Response) {
        const categoria_id = req.query.categoria_id as string;

        const listaProdutos = new ListByCategoryService();

        const produtos = await listaProdutos.execute({
            categoria_id
        });

        return res.json(produtos);
    }
}

export { ListByCategoryController }