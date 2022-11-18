import express from 'express';
import 'express-async-errors';
import errorMidlleware from './middlewares/ErrorMiddleware';

import userRoute from './routes/user.routes';

const api = express();

api.use(express.json());

api.use('/users', userRoute);

api.use(errorMidlleware);

export default api;