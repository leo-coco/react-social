
import { BaseService } from "../../services/baseService";
import type { IPost } from "./post.type";

export class PostService extends BaseService<IPost> {
  constructor() {
    super('posts')
  }

  public async getByUser(userId: string): Promise<IPost[]> {
    return this.getAll(`userId=${userId}`)
  }
}