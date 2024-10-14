'use client'
import CategoryList from '@/components/CategoryList'
import { useEffect, useState } from 'react'

// カテゴリ一覧を表示する
const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return <CategoryList categories={categories} />
}

export default CategoriesPage
