import React from 'react';

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

interface PostDetailProps {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}

const PostDetail: React.FC<PostDetailProps> = ({ title, content, author, createdAt, comments }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
      <div>投稿者: {author}</div>
      <div>投稿日: {createdAt}</div>

      <h2>コメント</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <div>{comment.content}</div>
            <div>投稿者: {comment.author}</div>
            <div>投稿日: {comment.createdAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
