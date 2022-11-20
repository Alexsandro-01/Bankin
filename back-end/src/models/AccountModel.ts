import IAccountModel from '../interfaces/IAccountModel';
import Accounts from '../database/models/Accounts';
import { IUpdateAccount } from '../interfaces/IAccount';

class AccountModel implements IAccountModel {
  create = async (): Promise<Accounts> => {
    const account = await Accounts.create({});

    return account;
  };

  update = async (payload: IUpdateAccount): Promise<[number]> => {
    const account = await Accounts.update(
      { balance: payload.newBalance },
      { where: { id: payload.id } }
    );

    return account;
  };
}

export default AccountModel;