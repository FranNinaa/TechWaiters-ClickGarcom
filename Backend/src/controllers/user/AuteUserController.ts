import { Request, Response } from 'express';
import { AuteUserService } from '../../services/user/AuteUserService';

// Define a classe AuteUserController para lidar com as requisições de autenticação de usuários.
class AuteUserController{
    async handle(req: Request, res: Response){
        const {Email, Password} = req.body
       
        const auteUserService = new AuteUserService()

        const autenticate = await auteUserService.execute({
            Email, 
            Password
        })
        return res.json(autenticate)
    }
   
}

export { AuteUserController}