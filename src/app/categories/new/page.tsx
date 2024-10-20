'use client'
import NewCategoryForm from '@/components/NewCategoryForm'

// カテゴリを作成する
const CategoryPage: React.FC = () => {
  const postCategory = async (category: string) => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify({
        title: category,
      }),
    })
    if (!response.ok) {
      alert(`error: request failed.`)
    }
    await response.json()
  }

  return <NewCategoryForm onSubmit={postCategory} submitButtonText="作成" />
}

export default CategoryPage
