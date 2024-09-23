import fs from 'fs';
import path from 'path';

abstract class AbstractStorage<T> {
  protected items: T[];
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(process.cwd(), 'data', fileName);
    this.items = this.loadItems();
  }

  // アイテムを読み込む
  protected loadItems(): T[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(fileContents);
  }

  // アイテムを保存する
  protected saveItems() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2));
  }

  // アイテムを追加する
  public abstract addItem(item: T): T;

  // アイテム一覧を取得する
  public getAllItems() {
    return this.items;
  }

  // 特定のアイテムを取得する
  public getItemById(id: number) {
    return this.items.find(item => (item as any).id === id);
  }

  // 特定のアイテムを削除する
  public deleteItemById(id: number) {
    let result = true;
    try {
      this.items = this.items.filter(item => (item as any).id !== id);
      this.saveItems();
    } catch (e) {
      console.error(e);
      result = false;
    }
    return result;
  }
}

export default AbstractStorage;
