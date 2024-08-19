import { useQuery } from "@tanstack/react-query";
import { useFetchAll, useFetchCursorBasedEntities } from "../../services/baseHooks";
import type { IPost, PostWithDetails } from "./post.type";
import { PostService } from "./postAPI";

export const useFetchPostsByUser = (userId: number) => {
  return useFetchAll<IPost>('posts', `userId=${userId}`);
};

export const useFetchCursorPostsByUser = (userId: number) => {
  return useFetchCursorBasedEntities<PostWithDetails>('posts', `userId=${userId}`);
};

export const useFetchPostComments = (postId: number, limit = 0) => {
    const service = new PostService(); 

    return useQuery({
      queryKey: ['posts', postId, 'comments', limit],
      queryFn: () => service.getComments(postId, limit),
    })
};

