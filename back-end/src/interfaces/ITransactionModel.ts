import Transactions from '../database/models/Transactions';
import { IFilterTransactionByType, ITransaction } from './ITransaction';

interface ITransactionModel {
  cashOutTransaction(_payload: ITransaction): Promise<Transactions | undefined>
  readAllTransactions(_userid: number, _date: string): Promise<Transactions[] | undefined>
  readByTypeTransactions(
    _payload: IFilterTransactionByType, 
    _date: string
  ): Promise<Transactions[] | undefined>
}

export default ITransactionModel;