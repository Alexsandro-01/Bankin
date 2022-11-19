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

export type ITransactionPayload = z.infer<typeof transactionSchema>