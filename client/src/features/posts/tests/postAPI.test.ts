import { describe, it, expect, vi } from "vitest";
import { PostService } from "../postAPI";
import { BaseService } from "../../../services/baseService";

vi.mock('../../../services/baseService');

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

describe("PostService", () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
    global.fetch = vi.fn();
  });

  it('should extend BaseService', () => {
    const service = new PostService()
    expect(BaseService).toHaveBeenCalledWith("posts")
    expect(service).toBeInstanceOf(BaseService)
  })

  describe("getByUser", () => {
    it("should fetch posts by user ID", async () => {
      const userId = "1";
      vi.spyOn(BaseService.prototype, 'getAll').mockResolvedValue([]);
      const posts = await postService.getByUser(userId);
  
      expect(postService.getAll).toHaveBeenCalledWith(`userId=${userId}`);
      expect(posts).toEqual([]]);
    });
  })

  describe("getComments", () => {
    it("should call correct URL", async () => {
      fetch.mockResolvedValue(createFetchResponse([]))
      const comments = await postService.getComments(1, 5);
      expect(fetch).toHaveBeenCalledWith("undefined/undefined/1/comments?limit=5");
      expect(comments).toEqual([]);
    })
  })

  describe("addComment", () => {
    it("should call correct URL", async () => {
      fetch.mockResolvedValue(createFetchResponse([]))
      const postId = '1';
      const userId = 5;
      const content = 'content';
      const res = await postService.addComment(postId, userId, content);
      expect(fetch).toHaveBeenCalledWith("undefined/undefined/1/comments", {
        body:JSON.stringify({ userId, content }),
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      });
      expect(res).toEqual([]);
    })
  })

  describe("like", () => {
    it("should call correct URL", async () => {
      fetch.mockResolvedValue(createFetchResponse([]))
      const postId = 1;
      const userId = 5;
      const res = await postService.like(postId, userId);
      expect(fetch).toHaveBeenCalledWith("undefined/undefined/1/like", {
        body:JSON.stringify({ userId }),
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      });
      expect(res).toEqual([]);
    })
  })

  describe("unlike", () => {
    it("should call correct URL", async () => {
      fetch.mockResolvedValue(createFetchResponse([]))
      const postId = 1;
      const userId = 5;
      const res = await postService.unlike(postId, userId);
      expect(fetch).toHaveBeenCalledWith("undefined/undefined/1/like", {
        body:JSON.stringify({ userId }),
        method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
      });
      expect(res).toEqual([]);
    });
  })

 
});
