export interface IPost {
  id?: string;
  userId: string;
  title: string;
  content: string;
}


export type PostWithDetails = {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  hasLiked: boolean;
  likeCount: number;
  commentCount: number;
};