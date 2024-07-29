import type React from 'react';
import { useState } from 'react';
import { Card, Button } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons';
import type { IPost } from './post.type';
import { Comments } from '../comments/Comments';
import AddCommentModal from '../comments/AddComment';

const { Meta } = Card;

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false); 
  const [showComment, setShowComment] = useState(false); 

  const handleLike = () => {
    setLiked(prevLiked => !prevLiked);
  };

  const handleComment = () => {
    setShowComment(prevShowComment => !prevShowComment);
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
            key="comments"
            onClick={handleComment}
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

      {showComment && <AddCommentModal postId={post.id}></AddCommentModal>}
     
    </div>
  );
};
