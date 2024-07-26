import { Comment } from "./Comment";
import { useFetchCommentsByPost } from "./commentHook"

interface CommentsProps {
  postId: string;
}

export const Comments: React.FC<CommentsProps> = ({postId}) => {
  const { isPending, error, data: comments } = useFetchCommentsByPost(postId)

  if (isPending) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error :(</div>
  }

  return (
    <>
    <ul>
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  </>
  );
}