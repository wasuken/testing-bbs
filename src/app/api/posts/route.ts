import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, content, author } = await req.json();

  // 簡単なバリデーション
  if (!title || !content || !author) {
    return NextResponse.json({ message: 'タイトルと内容とニックネームは必須です。' }, { status: 400 });
  }
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}
