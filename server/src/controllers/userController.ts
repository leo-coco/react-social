import type { Response, Request } from 'express';
import type { IUserService } from '../services/userService';
import { BaseController } from './baseController';


export class UserController extends BaseController {
  private service: IUserService;
  
  constructor (service: IUserService ) {
    super();
    this.service = service;
  }

  public getUsers = async (_: Request, res: Response) => {
    try {
      const users = await this.service.getAll();
      res.json(users);
    }
    catch (e: unknown) {
      this.returnPrismaError(res, e, 'Error getting users');
    }
  }

}