import UserModel from '../database/models/User'
import {IUser, IUserName} from './IUser'

interface IUserModel {
  readOne(username: string | undefined): Promise<UserModel | undefined | void>
  create(payload: IUser): Promise<UserModel>
  readOneWithAccount(username: IUserName['username']): Promise<UserModel | undefined>
}

export default IUserModel;