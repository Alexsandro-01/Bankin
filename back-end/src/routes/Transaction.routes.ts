import { Router } from 'express';

import TransactionController from '../controllers/TransactionController';
import TransactionService from '../services/TransactionService';
import TransactionModel from '../models/TransactionModel';
import UserModel from '../models/UserModel';
import AccountModel from '../models/AccountModel';

const accountModel = new AccountModel();
const userModel = new UserModel(accountModel);
const model = new TransactionModel(accountModel);
const service = new TransactionService(model, userModel);
const controller = new TransactionController(service);

const transactionRoute = Router();

transactionRoute.post('/cash-out', controller.cashOut);

export default transactionRoute;