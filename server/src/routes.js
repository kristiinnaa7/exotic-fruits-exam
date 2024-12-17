import { Router } from 'express';

import userController from './controllers/userController.js';
import fruitController from './controllers/fruitController.js';
import recipeController from './controllers/recipeController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/fruits', fruitController);
routes.use('/recipes', recipeController)


export default routes;
