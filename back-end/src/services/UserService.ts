import IUserService from "../interfaces/IUserService";
import IUserModel from "../interfaces/IUserModel";
import Users from "../database/models/User";
import { IUser, IUserName, usernameSchema, passwordSchema } from "../interfaces/IUser";
import ValidationError from "../errors/ValidationErros";
import {checkPassword, hashPassword, makeToken, verifyToken } from './validations/login'

class UserService implements IUserService {
  private _model;
  constructor(model: IUserModel) {
    this._model = model;
  }

  validateUserPayload = (payload: IUser) => {
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
    const dataUser = this.validateUserPayload(payload)

    const userExist = await this._model.readOne(dataUser.username);

    if (userExist) {
      ValidationError.ConflictError(`Username "${dataUser.username}" already exists`)
    }

    dataUser.password = await hashPassword(dataUser.password);

    const user = await this._model.create(dataUser)
    
    return user;
  }

  login = async (payload: IUser): Promise<{ token: string}> => {
    const dataUser = this.validateUserPayload(payload)

    const user = await this._model.readOne(dataUser.username);
    
    if (!user) {
      ValidationError.Unauthorized('Invalid username or password')
    }
    
    await checkPassword(dataUser.password, user?.password as string);

    const token = await makeToken(
      {
        username: user?.username as string,
        accountId: user?.accountId as number
      }
    )

    return { token };
  }

  readOneWithAccount = async (token: string | undefined): Promise<Users | undefined> => {

    const userData = await verifyToken(token);

    const userWithAccount = await this._model.readOneWithAccount(userData?.username as string);

    return userWithAccount;
  }
}

export default UserService