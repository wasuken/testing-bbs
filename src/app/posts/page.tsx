"use client";
import PostList from "@/components/PostList";
import { useEffect, useState } from "react";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return <PostList posts={posts} />;
};

export default PostsPage;
