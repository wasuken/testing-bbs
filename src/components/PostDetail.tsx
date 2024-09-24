import React from "react";
import { useRouter } from "next/navigation";

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

interface PostDetailProps {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  onDelete: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({
  id,
  title,
  content,
  author,
  createdAt,
  onDelete,
}) => {
  const router = useRouter();
  return (
    <div>
      <h1>
        {title}
        <button onClick={onDelete}>削除</button>
        <button
          onClick={() => {
            router.push(`/posts/${id}/edit`);
          }}
        >
          更新
        </button>
      </h1>
      <div>{content}</div>
      <div>投稿者: {author}</div>
      <div>投稿日: {createdAt}</div>
    </div>
  );
};

export default PostDetail;
