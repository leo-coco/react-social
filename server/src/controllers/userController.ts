import type { Response, Request } from 'express';
import type { IUserService } from '../services/userService';


export class UserController {
  private service: IUserService;
  
  constructor (service: IUserService ) {
    this.service = service;
  }

  public getUsers = async (_: Request, res: Response) => {
    const users = await this.service.getAll();
    res.json(users);
  }

}