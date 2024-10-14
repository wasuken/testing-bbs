import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NewCategoryFormProps } from '@/types'

const NewCategoryForm: React.FC<NewCategoryFormProps> = ({
  onSubmit,
  submitButtonText,
}) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || title.length <= 0) {
      setError('タイトルは必須です。')
      return
    }

    try {
      await onSubmit(title)
      setError(null)
    } catch (err) {
      setError('投稿に失敗しました。')
      console.error(err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>カテゴリ作成</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Group className="mb-3" controlId="CategoryForm.Title">
        <Form.Label>タイトル</Form.Label>
        <Form.Control
          placeholder="タイトル"
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        {submitButtonText}
      </Button>
    </Form>
  )
}

export default NewCategoryForm
