import React from "react";

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h2>コメント</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <p>投稿者: {comment.author}</p>
            <p>投稿日: {comment.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
