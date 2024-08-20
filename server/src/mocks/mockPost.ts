export const mockPosts = () => [
  {
    id: 1,
    title: "Post Title",
    content: "Post Content",
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Post Title",
    content: "Post Content",
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Post Title",
    content: "Post Content",
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockPostsWithDetails = () => mockPosts().map(p => ({
  ...p,
  likes: [{id: 1}, {id: 2}],
  _count: {
    likes: 2,
    comments: 3,
  }
}))

export const mockCursorBasedPostsReponse = (nextCursor = 2) => ({
  posts: mockPostsWithDetails(),
  meta: {
    nextCursor,
  }
})