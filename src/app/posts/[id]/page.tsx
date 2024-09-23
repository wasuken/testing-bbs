"use client"
import PostDetail from '@/components/PostDetail';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";


const PostPage: React.FC = ({ params }: { params: { id: number } }) => {
  const searchParams = useSearchParams();
  const id = params.id;
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    router.push('/posts');
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      console.log(data);
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
      onDelete={deletePost}
    />
  );
};

export default PostPage;
