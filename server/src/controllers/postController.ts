import type { Request, Response } from 'express';
import type { IPostService } from '../services/postService';


export class PostController {
  private service: IPostService;
  
  constructor (service: IPostService ) {
    this.service = service;
  }

  public getPosts = async (_: Request, res: Response) => {
    const posts = await this.service.getAllPosts();
    res.json(posts);
  }

  public createPost = async (req: Request, res: Response) => {
    const newPost = await this.service.createPost(req.body);
    res.status(201).json(newPost);
  }

  public getComments = async (req: Request, res: Response) => {
    const postId = req.params['postId'];
    const users = await this.service.getComments(parseInt(postId));
    res.json(users);
  }
}