import { Router } from 'express';

import userController from './controllers/userController.js';
import fruitController from './controllers/fruitController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/fruits', fruitController);


export default routes;
