import Transactions from '../database/models/Transactions';
import { ITransaction } from './ITransaction';

interface ITransactionModel {
  cashOutTransaction(_payload: ITransaction): Promise<Transactions | undefined>
  readAllTransactions(_userid: number): Promise<Transactions[] | undefined>
}

export default ITransactionModel;