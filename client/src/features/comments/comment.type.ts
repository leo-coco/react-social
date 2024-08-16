export interface IComment {
  id: string;
  postId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
  }
}