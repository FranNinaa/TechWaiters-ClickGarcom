import { Request, Response} from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response){
    const {Nome, Email, Password} = req.body;
    const createUserService = new CreateUserService();

   const user = await createUserService.execute({
        Nome,
        Email,
        Password
   });
    return res.json(user);
  }
}

export { CreateUserController };
