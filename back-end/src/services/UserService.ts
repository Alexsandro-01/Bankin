import IUserService from "../interfaces/IUserService";
import IUserModel from "../interfaces/IUserModel";
import Users from "../database/models/User";
import { IUser, usernameSchema, passwordSchema } from "../interfaces/IUser";
import ValidationError from "../errors/ValidationErros";
import bcrypt from 'bcrypt';

class UserService implements IUserService {
  private _model;
  constructor(model: IUserModel) {
    this._model = model;
  }

  validateCreatePayload = (payload: IUser) => {
    const parsedUserName = usernameSchema.safeParse(payload)
    const parsedPassword = passwordSchema.safeParse(payload)
  
    if (!parsedUserName.success) {
      throw parsedUserName.error
    }
    if (!parsedPassword.success) {
      throw parsedPassword.error
    }

    const {password} = parsedPassword.data
    const regex = /[0-9]/;

    const noLower = password !== password.toLowerCase();
    const hasNumber = regex.test(password);

    if (!noLower) {
      ValidationError.BadRequest('password must have a capital letter')
    }

    if (!hasNumber) {
      ValidationError.BadRequest('password must have a number')
    }

    return {
      ...parsedUserName.data,
      ...parsedPassword.data
    }
  }

  create = async (payload: IUser): Promise<Users> => {
    const dataUser = this.validateCreatePayload(payload)

    const userExist = await this._model.readOne(dataUser.username);

    if (userExist) {
      ValidationError.ConflictError(`Username "${dataUser.username}" already exists`)
    }

    const hashPassword = await bcrypt.hash(dataUser.password, 8);

    dataUser.password = hashPassword

    const user = await this._model.create(dataUser)
    
    return user;
  }
}

export default UserService