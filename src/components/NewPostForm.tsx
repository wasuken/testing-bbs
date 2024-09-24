import { useState } from "react";

interface NewPostFormProps {
  onSubmit: (title: string, content: string) => Promise<void>;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title || !content || !author) {
      setError("タイトルと本文とニックネームは必須です。");
      return;
    }

    try {
      await onSubmit(title, content, author);
    } catch (err) {
      setError("投稿に失敗しました。");
    }
  };

  return (
    <div>
      <h1>新規投稿</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">本文</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">ニックネーム</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
};

export default NewPostForm;
