import {Router, Request, Response} from 'express'
import  {CreateUserController} from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';


const router = Router();

router.post('/users', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.get('/info',isAuthenticated, new DetailUserController().handle)

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

export {router};