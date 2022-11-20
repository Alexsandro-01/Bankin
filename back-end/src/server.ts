import express, {Application} from 'express';
import 'express-async-errors';
import errorMidlleware from './middlewares/ErrorMiddleware';

import userRoute from './routes/user.routes';
import transactionRoute from './routes/Transaction.routes';

const api: Application = express();

api.use(express.json());

api.use('/users', userRoute);
api.use('/transactions', transactionRoute);

api.use(errorMidlleware);

export default api;