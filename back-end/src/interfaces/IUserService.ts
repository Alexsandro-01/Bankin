import UserModel from '../database/models/User'
import {IUser, IUserName} from '../interfaces/IUser'

interface IUserService {
  create(payload: IUser): Promise<UserModel>
  login(payload: IUser): Promise<{ token: string }>
  readOneWithAccount(token: string | undefined): Promise<UserModel | undefined>
}

export default IUserService;