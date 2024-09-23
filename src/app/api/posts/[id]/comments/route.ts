import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { content, author } = await req.json();

  if (!content) {
    return NextResponse.json({ message: 'コメントは必須です。' }, { status: 400 });
  }

  const newcomment = await prisma.comment.create({
    data: {
      postId: Number(params.id),
      content,
      author,
    }
  })
  return NextResponse.json(newComment, { status: 201 });
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(params.id),
    }
  })
  return NextResponse.json(comments);
}
