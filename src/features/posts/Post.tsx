import { useState } from "react";
import type { IPost } from "./post.type";
import { Comments } from "../comments/Comments";
import { Button } from "@nextui-org/react";

interface PostProps {
 post: IPost;
}

export const Post: React.FC<PostProps> = ({post}) => {
  const [showComment, setShowComment] = useState(false)

  const handleClick = () => {
    setShowComment(showComment => !showComment)
  }

  return (
    <>
      <h1>{post.title}</h1>
      <span>{post.body}</span>
      <Button color="danger" onClick={handleClick}>{showComment ? 'Hide comments' : 'Show comments'}</Button>

      {showComment && <Comments postId={post.id} />}

    
    </>
  );
}