import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(req: Request, res: Response) {

        const { Nome, Descricao, Preco, categoria_id } = req.body;

        let Banner = '';

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            Nome,
            Descricao,
            Preco,
            Banner,
            categoria_id
        });

        return res.json(product);
    }




}


export { CreateProductController }