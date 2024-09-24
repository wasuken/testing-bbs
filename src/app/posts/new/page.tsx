"use client";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";

const NewPost: React.FC = () => {
  const router = useRouter();

  const handlePostSubmit = async (
    title: string,
    content: string,
    author: string,
  ) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author }),
    });

    if (response.ok) {
      router.push("/posts"); // 投稿一覧ページにリダイレクト
    } else {
      throw new Error("Failed to create post");
    }
  };

  return (
    <div>
      <h1>新規投稿</h1>
      <PostForm onSubmit={handlePostSubmit} submitButtonText="投稿する" />
    </div>
  );
};

export default NewPost;
