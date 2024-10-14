import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PostFormProps } from '@/types'

const PostForm: React.FC<PostFormProps> = ({
  initialPost = {
    title: '',
    content: '',
    author: '',
    category: {
      id: -1,
    },
  },
  onSubmit,
  submitButtonText,
  categories,
}) => {
  const [title, setTitle] = useState<string>(initialPost.title)
  const [content, setContent] = useState<string>(initialPost.content)
  const [author, setAuthor] = useState<string>(initialPost.author)
  const [categoryId, setCategoryId] = useState<number>(
    initialPost.category.id ?? -1,
  )
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !content || title.length <= 0 || content.length <= 0) {
      setError('タイトルと内容は必須です。')
      return
    }

    try {
      await onSubmit(title, content, author, categoryId)
      setError(null)
    } catch (err) {
      setError('投稿に失敗しました。')
      console.error(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Group className="mb-3" controlId="PostForm.Nickname">
        <Form.Label>ニックネーム</Form.Label>
        <Form.Control
          type="author"
          value={author}
          placeholder="ニックネーム"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="PostForm.Category">
        <Form.Label>カテゴリ</Form.Label>
        <Form.Select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
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
          placeholder="タイトル"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="PostForm.Content">
        <Form.Label>コンテンツ</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="コンテンツ"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        {submitButtonText}
      </Button>
    </Form>
  )
}

export default PostForm
