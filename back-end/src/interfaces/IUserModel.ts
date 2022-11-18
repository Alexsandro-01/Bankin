import UserModel from '../database/models/User';
import { IUser, IUserName } from './IUser';

interface IUserModel {
  readOne(_username: string | undefined): Promise<UserModel | undefined | void>
  create(_payload: IUser): Promise<UserModel>
  readOneWithAccount(_username: IUserName['username']): Promise<UserModel | undefined>
}

export default IUserModel;