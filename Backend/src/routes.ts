import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuteUserController } from './controllers/user/AuteUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

//rotas usuario
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuteUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle)

//rotas de categoria
router.post('/category', new CreateCategoryController().handle);
router.get('/category', new ListCategoryController().handle);

//rotas produtos
router.post('/produtos', isAuthenticated, new CreateProductController().handle);
router.get('/categoria/produto', isAuthenticated, new ListByCategoryController().handle);



export { router }