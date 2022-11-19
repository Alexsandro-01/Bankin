/* eslint-disable camelcase */
import z from 'zod';
import Accounts from '../database/models/Accounts';
import Users from '../database/models/User';

export const usernameSchema = z.object({
  username: z
  .string({
    required_error: 'username is required',
    invalid_type_error: 'username must be a string',
  })
  .min(3, { message: 'username must be 6 or more characters long' })
});

export const passwordSchema = z.object({
  password: z
  .string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  })
  .min(8, { message: 'password must be 8 or more characters long' })
});

export type IUserName = z.infer<typeof usernameSchema>

export type IUser = IUserName & z.infer<typeof passwordSchema>

export interface tokenData {
  username: string,
  accountId: number
}

export type userWithAccount = Users & { Account: Accounts }
