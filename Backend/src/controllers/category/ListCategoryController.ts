import { Request, Response } from "express";
import { ListCategoryServices} from "../../services/category/ListCategoryServices";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const listCategoryServices = new ListCategoryServices();

    const category = await listCategoryServices.execute();

    return res.json(category);
  }
}
export { ListCategoryController };