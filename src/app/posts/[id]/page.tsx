"use client";
import PostDetail from "@/components/PostDetail";
import CommentList from "@/components/CommentList";
import NewCommentForm from "@/components/NewCommentForm";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PostPage: React.FC = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    router.push("/posts");
  };

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
  const handleCommentSubmit = async (content: string, author: string) => {
    const response = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, author }),
    });

    if (response.ok) {
      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]); // コメントを追加
    } else {
      throw new Error("Failed to submit comment");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <PostDetail
	post={post}
        onDelete={deletePost}
	onEdit={() => router.push(`/posts/${post.id}/edit`)}
      />
      <hr />
      <NewCommentForm onSubmit={handleCommentSubmit} />
      <hr />
      <CommentList comments={comments} />
    </>
  );
};

export default PostPage;
