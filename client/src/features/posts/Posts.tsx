import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import type { IUser } from "../users/user.type";
import { useUser } from "../users/UserContext";
import AddPost from "./AddPost";
import { Post } from "./Post";
import type { PostWithDetails } from "./post.type";
import { useFetchCursorPostsByUser } from "./postHooks";

interface PostProps {
  posts: PostWithDetails[];
  onLoadMore: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

interface PostsInternalContainerProps {
  userContext: IUser;
}

const Posts: React.FC<PostProps> = ({ posts, onLoadMore, isFetchingNextPage, hasNextPage }) => {
  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '20px auto' }}>
      <AddPost></AddPost>
        { posts.map(p => (
            <Post key={p.id} post={p}></Post>
          ))}
          {isFetchingNextPage && <div>Loading more...</div>}
          {!hasNextPage && !isFetchingNextPage && <div>No more posts</div>}
    </div>
  );
};

export const noUserContext = () => {
  return <div></div>;
}

export const PostsInternalContainer: React.FC<PostsInternalContainerProps> = ({ userContext }) => {
  const {  
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCursorPostsByUser(userContext?.id);

  useInfiniteScroll(hasNextPage, isFetchingNextPage, fetchNextPage);

  if (error) {
    return <div>Error loading posts.</div>;
  }

  const posts = data?.pages.flatMap(page => page.entities) || [];

  return (
    <Posts
        posts={posts}
        onLoadMore={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
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