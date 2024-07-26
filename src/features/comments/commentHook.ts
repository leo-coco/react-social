import { useFetchAll } from "../../services/baseHooks";
import type { IComment } from "./comment.type";

export const useFetchCommentsByPost = (postId: string) => {
  return useFetchAll<IComment>('comments', `postId=${postId}`);
};