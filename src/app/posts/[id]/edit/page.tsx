'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/PostForm'

const EditPostPage: React.FC = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const id = params.id
  const [post, setPost] = useState<Post | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`)
      const data = await response.json()
      setPost(data)
    }

    if (id) {
      fetchPost()
    }
  }, [id])
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`/api/categories`)
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  const handlePostSubmit = async (
    title: string,
    content: string,
    author: string,
  ) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, author }),
    })

    if (response.ok) {
      router.push(`/posts/${id}`) // 編集後、投稿詳細ページにリダイレクト
    } else {
      alert('failed: update')
    }
  }

  if (!post) return <p>Loading...</p>

  return (
    <div>
      <h1>記事編集</h1>
      <PostForm
        initialPost={post}
        onSubmit={handlePostSubmit}
        submitButtonText="更新する"
        categories={categories}
      />
    </div>
  )
}

export default EditPostPage
