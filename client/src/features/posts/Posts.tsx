import withLoadingAndError from "../../hoc/withLoadingAndError";
import type { IUser } from "../users/user.type";
import { useUser } from "../users/UserContext";
import AddPost from "./AddPost";
import { Post } from "./Post";
import type { IPost } from "./post.type";
import { useFetchPostsByUser } from "./postHooks";

interface PostProps {
  posts: IPost[];
}

interface PostsInternalContainerProps {
  userContext: IUser;
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

export const noUserContext = () => {
  return <div></div>;
}

export const PostsInternalContainer: React.FC<PostsInternalContainerProps>= ({ userContext }) => {
  const { isPending, error, data: posts } = useFetchPostsByUser(userContext?.id);

  return (
    <PostsWithLoadingAndError
      isPending={isPending}
      error={error}
      posts={posts || []}
    />
  );
}
export const PostsContainer = () => {
  const userContext = useUser();

  if (!userContext?.id) {
    return noUserContext();
  }

  return <PostsInternalContainer userContext={userContext} />;
}