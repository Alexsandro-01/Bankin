import IAccountModel from '../interfaces/IAccountModel';
import Accounts from '../database/models/Accounts';

class AccountModel implements IAccountModel {
  create = async (): Promise<Accounts> => {
    const account = await Accounts.create({});

    return account;
  };
}

export default AccountModel;