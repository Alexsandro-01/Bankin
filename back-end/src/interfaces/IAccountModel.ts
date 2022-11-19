import Accounts from '../database/models/Accounts';
import { IUpdateAccount } from './IAccount';

interface IAccountModel {
  create(): Promise<Accounts>
  update(_payload: IUpdateAccount): Promise<[number]>
}

export default IAccountModel;