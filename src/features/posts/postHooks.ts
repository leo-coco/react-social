import { useFetchAll } from "../../services/baseHooks";
import type { IPost } from "./post.type";

export const useFetchPostsByUser = (userId: string) => {
  return useFetchAll<IPost>('posts', `userId=${userId}`);
};