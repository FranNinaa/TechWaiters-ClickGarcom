import {Router} from 'express';
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuteUserController } from './controllers/user/AuteUserController'

const router = Router();

//rotas usuario
router.post('/users', new CreateUserController().handle);

router.post('/login', new AuteUserController().handle);


export{router}