import { Button, Skeleton } from "antd";
import { Comment } from "./Comment";
import { useFetchCommentsByPost } from "./commentHook"
import { useState } from "react";

interface CommentsProps {
  postId: string;
}

export const Comments: React.FC<CommentsProps> = ({postId}) => {
  const [limit, setLimit] = useState(1);
  const { isPending, error, data: comments } = useFetchCommentsByPost(postId, limit)

  const handleLoadMore = () => {
    setLimit(100); // Assume no more than 100 comments in our example
  };

  if (isPending) {
    return <Skeleton active paragraph={{ rows: 3 }} />
  }
  if (error) {
    return <div>Error :(</div>
  }

  if (comments.length === 0) {
    return <></>
  }

  return (
    <>
    <Button type="text" onClick={handleLoadMore}>
        See all comments
      </Button>
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
  </>
  );
}