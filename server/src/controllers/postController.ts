import type { Request, Response } from 'express';
import type { IPostService } from '../services/postService';
import { BaseController } from './baseController.ts';


export type PostWithDetails = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  hasLiked: boolean;
  likeCount: number;
};

export class PostController extends BaseController {
  private service: IPostService;

  constructor(service: IPostService) {
    super();
    this.service = service;
  }

  public getPosts = async (req: Request, res: Response) => {
    const userId = req.query['userId'] as string | undefined;
    if (userId) {
      try {
        const posts = await this.service.getAllPostsWithDetails(parseInt(userId));
        
        const postsWithDetails: PostWithDetails[] = posts.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          hasLiked: post.likes.length > 0,
          likeCount: post._count.likes,
        }));
        res.json(postsWithDetails);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error getting posts');
      }
    }
  }

  public getCursorBasedPosts = async (req: Request, res: Response) => {
    const userId = req.query['userId'] as string | undefined;
    const cursor = req.query['cursor'] as string;

    if (userId) {
      try {
        const response = await this.service.getCursorBasedPostsWithDetails(parseInt(userId), parseInt(cursor));
        
        const postsWithDetails: PostWithDetails[] = response.posts.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          hasLiked: post.likes.length > 0,
          likeCount: post._count.likes,
        }));
        res.json({
          entities: postsWithDetails,
          meta: response.meta,
        });
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error getting posts');
      }
    }
  }

  public createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || title.trim() === '' || !content || content.trim() === '') {
      this.returnError(res, {
        httpStatus: 422,
        message: "Title and content are required to create a post",
      })
    }

    try {
      const newPost = await this.service.createPost(req.body);
      res.status(201).json(newPost);
    } catch (e: unknown) {
      this.returnPrismaError(res, e, 'Error creating a post');
    }
  }

  public getComments = async (req: Request, res: Response) => {
    const postId = req.params['postId'];
    const limit = req.query['limit'] as string;
    if (postId) {
      try {
        const users = await this.service.getComments(parseInt(postId), parseInt(limit));
        res.json(users);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error getting comments');
      }
    }
  }

  public addComment = async (req: Request, res: Response) => {
    const postId = req.params['postId'];
    const { userId, content } = req.body;

    if (!content || content.trim() === '') {
      this.returnError(res, {
        httpStatus: 422,
        message: "Content is required to add a comment",
      })
    }

    if (postId) {
      try {
        const comment = await this.service.addComment(parseInt(postId), parseInt(userId), content);
        res.json(comment);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error adding a comment');
      }
    }
  }

  public getLikes = async (req: Request, res: Response) => {
    const postId = req.params['postId'];

    if (postId) {
      try {
        const likes = await this.service.getLikes(parseInt(postId));
        res.json(likes);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error getting likes');
      }
    }
  }

  public like = async (req: Request, res: Response) => {
    const postId = req.params['postId'];
    const userId = req.body['userId'];

    if (postId && userId) {
      try {
        const likes = await this.service.like(parseInt(postId), userId);
        res.json(likes);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error liking a post');
      }
    }
  }

  public dislike = async (req: Request, res: Response) => {
    const postId = req.params['postId'];
    const userId = req.body['userId'];

    if (postId && userId) {
      try {
        const likes = await this.service.dislike(parseInt(postId), userId);
        res.json(likes);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error disliking a post');
      }
    }
  }
}