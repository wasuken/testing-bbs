import AbstractStorage from './AbstractStorage';
import { Post } from '@/types';

class PostStorage extends AbstractStorage<Post> {
  constructor() {
    super('posts.json');
  }

  public addPost(title: string, content: string, author: string, createdAt?: string) {
    const newPost: Post = {
      id: this.items.length + 1,
      title,
      content,
      author,
      createdAt: createdAt ?? new Date().toISOString(),
    };

    this.items.push(newPost);
    this.saveItems();
    return newPost;
  }
}

export default new PostStorage();
