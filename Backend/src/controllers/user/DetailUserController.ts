import { Request, Response } from "express";
import { DetailUserService } from '../../services/user/DetailUserService'

// Define a classe DetailUserController para lidar com as requisições de detalhes do usuário.
class DetailUserController{
    async handle(req: Request, res: Response){

        //id do usuario logado
        const user_id = req.user_id;

        console.log("id do user " , user_id)

        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute(user_id);

        return res.json(user);

    }
}

export { DetailUserController }