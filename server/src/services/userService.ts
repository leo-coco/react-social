import { prisma } from "../db/prisma"
import type { User } from "@prisma/client"
import { BaseService } from "./baseService"

export interface IUserService {
  getAll(): Promise<User[]>
}


      export class UserService extends BaseService implements IUserService {
  public async getAll() {
    try {
      return await prisma.user.findMany()
    } catch (e) {
      throw this.handlePrismaError(e)
    }
  }
}
