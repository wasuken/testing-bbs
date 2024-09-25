import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostFormProps } from '@/types'

const PostForm: React.FC<PostFormProps> = ({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  submitButtonText,
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title || !content) {
      setError("タイトルと内容は必須です。");
      return;
    }

    try {
      await onSubmit(title, content);
    } catch (err) {
      setError("投稿に失敗しました。");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Group className="mb-3" controlId="PostForm.Title">
        <Form.Label>タイトル</Form.Label>
        <Form.Control
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="PostForm.Content">
        <Form.Label>コンテンツ</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default PostForm;
