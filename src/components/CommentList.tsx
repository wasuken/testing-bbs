import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Comment, CommentListProps } from "@/types";

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h2>コメント</h2>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>
            <div>{comment.content}</div>
            <div>投稿者: {comment.author}</div>
            <div>投稿日: {comment.createdAt}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentList;
