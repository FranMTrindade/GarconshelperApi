import {Router} from 'express'
import multer from 'multer';
import  {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductsController } from './controllers/product/CreateProductcontroller';
import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post('/users', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.get('/info',isAuthenticated, new DetailUserController().handle)

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductsController().handle)



export {router};