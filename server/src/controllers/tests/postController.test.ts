import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';
import { PostController } from '../postController';
import type { PostWithDetails } from '../postController';
import type { IPostService } from '../../services/postService';
import type { PrismaFormattedError } from '../../../types/prismaError';

const mockService: IPostService = {
  getCursorBasedPostsWithDetails: vi.fn(),
  createPost: vi.fn(),
  getAllPosts: vi.fn(),
  getComments: vi.fn(),
  addComment: vi.fn(),
  getLikes: vi.fn(),
  like: vi.fn(),
  dislike: vi.fn(),
};

const controller = new PostController(mockService);

describe('PostController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  describe('getCursorBasedPosts', () => {
    it('should return posts', async () => {
      const mockPosts = {
        posts: [{
          id: 1,
          title: 'Post Title',
          content: 'Post Content',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          likes: [{ userId: 1 }],
          _count: { likes: 1 }
        }],
        meta: {}
      };

      mockService.getCursorBasedPostsWithDetails = vi.fn().mockResolvedValue(mockPosts);
      mockReq.query = { userId: '1', cursor: '1' };

      await controller.getCursorBasedPosts(mockReq as Request, mockRes as Response);

      const expectedPosts: PostWithDetails[] = [{
        id: 1,
        title: 'Post Title',
        content: 'Post Content',
        userId: 1,
        createdAt: mockPosts.posts[0].createdAt,
        updatedAt: mockPosts.posts[0].updatedAt,
        hasLiked: true,
        likeCount: 1
      }];

      expect(mockRes.json).toHaveBeenCalledWith({
        entities: expectedPosts,
        meta: mockPosts.meta
      });
    });

    it('should handle errors from the service', async () => {
      const error = { httpStatus: 500, errorMessage: 'error message' } as PrismaFormattedError;
      mockService.getCursorBasedPostsWithDetails = vi.fn().mockRejectedValue(error);
      mockReq.query = { userId: '1', cursor: '1' };

      await controller.getCursorBasedPosts(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error getting posts',
        error: error.errorMessage,
      });
    });
  });

  describe('createPost', () => {
    it('should create a new post successfully', async () => {
      const newPost = { id: 1, title: 'New Post', content: 'Post Content', userId: 1, createdAt: new Date(), updatedAt: new Date() };
      mockService.createPost = vi.fn().mockResolvedValue(newPost);
      mockReq.body = { title: 'New Post', content: 'Post Content' };

      await controller.createPost(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(newPost);
    });

    it('should handle validation errors', async () => {
      mockReq.body = { title: '', content: '' };

      await controller.createPost(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Title and content are required to create a post',
        error: ''
      });
    });

    it('should handle errors from the service', async () => {
      const error = { httpStatus: 500, errorMessage: 'error message' } as PrismaFormattedError;
      mockService.createPost = vi.fn().mockRejectedValue(error);
      mockReq.body = { title: 'Valid Title', content: 'Valid Content' };

      await controller.createPost(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error creating a post',
        error: error.errorMessage,
      });
    });
  });

  describe('getComments', () => {
    it('should return comments for a post', async () => {
      const comments = [{ id: 1, content: 'Nice post!', userId: 1, postId: 1 }];
      mockService.getComments = vi.fn().mockResolvedValue(comments);
      mockReq.params = { postId: '1' };
      mockReq.query = { limit: '10' };

      await controller.getComments(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith(comments);
    });

    it('should handle errors from the service', async () => {
      const error = { httpStatus: 500, errorMessage: 'error message' } as PrismaFormattedError;
      mockService.getComments = vi.fn().mockRejectedValue(error);
      mockReq.params = { postId: '1' };
      mockReq.query = { limit: '10' };

      await controller.getComments(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error getting comments',
        error: error.errorMessage,
      });
    });
  });

  describe('addComment', () => {
    it('should add a comment successfully', async () => {
      const comment = { id: 1, content: 'Great post!', userId: 1, postId: 1 };
      mockService.addComment = vi.fn().mockResolvedValue(comment);
      mockReq.params = { postId: '1' };
      mockReq.body = { userId: 1, content: 'Great post!' };

      await controller.addComment(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith(comment);
    });

    it('should handle validation errors', async () => {
      mockReq.params = { postId: '1' };
      mockReq.body = { userId: 1, content: '' };

      await controller.addComment(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Content is required to add a comment',
        error: ''
      });
    });

    it('should handle errors from the service', async () => {
      const error = { httpStatus: 500, errorMessage: 'error message' } as PrismaFormattedError;
      mockService.addComment = vi.fn().mockRejectedValue(error);
      mockReq.params = { postId: '1' };
      mockReq.body = { userId: 1, content: 'Great post!' };

      await controller.addComment(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error adding a comment',
        error: error.errorMessage
      });
    });
  });

  describe('getLikes', () => {
    it('should return likes for a post', async () => {
      const likes = [{ userId: 1 }];
      mockService.getLikes = vi.fn().mockResolvedValue(likes);
      mockReq.params = { postId: '1' };

      await controller.getLikes(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith(likes);
    });

    it('should handle errors from the service', async () => {
      const error = { httpStatus: 500, errorMessage: 'error message' } as PrismaFormattedError;
      mockService.getLikes = vi.fn().mockRejectedValue(error);
      mockReq.params = { postId: '1' };

      await controller.getLikes(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error getting likes',
        error: error.errorMessage
      });
    });
  });

  describe('like', () => {
    it('should add a like to a post', async () => {
      const likes = [{ userId: 1 }];
      mockService.like = vi.fn().mockResolvedValue(likes);
      mockReq.params = { postId: '1' };
      mockReq.body = { userId: 1 };

      await controller.like(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith(likes);
    });

    it('should handle errors from the service', async () => {
      const error = { httpStatus: 500, errorMessage: 'error message' } as PrismaFormattedError;
      mockService.like = vi.fn().mockRejectedValue(error);
      mockReq.params = { postId: '1' };
      mockReq.body = { userId: 1 };

      await controller.like(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Error liking a post',
        error: error.errorMessage
      });
    });
  });
});