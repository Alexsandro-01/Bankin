import Transactions from '../database/models/Transactions';
import { ITransaction } from '../interfaces/ITransaction';
import IAccountModel from '../interfaces/IAccountModel';
import ValidationError from '../errors/ValidationErros';
import ITransactionModel from '../interfaces/ITransactionModel';
import { Op } from 'sequelize';

class TransactionModel implements ITransactionModel{
  private _accountModel;
  constructor(account: IAccountModel) {
    this._accountModel = account;
  }

  create = async (payload: ITransaction) => {
    const transaction = await Transactions.create({
      debitedAccountId: payload.debitedAccountId,
      creditedAccountId: payload.creditedAccountId,
      value: payload.valueTransaction
    });

    return transaction;
  };

  cashInTransaction = async (payload: ITransaction) => {
    const cashIn = await this._accountModel.update(
      {
        newBalance: payload.newCashInUserBalance,
        id: payload.creditedAccountId
      }
    );

    if (cashIn) {
      const transaction = await this.create(payload);
      
      return transaction;
    }
  };

  cashOutTransaction = async (payload: ITransaction): Promise<Transactions | undefined> => {
    try {
      const cashOut = await this._accountModel.update(
        { 
          newBalance: payload.newCashOutUserbalance,
          id: payload.debitedAccountId
        },
      );

      if (cashOut) {
        const transaction = await this.cashInTransaction(payload);
        return transaction;
      }
    } catch (error) {
      ValidationError.InternalServerError();
    }
  };

  readAllTransactions = async (userId: number) => {
    try {
      const transactions = await Transactions.findAll({
        where: {
          [Op.or]: [
            { debitedAccountId: userId },
            { creditedAccountId: userId }
          ]
        }
      });

      return transactions;
    } catch (error) {
      ValidationError.InternalServerError();
    }

  };
}

export default TransactionModel;
