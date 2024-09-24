import { useState } from "react";

interface NewCommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    let nauthor = author;

    if (!content) {
      setError("コメントは必須です。");
      return;
    }
    if (!author) nauthor = "noname";

    try {
      await onSubmit(content, nauthor);
      setContent(""); // フォームをリセット
      setAuthor("");
    } catch (err) {
      setError("コメントの投稿に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="content">コメント</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
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
      <button type="submit">コメントを投稿</button>
    </form>
  );
};

export default NewCommentForm;
