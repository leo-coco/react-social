import type React from "react"
import { Avatar } from "antd"
import "./Comment.css"
import type { IComment } from "./comment.type"

interface CommentProps {
  comment: IComment
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <Avatar
        src={`https://api.dicebear.com/9.x/miniavs/svg?seed=${comment.user.firstName}`}
        alt={comment.user.firstName}
        className="comment-avatar"
      />
      <div className="comment-content">
        <div className="comment-author">
          {comment.user.firstName} {comment.user.lastName}
        </div>
        <div className="comment-body">{comment.content}</div>
      </div>
    </div>
  )
}
