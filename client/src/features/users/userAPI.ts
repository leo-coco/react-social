import type { IUser } from "./user.type"
import { BaseService } from "../../services/baseService"

export class UserService extends BaseService<IUser> {
  constructor() {
    super("users")
  }
}
