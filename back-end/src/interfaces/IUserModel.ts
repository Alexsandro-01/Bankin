import UserModel from '../database/models/User'
import {IUser, IUserName} from './IUser'

interface IUserModel {
  readOne(username: string | undefined): Promise<UserModel | undefined | void>
  create(payload: IUser): Promise<UserModel>
  // readOne(payload: IUserName): Promise<UserModel>
}

export default IUserModel;