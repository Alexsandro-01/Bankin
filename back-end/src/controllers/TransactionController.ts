import { Request, Response } from 'express';
import ITransactionService from '../interfaces/ITransactionService';

class TransactionController {
  private _service;
  constructor(service: ITransactionService) {
    this._service = service;
  }

  cashOut = async (req: Request, res: Response): Promise<void> => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.replace('Bearer ', '');
    const payload = req.body;

    const response = await this._service.cashOut(payload, token as string);
    res.status(200).json(response);
  };

  readTransactions = async (req: Request, res: Response): Promise<void> => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.replace('Bearer ', '');
    const query = req.query;

    const response = await this._service.readTransactions(query.filter as string, token as string);

    res.status(200).json(response);
  };
}

export default TransactionController;