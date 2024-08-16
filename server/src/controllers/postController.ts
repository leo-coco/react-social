import type { Request, Response } from 'express';
import type { IPostService } from '../services/postService';
import { BaseController } from './baseController.ts';

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
        const posts = await this.service.getAllPosts(parseInt(userId));
        res.json(posts);
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
    if (postId) {
      try {
        const users = await this.service.getComments(parseInt(postId));
        res.json(users);
      }
      catch (e: unknown) {
        this.returnPrismaError(res, e, 'Error getting comments');
      }
    }
  }
}