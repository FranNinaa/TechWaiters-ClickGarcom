import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuteUserController } from './controllers/user/AuteUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './services/category/AddItemController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from "./config/multer"


const router = Router();

//configuração para uploads imagens para a pasta tmp
const upload = multer(uploadConfig.upload("./tmp"));

//rotas usuario
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuteUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle)

//rotas de categoria
router.post('/category', new CreateCategoryController().handle);
router.get('/category', new ListCategoryController().handle);

//rotas produtos
router.post('/produtos', isAuthenticated,upload.single('file'), new CreateProductController().handle);
router.get('/categoria/produto', isAuthenticated, new ListByCategoryController().handle);

//rotas pedido
router.post('/pedido', isAuthenticated, new CreateOrderController().handle);
router.delete('/pedido', isAuthenticated, new RemoveOrderController().handle);
router.post('/ordemPedido/add'), isAuthenticated, new AddItemController().handle

export { router }