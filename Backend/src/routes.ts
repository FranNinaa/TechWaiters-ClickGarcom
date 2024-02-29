import { Router } from 'express';
import multer from 'multer';

// Importa os controladores de usuários.
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuteUserController } from './controllers/user/AuteUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

// Importa os controladores de categorias.
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

// Importa o controlador de listagem de produtos por categoria.
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

// Importa o controlador de criação de produtos.
import { CreateProductController } from './controllers/product/CreateProductController';

// Importa os controladores de itens.
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';

// Importa os controladores de order.
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrdersController';
import { DetailsOrderController } from './controllers/order/DetailsOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticated';

// Configuração do multer para uploads de imagens para a pasta tmp.
import uploadConfig from "./config/multer"

const router = Router();

//configuração para uploads imagens para a pasta tmp
const upload = multer(uploadConfig.upload("./tmp"));

//rotas usuario
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuteUserController().handle);
router.get('/me', new DetailUserController().handle)

//rotas de categoria
router.post('/category',  new CreateCategoryController().handle);
router.get('/category',  new ListCategoryController().handle);

//rotas produtos
router.post('/produtos',  upload.single('file'), new CreateProductController().handle);
router.get('/categoria/produto', new ListByCategoryController().handle);

//rotas pedido
router.post('/pedido', new CreateOrderController().handle);
router.delete('/pedido',new RemoveOrderController().handle);
router.put('/ordemPedido/send', new SendOrderController().handle)
router.get('/pedidos', new ListOrderController().handle)
router.get('/detalhe/pedidos', new DetailsOrderController().handle)
router.put('/pedido/finalizado', new FinishOrderController().handle)

//rotas de item
router.post('/ordemPedido/add', new AddItemController().handle)
router.delete('/ordemPedido/remove', new RemoveItemController().handle)



// Exporta o router configurado para ser utilizado no arquivo principal da aplicação.
export { router }