import type React from 'react';
import { useState } from 'react';
import { Card, Button } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons';
import type { IPost } from './post.type';
import { Comments } from '../comments/Comments';

const { Meta } = Card;

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false); 

  const handleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '20px auto' }}>
      <Card
        actions={[
          <Button
            key="like"
            icon={liked ? <LikeFilled /> : <LikeOutlined />}
            onClick={handleLike}
            type={liked ? 'primary' : 'default'} 
          >
            Like
          </Button>,
          <Button
            disabled={true}
            key="comments"
            icon={<CommentOutlined />}
          >
            Comment
          </Button>
        ]}
      >
        <Meta
          title={post.title}
          description={post.body}
        />
      </Card>
      <Card>
      <Comments postId={post.id} />
      </Card>
     
    </div>
  );
};
