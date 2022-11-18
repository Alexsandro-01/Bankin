import IUserModel from "../interfaces/IUserModel";
import Users from "../database/models/User";
import Accounts from "../database/models/Accounts";
import { IUser } from "../interfaces/IUser";
import ValidationError from "../errors/ValidationErros";

class UserModel implements IUserModel {

  readOne = async (username: string | undefined): Promise<Users | undefined | void> => {
    try {
      const user = await Users.findOne(
        { 
          where: { username },
        }
      )

      return user as Users;
    } catch (error) {
      ValidationError.InternalServerError()
    }
  }

  readOneWithAccount = async (username: string): Promise<Users | undefined> => {
    try {
      const user = await Users.findOne(
        { 
          where: { username },
          attributes: {exclude: ['password', 'accountId']},
          include: {
            model: Accounts
          }
        }
      )

      return user as Users;
    } catch (error) {
      ValidationError.InternalServerError();
    }
  }

  create = async (payload: IUser): Promise<Users> => {
    let user;
    let account;

    try {
      user = await Users.create(payload);
      
      if (user) {
        account = await Accounts.create({});

        if (account) {
          await Users.update(
            { accountId: account.id },
            { where: { id: user.id } 
          });

        } else {
          await Users.destroy({where: { id: user.id } })

          ValidationError.InternalServerError();
        }
      }
    } catch (error) {
      ValidationError.InternalServerError();
    }

    user = await this.readOne(user?.username)

    const {password, ...spred} = user as Users;
    return spred as Users;
  }
}

export default UserModel;