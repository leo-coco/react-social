import type { Mock } from 'vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseService } from '../../services/baseService';
import { PostService } from './postAPI';

// Mocking BaseService class
vi.mock('../../services/baseService', () => ({
  BaseService: vi.fn().mockImplementation(() => ({
    getAll: vi.fn(),
  })),
}));

describe('PostService', () => {
  let postService: PostService;
  let mockGetAll: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    postService = new PostService();
    mockGetAll = (BaseService as Mock).mock.instances[0].getAll;
  });

  it('should extend BaseService with IPost type and entity "posts"', () => {
    expect(BaseService).toHaveBeenCalledWith('posts');
    expect(postService).toBeInstanceOf(BaseService);
  });

  describe('getByUser', () => {
    it('should call getAll with userId', async () => {
      const userId = '123';
      const expectedQuery = `userId=${userId}`;
      console.log((BaseService as Mock).mock.instances);


  
      await postService.getByUser(userId);
  
      expect(mockGetAll).toHaveBeenCalledWith(expectedQuery);
    });
  })
});
