import { prisma } from '../db/prisma'
import type { User } from "@prisma/client";


export interface IUserService {
  getAll(): Promise<User[]>
}

export class UserService implements IUserService {

  public async getAll() {
    return await prisma.user.findMany();
  }
}
