import React from "react";

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h2>投稿一覧</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </h3>
            <p>投稿者: {post.author}</p>
            <p>投稿日: {post.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
