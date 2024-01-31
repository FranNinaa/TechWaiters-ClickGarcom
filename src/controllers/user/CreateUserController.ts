import { Request, Response, response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response){
    const {nome, email, password} = req.body;
    const createUserService = new CreateUserService();

   const user = await createUserService.execute({
        nome,
        email,
        password
   });
    return res.json(user);
  }
}

export { CreateUserController };
