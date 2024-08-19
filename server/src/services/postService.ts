import { prisma } from '../db/prisma'
import type { Prisma} from "@prisma/client";
import type { Post, Comment, Like } from "@prisma/client";
import { BaseService } from './baseService';

type PostWithLikesAndCount = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  likes: Array<{ id: number }>;
  _count: {
    likes: number;
    comments: number;
  };
};

interface CursorBasedPostsResponse  {
  posts: PostWithLikesAndCount[],
  meta: {
    nextCursor: number | null;
  }
}

export interface IPostService {
  getAllPosts(userId: number): Promise<Post[]>
  getAllPostsWithDetails(userId: number): Promise<PostWithLikesAndCount[]>
  getCursorBasedPostsWithDetails(userId: number, cursor: number): Promise<CursorBasedPostsResponse>
  createPost(data: any): Promise<Post>
  getComments(postId: number, limit?: number): Promise<Comment[]>
  addComment(postId: number, userId: number, content: string): Promise<Comment>
  getLikes(postId: number): Promise<Like[]>
  like(userId: number, postId: number): Promise<Like>
  dislike(userId: number, postId: number): Promise<Like>
}

export class PostService extends BaseService implements IPostService {

  public async getAllPosts(userId: number) {
    try {
      return await prisma.post.findMany({
        where: {
          userId: userId,
        },
        orderBy: [{createdAt: 'desc'}],
      });
    }
    catch (e) {
      throw this.handlePrismaError(e)
    }
  }

  public async getAllPostsWithDetails(userId: number) {
    try {
      return await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          likes: {
            where: {
              userId: userId,
            },
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
    }  catch (e) {
      throw this.handlePrismaError(e)
    }
   
  }

  public async getCursorBasedPostsWithDetails(userId: number, cursor: number) {
    const take = 2;
    try {
      const posts = await prisma.post.findMany({
        orderBy: {
          id: 'asc',
        },
        cursor: {
          id: (cursor),
        },
        where: {
          userId: userId,
        },
        include: {
          likes: {
            where: {
              userId: userId,
            },
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
        take: take + 1, // Fetch one more than needed to check for next page
      });
      
      const hasNextPage = posts.length > take;
      const nextCursor = hasNextPage ? posts[posts.length - 1].id : null;

      const data = hasNextPage ? posts.slice(0, -1) : posts;
      
      return {
        posts: data,
        meta: {
          nextCursor,
        },
      }

    } catch (e) {
      throw this.handlePrismaError(e)
    }
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
    try {
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
    catch (e) {
      throw this.handlePrismaError(e)
    }
  
  }

  public async addComment(postId: number, userId: number, content: string) {
    try {
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
    } catch (e) {
      throw this.handlePrismaError(e)
    }
   
  }

  public async getLikes(postId: number) {
    try {
      return prisma.like.findMany({
        where: {
          postId: postId,
        }
      })
    } catch (e) {
      throw this.handlePrismaError(e)
    }
  }

  public async like(postId: number, userId: number) {
    try {
      return await prisma.like.create({
        data: {
          user: {
            connect: { id: userId }
          },
          post: {
            connect: { id: postId }
          },
        },
      });
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }

  public async dislike(postId: number, userId: number) {
    try {
      return await prisma.like.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
    } catch (e) {
      throw this.handlePrismaError(e);
    }
  }
}