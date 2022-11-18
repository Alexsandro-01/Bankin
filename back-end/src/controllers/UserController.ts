import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

class UserController {
  private _service;
  constructor(service: IUserService) {
    this._service = service;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body;

    const response = await this._service.create(payload);

    res.status(201).json(response);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const payload = req.body;

    const response = await this._service.login(payload);

    res.status(200).json(response);
  };

  readOneWithAccount = async (req: Request, res: Response): Promise<void> => {
    const bearerToken = req.headers.authorization;

    const token = bearerToken?.replace('Bearer ', '');
    
    const response = await this._service.readOneWithAccount(token);

    res.status(200).json(response);
  };
}

export default UserController;