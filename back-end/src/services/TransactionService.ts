import Transactions from '../database/models/Transactions';
import ValidationError from '../errors/ValidationErros';
import {
  IQueryParam,
  ITransactionPayload,
  querySchema,
  transactionSchema
} from '../interfaces/ITransaction';
import ITransactionModel from '../interfaces/ITransactionModel';
import ITransactionService from '../interfaces/ITransactionService';
import { userWithAccount } from '../interfaces/IUser';
import IUserModel from '../interfaces/IUserModel';
import { verifyToken } from './validations/login';

class TransactionService implements ITransactionService {
  private _model;
  private _userModel;
  constructor(model: ITransactionModel, userModel: IUserModel) {
    this._model = model;
    this._userModel = userModel;
  }

  validatePayloadCashOut = (payload: ITransactionPayload): ITransactionPayload => {
    const parsedPayload = transactionSchema.safeParse(payload);

    if (!parsedPayload.success) {
      throw parsedPayload.error;
    }

    return parsedPayload.data;
  };

  validateCashInAndCashOutUsers = async (cashInUser: string, cashOutUser: string) => {
    const dataCashInUser = await this
      ._userModel.readOneWithAccount(cashInUser);

    const dataCashOutUser = await this
      ._userModel.readOneWithAccount(cashOutUser);

    if (!dataCashInUser) {
      ValidationError.NotFoundError(`Username ${cashInUser} not found`);
    }

    if (!dataCashOutUser) {
      ValidationError.Unauthorized('Invalid username or password');
    }

    return {
      creditedUser: dataCashInUser,
      debitedUser: dataCashOutUser
    };
  };

  transaction = async (
    debitedUser: userWithAccount,
    creditedUser: userWithAccount,
    valueTransaction: number
  ) => {

    const data = {
        debitedAccountId: debitedUser.accountId,
        creditedAccountId: creditedUser.accountId,
        valueTransaction,
        newCashOutUserbalance: Number(debitedUser.Account.balance) - valueTransaction,
        newCashInUserBalance: Number(creditedUser.Account.balance) + valueTransaction
      };
    
    const response = await this._model.cashOutTransaction(data);

    return response;
  };

  cashOut = async (
    payload: ITransactionPayload, token: string
    ): Promise<Transactions | undefined> => {
    const data = this.validatePayloadCashOut(payload);

    const dataUser = await verifyToken(token);

    const { 
      creditedUser, debitedUser } = await this.validateCashInAndCashOutUsers(
      data.cashInUsername,  dataUser?.username as string
    );
    
    const cashOutUserBalance = Number(debitedUser?.Account.balance);
    
    if (cashOutUserBalance < payload.value) {
      ValidationError.BadRequest('You doe\'nt have enough balance');
    }

    const response = await this.transaction(
      debitedUser as userWithAccount,
      creditedUser as userWithAccount,
      payload.value
    );

    return response;
  };

  filterTransactions = async (query: IQueryParam, userId: number) => {
    const date = query.date ? query.date : '';

    if (query.filter === 'all') {
      const transactions = await this._model.readAllTransactions(userId, date);

      return transactions;
    }

    if (query.filter === 'cash-in') {
      const transaction = await this._model.readByTypeTransactions(
        { creditedAccountId: userId }, date
      );

      return transaction;
    }

    if (query.filter === 'cash-out') {
      const transaction = await this._model.readByTypeTransactions(
        { debitedAccountId: userId }, date
      );

      return transaction;
    }

  };

  validateQuery = (query: IQueryParam) => {

    if (query.date !== undefined && isNaN(Date.parse(query.date))) {
      ValidationError.BadRequest(`${query.date} must be a valid Date and format "yyyy-mm-dd"`);
    }

    const parsedQuery = querySchema.safeParse(query);

    if (!parsedQuery.success) {
      throw parsedQuery.error;
    }

    return parsedQuery;
  };

  readTransactions = async (query: unknown, token: string) => {
    const dataUser  = await verifyToken(token);

    const parsedQuery = this.validateQuery(query as IQueryParam);

    const user = await this._userModel.readOne(dataUser?.username);

    if (!user) ValidationError.Unauthorized('Invalid username or password');

    const transactions = await this.filterTransactions(parsedQuery.data, user?.id as number);

    return transactions;
  };
}

export default TransactionService;

/**
 * querys busca transações
 *
 * all -> retorna todas
 * { debitedAccountId: userId } cash-out
 * { creditedAccountId: userId } cash-in
 * { "createdAt": "2022-11-20T10:46:15.019Z" } por data
 *
 */