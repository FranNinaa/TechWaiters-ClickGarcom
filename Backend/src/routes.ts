import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuteUserController } from './controllers/user/AuteUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrdersController';
import { DetailsOrderController } from './controllers/order/DetailsOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

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
router.post('/category',  new CreateCategoryController().handle);
router.get('/category',  new ListCategoryController().handle);

//rotas produtos
router.post('/produtos',  upload.single('file'), new CreateProductController().handle);
router.get('/categoria/produto', isAuthenticated, new ListByCategoryController().handle);

//rotas pedido
router.post('/pedido', isAuthenticated, new CreateOrderController().handle);
router.delete('/pedido', isAuthenticated, new RemoveOrderController().handle);
router.put('/ordemPedido/send', isAuthenticated, new SendOrderController().handle)
router.get('/pedidos', isAuthenticated, new ListOrderController().handle)
router.get('/detalhe/pedidos', isAuthenticated, new DetailsOrderController().handle)
router.put('/pedido/finalizado', isAuthenticated, new FinishOrderController().handle)

//rotas de item
router.post('/ordemPedido/add', isAuthenticated, new AddItemController().handle)
router.delete('/ordemPedido/remove', isAuthenticated, new RemoveItemController().handle)





export { router }