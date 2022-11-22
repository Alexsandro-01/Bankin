export interface IUserRequest {
  username: string,
  password: string
}

export interface IUser {
  id: number,
  username: string,
  accountId: number,
  Account: {
    balance: string
  }
}