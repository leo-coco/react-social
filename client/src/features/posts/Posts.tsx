import withLoadingAndError from "../../hoc/withLoadingAndError";
import { useUser } from "../users/UserContext";
import AddPost from "./AddPost";
import { Post } from "./Post";
import type { IPost } from "./post.type";
import { useFetchPostsByUser } from "./postHooks";

interface PostProps {
  posts: IPost[];
}

const Posts: React.FC<PostProps> = ({ posts }) => {
  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '20px auto' }}>
      <AddPost></AddPost>
        { posts.map(p => (
            <Post key={p.id} post={p}></Post>
          ))}
    </div>
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