import UserModel from '../database/models/User';
import { IUser } from '../interfaces/IUser';

interface IUserService {
  create(_payload: IUser): Promise<UserModel>
  login(_payload: IUser): Promise<{ token: string }>
  readOneWithAccount(_token: string | undefined): Promise<UserModel | undefined>
}

export default IUserService;