import Accounts from '../database/models/Accounts';

interface IAccountModel {
  create(): Promise<Accounts>
}

export default IAccountModel;