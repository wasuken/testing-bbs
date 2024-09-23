import AbstractStorage from './AbstractStorage';
import { Comment } from '@/types';

class CommentStorage extends AbstractStorage<Comment> {
  constructor() {
    super('comments.json');
  }

  public addComment(post_id: number, content: string, author: string) {
    const newComment: Comment = {
      id: this.items.length + 1,
      post_id,
      content,
      author,
      createdAt: new Date().toISOString(),
    };

    this.items.push(newComment);
    this.saveItems();
    return newComment;
  }
}

export default new CommentStorage();
