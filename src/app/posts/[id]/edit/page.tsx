"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";

const EditPostPage: React.FC = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const id = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nauthor = author;

    if (!title || !content) {
      setError("タイトルと内容は必須です。");
      return;
    }
    if (!author) nauthor = "noname";

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author: nauthor }),
    });

    if (response.ok) {
      router.push(`/posts/${id}`); // 編集後、投稿詳細ページにリダイレクト
    } else {
      setError("投稿の更新に失敗しました。");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>記事編集</h1>
      <PostForm
	initialPost={post}
        onSubmit={handlePostSubmit}
        submitButtonText="更新する"
      />
    </div>
  );
};

export default EditPostPage;
