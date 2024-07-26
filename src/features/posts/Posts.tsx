import withLoadingAndError from "../../hoc/withLoadingAndError";
import { useUser } from "../users/UserContext";
import { Post } from "./Post";
import type { IPost } from "./post.type";
import { useFetchPostsByUser } from "./postHooks";

interface PostProps {
  posts: IPost[];
}

const Posts: React.FC<PostProps> = ({ posts }) => {
  return (
    <>
      <button>Create a new post</button> When adding a post invalidate the query
      <ul>
        { posts.map(p => (
          <li>
            <Post post={p}></Post>
          </li>
          ))}
      </ul>
    </>
  );
};

const PostsWithLoadingAndError = withLoadingAndError(Posts);

export const PostsContainer = () => {
  const userContext = useUser();
  const { isPending, error, data: posts } = useFetchPostsByUser(userContext?.id)


  return (
    <PostsWithLoadingAndError
    isPending={isPending}
    error={error}
    posts={posts || []}
    />
  )
}