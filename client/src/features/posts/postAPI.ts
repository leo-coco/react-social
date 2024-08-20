import { BaseService } from "../../services/baseService"
import type { IComment } from "../comments/comment.type"
import type { IPost } from "./post.type"

export class PostService extends BaseService<IPost> {
  constructor() {
    super("posts")
    this.baseUrl = import.meta.env.VITE_API_BASE_URL
  }

  public async getByUser(userId: string): Promise<IPost[]> {
    return this.getAll(`userId=${userId}`)
  }

  public async getComments(postId: number, limit: number): Promise<IComment[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.entity}/${postId}/comments?limit=${limit}`,
      )
      if (!response.ok) {
        await this.handleError(response)
      }
      const data = await response.json()
      return data
    } catch (error: any) {
      console.error("Fetch error:", error)
      throw error
    }
  }

  public async addComment(
    postId: string,
    userId: number,
    content: string,
  ): Promise<IComment> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.entity}/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, content }),
        },
      )

      if (!response.ok) {
        await this.handleError(response)
      }

      const data = await response.json()
      return data
    } catch (error: any) {
      console.error("Fetch error:", error)
      throw error
    }
  }

  public async like(postId: number, userId: number) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.entity}/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        },
      )

      if (!response.ok) {
        await this.handleError(response)
      }

      const data = await response.json()
      return data
    } catch (error: any) {
      console.error("Fetch error:", error)
      throw error
    }
  }

  public async unlike(postId: number, userId: number) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.entity}/${postId}/like`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        },
      )

      if (!response.ok) {
        await this.handleError(response)
      }

      const data = await response.json()
      return data
    } catch (error: any) {
      console.error("Fetch error:", error)
      throw error
    }
  }
}
