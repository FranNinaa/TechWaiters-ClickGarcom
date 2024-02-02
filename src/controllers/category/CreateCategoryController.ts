import {Request, Response} from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response){
        const {Nome} = req.body;

        const createCategoryService = new CreateCategoryService();
         const category = await createCategoryService.execute({
            Nome
         });

         return res.json(category);
    }
}
export {CreateCategoryController}