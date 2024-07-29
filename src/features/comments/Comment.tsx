import type React from 'react';
import { Avatar } from 'antd';
import './Comment.css';
import type { IComment } from './comment.type';

interface CommentProps {
  comment: IComment;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <Avatar
        src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${comment.email}`}
        alt={comment.name}
        className="comment-avatar"
      />
      <div className="comment-content">
        <div className="comment-author">{comment.email}</div>
        <div className="comment-body">{comment.body}</div>
      </div>
    </div>
  );
};
