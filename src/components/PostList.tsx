import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { PostListProps} from '@/types';

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h2>投稿一覧</h2>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h3>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </h3>
            <p>投稿者: {post.author}</p>
            <p>投稿日: {post.createdAt}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PostList;
