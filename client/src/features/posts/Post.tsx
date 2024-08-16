import type React from 'react';
import { useState } from 'react';
import { Card, Button, Skeleton } from 'antd';
import { CommentOutlined, EyeOutlined } from '@ant-design/icons';
import type { IPost } from './post.type';
import { Comments } from '../comments/Comments';
import AddCommentModal from '../comments/AddCommentModal';
import { useQueryClient } from '@tanstack/react-query';
import type { IComment } from '../comments/comment.type';
import { Like } from '../likes/Like';
import { useFetchPostComments } from './postHooks';

const { Meta } = Card;

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {

  const [showComment, setShowComment] = useState(false); 
  const [enableAllComment, setEnableAllComment] = useState(true); 
  const queryClient = useQueryClient();
  const [limit, setLimit] = useState(2);
  const { isPending, error, data: comments } = useFetchPostComments(post.id, limit)

  // If a comment has done added manually, and user click view all. The added comment will disapear due to the mock API
  const handleLoadMore = () => {
    setLimit(100); // Assume no more than 100 comments in our example
    setEnableAllComment(false);
  };

 


  const handleComment = () => {
    setShowComment(prevShowComment => !prevShowComment);
  };

  const handleCloseAddComment = () => {
    setShowComment(false);
  };

  const handleAddCommentSuccess = (newComment: IComment) => {
    setShowComment(false);
    const cacheKey = enableAllComment ? `comments-fetchAll-postId=${post.id}&_limit=1` : `comments-fetchAll-postId=${post.id}&_limit=100`;
  
    queryClient.setQueryData([cacheKey], (oldData: IComment[]) => {
      return [newComment, ...(oldData || [])];
    });
    
  };

  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '20px auto' }}>
      <Card
        actions={[
          <Like postId={post.id}></Like>,
          <Button
            key="comments"
            onClick={handleComment}
            icon={<CommentOutlined />}
          >
            Comment
          </Button>,
          <Button
          key="more"
          disabled={!enableAllComment}
          onClick={handleLoadMore}
          icon={<EyeOutlined/>}
        >
          All comments
        </Button>,
        ]}
      >
        <Meta
          title={post.title}
          description={post.content}
        />
      </Card>
      <Card  style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {isPending && <Skeleton active paragraph={{ rows: 3 }} />}
      {error && <div>Error...</div>}
      {!isPending && !error && <Comments comments={comments} />}
      </Card>

      {showComment && <AddCommentModal postId={post.id} onClose={handleCloseAddComment} onSuccess={handleAddCommentSuccess}></AddCommentModal>}
     
    </div>
  );
};
