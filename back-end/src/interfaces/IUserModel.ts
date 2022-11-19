import UserModel from '../database/models/User';
import { IUser, IUserName, userWithAccount } from './IUser';

interface IUserModel {
  readOne(_username: string | undefined): Promise<UserModel | undefined | void>
  create(_payload: IUser): Promise<UserModel>
  readOneWithAccount(_username: IUserName['username']): Promise<userWithAccount | undefined>
}

export default IUserModel;