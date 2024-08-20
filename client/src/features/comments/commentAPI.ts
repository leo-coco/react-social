import { BaseService } from "../../services/baseService"
import type { IComment } from "./comment.type"

export class CommentService extends BaseService<IComment> {
  constructor() {
    super("comments")
  }

  public async getByPost(postId: string): Promise<IComment[]> {
    return this.getAll(`postId=${postId}`)
  }
}
