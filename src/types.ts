export interface Post {
  id?: number
  title: string
  content: string
  author: string
  categoryId: number
  createdAt?: string
}

export interface Comment {
  id?: number
  post: Post
  content: string
  author: string
  createdAt?: string
}

export interface Category {
  id?: number
  title: string
  createdAt?: string
}

export interface CategoryListItem extends Category {
  count: number
}

export interface CategoryListProps {
  categories: CategoryListItem[]
}

export interface CommentListProps {
  comments: Comment[]
}

export interface NewCommentFormProps {
  onSubmit: (content: string, author: string) => void
  submitButtonText: string
}

export interface NewCategoryFormProps {
  onSubmit: (title: string) => void
  submitButtonText: string
}

export interface PostDetailProps {
  post: Post
  onDelete: () => void
  onEdit: () => void
}

export interface PostFormProps {
  initialPost: Post
  onSubmit: (
    title: string,
    content: string,
    author: string,
    categoryId: number,
  ) => void
  submitButtonText: string
  categories: Category[]
}

export interface PostListProps {
  posts: Post[]
}
