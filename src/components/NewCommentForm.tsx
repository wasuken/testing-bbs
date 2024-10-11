import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NewCommentFormProps } from "@/types";

const NewCommentForm: React.FC<NewCommentFormProps> = ({
  onSubmit,
  submitButtonText = "コメントを投稿",
}) => {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let nauthor = author;

    if (!content) {
      setError("コメントは必須です。");
      return;
    }
    if (!author) nauthor = "noname";

    try {
      await onSubmit(content, nauthor);
      setContent("");
      setAuthor("");
      setError(null);
    } catch (err) {
      setError("コメントの投稿に失敗しました。");
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Group className="mb-3" controlId="PostForm.Author">
        <Form.Label>ニックネーム</Form.Label>
        <Form.Control
          placeholder="ニックネーム"
          type="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="NewCommentForm.Comment">
        <Form.Label>コメント</Form.Label>
        <Form.Control
          placeholder="コメント"
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default NewCommentForm;
