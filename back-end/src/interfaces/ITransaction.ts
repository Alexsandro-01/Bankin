/* eslint-disable camelcase */
import z from 'zod';

export const transactionSchema = z.object({
  cashInUsername: z
  .string({
    required_error: 'username is required',
    invalid_type_error: 'username must be a string',
  })
  .min(3, { message: 'username must be 6 or more characters long' }),

  value: z.number({
    required_error: 'value is required',
    invalid_type_error: 'value must be a number',
  })
  .min(0.1, { message: 'value must be $0,10 or bigger' })
});

export interface ITransaction {
  debitedAccountId: number,
  creditedAccountId: number,
  valueTransaction: number,
  newCashOutUserbalance: number,
  newCashInUserBalance: number
}

export interface IFilterTransactionByType {
  debitedAccountId?: number,
  creditedAccountId?: number,
}

export const querySchema = z.object({
  filter: z.enum(['all', 'cash-in', 'cash-out'], {
    required_error: 'Filter is required',
  }),
  date: z.string().min(10, {
    message: 'date must be format yyyy-mm-dd'
  }).max(10, {
    message: 'date must be format yyyy-mm-dd'
  }).optional(),
});

export type IQueryParam = z.infer<typeof querySchema>

export type ITransactionPayload = z.infer<typeof transactionSchema>