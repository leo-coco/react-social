import { describe, it, expect, vi } from "vitest"
import { PostService } from "../postService"
import { prisma } from "../../db/prisma"
import { mockPosts } from "../../mocks/mockPost"
import { mockComments } from "../../mocks/mockComment"
import { mockLikes } from "../../mocks/mockLike"



describe("PostService", () => {
  describe("getCursorBasedPostsWithDetails", () => {
    it("should be called with proper parameters", async () => {
      const mock = mockPosts();
      vi.spyOn(prisma.post, "findMany").mockResolvedValue(mock)
  
      const service = new PostService()
      const userId = 1;
      const cursor = 0;
      const take = 2;

      await service.getCursorBasedPostsWithDetails(userId, cursor)

      expect(prisma.post.findMany).toHaveBeenCalledWith({
        orderBy: {
          id: "asc",
        },
        cursor: {
          id: cursor,
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
        take: take + 1
      })

    })
    it ("should return proper data when there is more posts", async () => {
      const mock = mockPosts();
      vi.spyOn(prisma.post, "findMany").mockResolvedValue(mock)
  
      const service = new PostService()
      const userId = 1;
      const cursor = 0;

      const posts = await service.getCursorBasedPostsWithDetails(userId, cursor)

      expect(posts).toEqual({
        posts: mock.slice(0, -1),
        meta: {
          nextCursor: 3,
        }
      })
    })
    it ("should return proper data when there is no more posts", async () => {
      const mock = mockPosts().splice(0,-1); // There are 2 posts
      vi.spyOn(prisma.post, "findMany").mockResolvedValue(mock)
  
      const service = new PostService()
      const userId = 1;
      const cursor = 0;

      const posts = await service.getCursorBasedPostsWithDetails(userId, cursor)

      expect(posts).toEqual({
        posts: mock,
        meta: {
          nextCursor: null,
        }
      })
    })
  })

  describe("createPost", () => {
    it("should create a post", async () => {
      const postData = {
        title: 'New Post',
        content: 'This is a new post.',
        user: { connect: { id: 1 } },
      };
  
      const createdPost = {
        id: 1,
        title: postData.title,
        content: postData.content,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(prisma.post, "create").mockResolvedValue(createdPost)
  
      const service = new PostService()

      const result = await service.createPost(postData);
      expect(result).toEqual(createdPost);
      expect(prisma.post.create).toHaveBeenCalledWith({ data: postData });
    })
  })

  describe("getComments", () => {
    it("should get all comments for a post", async () => {
      const mock = mockComments();

      vi.spyOn(prisma.comment, "findMany").mockResolvedValue(mock)
  
      const service = new PostService()
      const postId = 1;
      const limit = 5;

      const result = await service.getComments(postId, limit);
      expect(result).toEqual(mock);
      expect(prisma.comment.findMany).toHaveBeenCalledWith({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: [{ createdAt: "desc" }],
        where: {
          postId: postId,
        },
        take: limit,
      });
    })
  })

  describe("addComment", () => {
    it("should add a comment to a post", async () => {
      const postData = {
        content: 'This is a new post.',
        user: { connect: { id: 1 } },
        post: { connect: { id: 1 } },
      };
  
      const createdComment = {
        id: 1,
        content: postData.content,
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(prisma.comment, "create").mockResolvedValue(createdComment)
  
      const service = new PostService()

      const result = await service.addComment(1, 1, postData.content);
      expect(result).toEqual(createdComment);
      expect(prisma.comment.create).toHaveBeenCalledWith({ data: postData,  include: {
        user: true,
      }, });
    })
  })

  describe("getLikes", () => {
    it("should get all likes for a post", async () => {
      const mock = mockLikes();

      vi.spyOn(prisma.like, "findMany").mockResolvedValue(mock)
  
      const service = new PostService()
      const postId = 1;

      const result = await service.getLikes(postId);
      expect(result).toEqual(mock);
      expect(prisma.like.findMany).toHaveBeenCalledWith({
        where: {
          postId: postId,
        },
      });
    })
  })

  describe("like", () => {
    it("should like a post", async () => {
      const postData = {
        user: { connect: { id: 1 } },
        post: { connect: { id: 1 } },
      };
  
      const createdLike = {
        id: 1,
        userId: 1,
        postId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.spyOn(prisma.like, "create").mockResolvedValue(createdLike)
  
      const service = new PostService()

      const result = await service.like(1, 1);
      expect(result).toEqual(createdLike);
      expect(prisma.like.create).toHaveBeenCalledWith({ data: postData });
    })
  });

  describe("unlike", () => {
    it("should unlike a post", async () => {
      const postId = 1;
    const userId = 1;

    const deletedLike = {
      id: 1,
      postId: postId,
      userId: userId,
    };

      vi.spyOn(prisma.like, "delete").mockResolvedValue(deletedLike)
  
      const service = new PostService()

      const result = await service.unlike(1, 1);
      expect(result).toEqual(deletedLike);
      expect(prisma.like.delete).toHaveBeenCalledWith({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      });
    })
  });
})
