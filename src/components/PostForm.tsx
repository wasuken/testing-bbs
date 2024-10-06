import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostFormProps } from "@/types";

const PostForm: React.FC<PostFormProps> = ({
  initialTitle = "",
  initialContent = "",
  initialAuthor = "",
  initialCategoryId = -1,
  onSubmit,
  submitButtonText,
  categories,
}) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [author, setAuthor] = useState<string>(initialAuthor);
  const [categoryId, setCategoryId] = useState<string>(initialCategoryId);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title || !content) {
      setError("タイトルと内容は必須です。");
      return;
    }

    try {
      await onSubmit(title, content, author, categoryId);
    } catch (err) {
      console.error(err);
      setError("投稿に失敗しました。");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form.Group className="mb-3" controlId="PostForm.Title">
        <Form.Label>ニックネーム</Form.Label>
        <Form.Control
          type="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="PostForm.Title">
        <Form.Label>カテゴリ</Form.Label>
        <Form.Select
          defaultValue={categoryId}
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          required
        >
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
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
