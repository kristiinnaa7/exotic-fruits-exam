import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes.js';
 import { authMiddleware } from './middlewares/authMiddleware.js';

try {
    await mongoose.connect('mongodb://localhost:27017', { dbName: 'exotic-fruits' });
    console.log('DB Connected!');

    
} catch (err) {
    console.log('Cannot connect to DB!');
}

const app = express();

app.use(express.json());
app.use(cors());
app.use(authMiddleware);

app.use(routes);

app.listen(3030, () => console.log('Server is listening on http://localhost:3030'));


