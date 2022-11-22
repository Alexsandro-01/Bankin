import { IUser } from "./IUsers"

export interface ITransactions {
  cashInUsername: string,
  value: string
}

export interface ITransactionprops {
  getBalance: (token: string) => Promise<void>
}

export interface ITransactionModel {
  id: number,
  debitedAccountId: number,
  creditedAccountId: number,
  value: string,
  createdAt: string
}

export interface IPropRenderTransacrtion {
  transaction: ITransactionModel,
  userAccount: IUser["accountId"] | undefined
}

export interface IPropHistoric {
  user: IUser | undefined,
}