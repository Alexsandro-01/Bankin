import UserModel from '../database/models/User'
import {IUser, IUserName} from '../interfaces/IUser'

interface IUserService {
  create(payload: IUser): Promise<UserModel>
  // readOne(payload: IUserName): Promise<UserModel>
}

export default IUserService;