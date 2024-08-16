import { prisma } from '../db/prisma'
import type { Prisma} from "@prisma/client";
import type { Post, Comment } from "@prisma/client";
import { BaseService } from './baseService';


export interface IPostService {
  getAllPosts(userId: number): Promise<Post[]>
  createPost(data: any): Promise<Post>
  getComments(postId: number, limit?: number): Promise<Comment[]>
  addComment(postId: number, userId: number, content: string): Promise<Comment>
}

export class PostService extends BaseService implements IPostService {

  public async getAllPosts(userId: number) {
    return await prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: [{createdAt: 'desc'}],
    });
  }

  public async createPost(data: Prisma.PostCreateInput) {
    try {
      return await prisma.post.create({
        data,
      });
    } catch (e) {
      throw this.handlePrismaError(e)
    }
  }

  public async getComments(postId: number, limit = 10) {
    return await prisma.comment.findMany({
      include: {
        user: {
            select: {
                firstName: true,
                lastName: true,
            },
        },
    },
    orderBy: [{createdAt: 'desc'}],
      where: {
        postId: postId,
      },
      take: limit,
    });
  }

  public async addComment(postId: number, userId: number, content: string) {
    return await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
      include: {
        user: true, // So user data is available, so we don't have to invalidate the whole list of comments for a post
      },
    });
  }
}
