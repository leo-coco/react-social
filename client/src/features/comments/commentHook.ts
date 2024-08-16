import { useFetchAll } from "../../services/baseHooks";
import type { IComment } from "./comment.type";

export const useFetchCommentsByPost = (postId: string, limit = 0) => {
  const url = limit ? `postId=${postId}&_limit=${limit}` : `postId=${postId}`
  return useFetchAll<IComment>('comments', url);
};