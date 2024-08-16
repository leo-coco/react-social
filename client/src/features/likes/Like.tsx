import { Button } from "antd";
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { selectLikes, likeAsync } from "./likesSlice";

interface LikeProps {
  postId: string;
}

export const Like: React.FC<LikeProps> = ({postId}) => {
  const dispatch = useAppDispatch()
  const likes = useAppSelector(selectLikes)

  const [liked, setLiked] = useState(false); 
  
  const handleLike = (postId: string) => {
    setLiked(prevLiked => !prevLiked);
    dispatch(likeAsync(postId))
  };



  return (
    <Button
      key="like"
      icon={liked ? <LikeFilled /> : <LikeOutlined />}
      onClick={() => handleLike(postId)}
      type={liked ? 'primary' : 'default'} 
    >
     Like {likes(postId)}
    </Button>
  );
}