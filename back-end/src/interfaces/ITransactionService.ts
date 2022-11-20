import Transactions from '../database/models/Transactions';
import { ITransactionPayload } from './ITransaction';

interface ITransactionService {
  cashOut(_payload: ITransactionPayload, _token: string): Promise<Transactions | undefined>
  readTransactions(_query: string, _token: string): Promise<Transactions[] | undefined>
}

export default ITransactionService;