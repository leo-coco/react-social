import { Button } from "antd";
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { PostService } from "../posts/postAPI";
import { useUser } from "../users/UserContext";
import useNotification from "../../hooks/useNotification";

interface LikeProps {
  postId: number;
  count: number;
  hasLiked: boolean;
}

export const Like: React.FC<LikeProps> = ({postId, count, hasLiked}) => {
  const userContext = useUser();
  const { openNotification } = useNotification();

  const [liked, setLiked] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setLiked(hasLiked);
  }, [hasLiked]);

  const likePost = useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) => {
      const service = new PostService();
      setIsLoading(true);
      if (!liked) {
        return service.like(postId, userId);
      }
      return service.dislike(postId, userId);
    
    },
    onSuccess: (data: any) => {
      setLiked(prevLiked => !prevLiked);
      setIsLoading(false);
    },
    onError: (error: any) => {
      setIsLoading(false);
      openNotification('error', error.message);
    },
  });
  
  const handleLike = (postId: number) => {
    if (userContext) {
      likePost.mutate({ postId, userId: userContext.id });
    }
  };

  return (
    <Button
      key="like"
      loading={isLoading}
      icon={liked ? <LikeFilled /> : <LikeOutlined />}
      onClick={() => handleLike(postId)}
      type={liked ? 'primary' : 'default'} 
    >
     Like
    </Button>
  );
}