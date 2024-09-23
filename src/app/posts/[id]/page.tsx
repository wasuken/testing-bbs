"use client"
import PostDetail from '@/components/PostDetail';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // URLから投稿IDを取得
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    const fetchComments = async () => {
      const response = await fetch(`/api/posts/${id}/comments`);
      const data = await response.json();
      setComments(data);
    };

    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <PostDetail
      title={post.title}
      content={post.content}
      author={post.author}
      createdAt={post.createdAt}
      comments={comments}
    />
  );
};

export default PostPage;
