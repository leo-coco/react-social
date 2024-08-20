import { describe, it, expect, vi, beforeEach } from "vitest"
import { BaseService } from "../../../services/baseService"
import { CommentService } from "../commentAPI"

vi.mock('../../../services/baseService');

describe("CommentService", () => {
  let commentService: CommentService

  beforeEach(() => {
    vi.clearAllMocks()
    commentService = new CommentService()
  })

  it('should extend BaseService"', () => {
    expect(BaseService).toHaveBeenCalledWith("comments")
    expect(commentService).toBeInstanceOf(BaseService)
  })

  describe("getByPost", () => {
    it("should call getAll with postId", async () => {
      const postId = "123"
      vi.spyOn(BaseService.prototype, 'getAll').mockResolvedValue([]);

      await commentService.getByPost(postId)

      expect(commentService.getAll).toHaveBeenCalledWith(`postId=${postId}`);
    })
  })
})
