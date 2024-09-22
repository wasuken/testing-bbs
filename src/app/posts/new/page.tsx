"use client";
import NewPostForm from '@/components/NewPostForm';
import { useRouter } from 'next/navigation';

const NewPost: React.FC = () => {
  const router = useRouter();

  const handlePostSubmit = async (title: string, content: string) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      router.push('/posts'); // 投稿一覧ページにリダイレクト
    } else {
      throw new Error('Failed to create post');
    }
  };

  return <NewPostForm onSubmit={handlePostSubmit} />;
};

export default NewPost;
