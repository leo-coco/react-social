import { prisma } from '../db/prisma'
import type { Post, Prisma, Comment } from "@prisma/client";


export interface IPostService {
  getAllPosts(): Promise<Post[]>
  createPost(data: any): Promise<Post>
  getComments(postId: number, limit?: number): Promise<Comment[]>
}

export class PostService implements IPostService {

  public async getAllPosts() {
    return await prisma.post.findMany({
      include: {
        user: true,
      }
    });
  }

  public async createPost(data: Prisma.PostCreateInput) {
    return await prisma.post.create({
      data,
    });
  }

  public async getComments(postId: number, limit = 1) {
    return await prisma.comment.findMany({
      include: {
        user: {
            select: {
                firstName: true,
                lastName: true,
            },
        },
    },
      where: {
        postId: postId,
      },
      take: limit,
    });
  }
}
