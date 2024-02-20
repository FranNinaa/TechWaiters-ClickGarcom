import { Request, Response} from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

// Define a classe CreateUserController para lidar com as requisições de criação de usuários.
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
