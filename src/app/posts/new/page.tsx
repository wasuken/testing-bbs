'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PostForm from '@/components/PostForm'

const NewPost: React.FC = () => {
  const router = useRouter()
  const [categories, setCategories] = useState([])

  const handlePostSubmit = async (
    title: string,
    content: string,
    author: string,
    categoryId: number,
  ) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, author, categoryId }),
    })

    if (response.ok) {
      // 投稿一覧ページ(登録したカテゴリ)にリダイレクト
      router.push(`/posts?categoryId=${categoryId}`)
    } else {
      throw new Error('Failed to create post')
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div>
      <h1>新規投稿</h1>
      <PostForm
        onSubmit={handlePostSubmit}
        submitButtonText="投稿する"
        categories={categories}
      />
    </div>
  )
}

export default NewPost
