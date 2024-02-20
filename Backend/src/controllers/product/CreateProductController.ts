import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

// Define a classe CreateProductController para lidar com as requisições de criação de produtos.
class CreateProductController {
    async handle(req: Request, res: Response) {

        const { Nome, Descricao, Preco, categoria_id } = req.body;

        if (!req.file) {
            throw new Error("error upload file")
        } else {

            const { originalname, filename: Banner } = req.file;


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
}

export { CreateProductController }