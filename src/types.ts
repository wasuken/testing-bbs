export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  post_id: number;
  content: string;
  author: string;
  createdAt: string;
}

export interface CommentListProps {
  comments: Comment[];
}

export interface NewCommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export interface PostDetailProps {
  post: Post;
  onDelete: () => void;
  onEdit: () => void;
}

export interface PostFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialAuthor?: string;
  onSubmit: (title: string, content: string) => Promise<void>;
  submitButtonText: string;
}

export interface PostListProps {
  posts: Post[];
}
