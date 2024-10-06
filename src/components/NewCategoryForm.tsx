import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CategoryFormProps } from "@/types";

const NewCategoryForm: React.FC<CategoryFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("タイトルは必須です。");
      return;
    }

    try {
      await onSubmit(title);
    } catch (err) {
      setError("投稿に失敗しました。");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>カテゴリ作成</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Group className="mb-3" controlId="CategoryForm.Title">
        <Form.Label>タイトル</Form.Label>
        <Form.Control
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        登録
      </Button>
    </Form>
  );
};

export default NewCategoryForm;
