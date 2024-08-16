import { Comment } from "./Comment";
import type { IComment } from "./comment.type";

interface CommentsProps {
  comments: IComment[];
}

export const Comments: React.FC<CommentsProps> = ({comments}) => {

  return (
    <>
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
  </>
  );
}