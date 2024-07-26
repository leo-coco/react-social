import type { IComment } from "./comment.type";

interface CommentProps {
  comment: IComment;
}

export const Comment: React.FC<CommentProps> = ({comment}) => {
  return (
    <>
    <div>
      By:{comment.name}
    </div>
    <div>{comment.body}</div>
    <br></br>
    </>
  );
}