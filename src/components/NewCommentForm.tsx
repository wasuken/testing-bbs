import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NewCommentFormProps } from "@/types";

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
      console.error(err);
      setError("コメントの投稿に失敗しました。");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>コメント一覧</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Group className="mb-3" controlId="PostForm.Author">
        <Form.Label>ニックネーム</Form.Label>
        <Form.Control
          type="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="NewCommentForm.Title">
        <Form.Label>コメント</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        コメントを投稿
      </Button>
    </Form>
  );
};

export default NewCommentForm;
