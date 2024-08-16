import { useQuery } from "@tanstack/react-query";
import { useFetchAll } from "../../services/baseHooks";
import type { IPost } from "./post.type";
import { PostService } from "./postAPI";

export const useFetchPostsByUser = (userId: number) => {
  return useFetchAll<IPost>('posts', `userId=${userId}`);
};

export const useFetchPostComments = (postId: string, limit = 0) => {
    const service = new PostService(); 

    return useQuery({
      queryKey: ['posts', postId, 'comments', limit],
      queryFn: () => service.getComments(postId, limit),
    })
};

