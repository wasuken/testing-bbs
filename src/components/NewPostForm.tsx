import { useState } from 'react';

interface NewPostFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!title || !content) {
      setError('タイトルと本文は必須です。');
      return;
    }

    try {
      await onSubmit(title, content);
    } catch (err) {
      setError('投稿に失敗しました。');
    }
  };

  return (
    <div>
      <h1>新規投稿</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">本文</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
};

export default NewPostForm;
