import request from 'supertest';
import express from 'express';

import router from '../postRoutes';
import { vi } from 'vitest';
import { PostService } from '../../services/postService';
import { mockCursorBasedPostsReponse } from '../../mocks/mockPost';
import { mockCommentPostResponse, mockComments } from '../../mocks/mockComment';
import { mockLikes } from '../../mocks/mockLike';

vi.mock('../services/postService');

const app = express();
app.use(express.json());
app.use('/posts', router);

describe('GET /posts', () => {
  it('should return a list a post based on cursor', async () => {
    const mock = mockCursorBasedPostsReponse();
    const spy = vi.spyOn(PostService.prototype, 'getCursorBasedPostsWithDetails').mockResolvedValue(mock);

    const res = await request(app).get('/posts?userId=1&cursor=1');

    const expectedEntities = mock.posts.map(p => ({
      id: p.id,
      title: p.title,
      content: p.content,
      userId: p.userId,
      hasLiked: p.likes.length > 0,
      likeCount: p._count.likes,
      updatedAt: p.updatedAt.toISOString(),
      createdAt: p.createdAt.toISOString(),
    }))

    expect(spy).toHaveBeenCalledWith(1, 1)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      entities: expectedEntities,
      meta: mock.meta,
    });
  });
});

describe('POST /posts', () => {
  it('should create a post', async () => {
    const newPost = { title: 'New Post', content: 'Post content', userId: 1 };
    const expectedPost = { id: 1, ...newPost, createdAt: new Date(), updatedAt: new Date() };
    vi.spyOn(PostService.prototype, 'createPost').mockResolvedValue(expectedPost);

    const res = await request(app).post('/posts').send(newPost);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      ...expectedPost,
      updatedAt: expectedPost.updatedAt.toISOString(),
      createdAt: expectedPost.createdAt.toISOString(),
    });
  });
});

describe('GET /:postId/comments', () => {
  it('should get comments of a post', async () => {
    const comments = mockComments();
    vi.spyOn(PostService.prototype, 'getComments').mockResolvedValue(comments);

    const res = await request(app).get('/posts/1/comments');

    const expected = comments.map(c => ({
      ...c,
      updatedAt: c.updatedAt.toISOString(),
      createdAt: c.createdAt.toISOString(),
    }))

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expected);
  });
});

describe('POST /:postId/comments', () => {
  it('should add a comment to a post', async () => {
    const newComment = { content: 'Post content', userId: 1 };
    const expectedComment = mockCommentPostResponse();
    vi.spyOn(PostService.prototype, 'addComment').mockResolvedValue(expectedComment);

    const res = await request(app).post('/posts/1/comments').send(newComment)
   expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      ...expectedComment,
      updatedAt: expectedComment.updatedAt.toISOString(),
      createdAt: expectedComment.createdAt.toISOString(),
    });
  });
});

describe('POST /:postId/like', () => {
  it('should like a post', async () => {
    const newLike = { userId: 1 };
    const response = mockLikes()[0];
    vi.spyOn(PostService.prototype, 'like').mockResolvedValue(response);

    const res = await request(app).post('/posts/1/like').send(newLike)
   expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      ...response,
      updatedAt: response.updatedAt.toISOString(),
      createdAt: response.createdAt.toISOString(),
    });
  });
});

describe('DELETE /:postId/like', () => {
  it('should remove a like from post', async () => {
    const newLike = { userId: 1 };
    const response = mockLikes()[0];
    vi.spyOn(PostService.prototype, 'unlike').mockResolvedValue(response);

    const res = await request(app).delete('/posts/1/like').send(newLike)
   expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      ...response,
      updatedAt: response.updatedAt.toISOString(),
      createdAt: response.createdAt.toISOString(),
    });
  });
});
