export interface IComment {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt: Date
  user: {
    firstName: string
    lastName: string
  }
}

export interface AddCommentPayload {
  postId: string
  userId: number
  content: string
}
