'use client'
import PostList from '@/components/PostList'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const PostsPage: React.FC = () => {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const url = `/api/posts` + (categoryId ? `?categoryId=${categoryId}` : '')
      const response = await fetch(url)
      const data = await response.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return <PostList posts={posts} />
}

export default PostsPage
