import IUserModel from '../interfaces/IUserModel';
import Users from '../database/models/User';
import Accounts from '../database/models/Accounts';
import { IUser, userWithAccount } from '../interfaces/IUser';
import ValidationError from '../errors/ValidationErros';
import IAccountModel from '../interfaces/IAccountModel';

class UserModel implements IUserModel {
  private _accountModel;
  constructor(accountModel: IAccountModel) {
    this._accountModel = accountModel;
  }

  readOne = async (username: string | undefined): Promise<Users | undefined | void> => {
    try {
      const user = await Users.findOne(
        { 
          raw: true,
          where: { username },
        }
      );

      return user as Users;
    } catch (error) {
      ValidationError.InternalServerError();
    }
  };

  readOneWithAccount = async (
    username: string
    ): Promise<userWithAccount| undefined> => {
    try {
      const user = await Users.findOne(
        { 
          where: { username },
          attributes: { exclude: ['password'] },
          include: {
            model: Accounts,
            attributes: { exclude: ['id']}
          }
        }
      );

      return user as userWithAccount;
    } catch (error) {
      ValidationError.InternalServerError();
    }
  };

  createAccount = async (userId: number) => {
    const account = await this._accountModel.create();

    if (account) {
      await Users.update(
        { accountId: account.id },
        { where: { id: userId } 
      });

    } else {
      await Users.destroy({where: { id: userId } });

      ValidationError.InternalServerError();
    }
  };

  create = async (payload: IUser): Promise<Users> => {
    let user;

    try {
      user = await Users.create(payload);
      
      if (user) {
        await this.createAccount(user.id);        
      }

    } catch (error) {
      ValidationError.InternalServerError();
    }

    const updatedUser = await this.readOne(user?.username);

    const {password, ...spred} = updatedUser as Users;
    return spred as Users;
  };
}

export default UserModel;