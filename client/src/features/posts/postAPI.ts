
import { BaseService } from "../../services/baseService";
import type { IComment } from "../comments/comment.type";
import type { IPost } from "./post.type";

export class PostService extends BaseService<IPost> {
  constructor() {
    super('posts')
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  public async getByUser(userId: string): Promise<IPost[]> {
    return this.getAll(`userId=${userId}`)
  }

  public async getComments(postId: string, limit: number): Promise<IComment[]> {
    try {
      const response = await fetch( `${this.baseUrl}/${this.entity}/${postId}/comments`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}