import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id)
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  })

  if (!post) {
    return NextResponse.json(
      { message: '投稿が見つかりません。' },
      { status: 404 },
    )
  }

  return NextResponse.json(post)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: number } },
) {
  const { title, content, author, categoryId } = await req.json()
  const id = Number(params.id)

  if (!title || !content || categoryId) {
    return NextResponse.json(
      { message: 'タイトルと内容とカテゴリは必須です。' },
      { status: 400 },
    )
  }
  const post = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
      author,
      categoryId,
    },
  })
  if (!post) {
    return NextResponse.json(
      { message: '投稿が見つかりません。' },
      { status: 404 },
    )
  }
  return NextResponse.json({ post })
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id)
  const deletePost = await prisma.post.delete({
    where: {
      id,
    },
  })
  if (!deletePost) {
    return NextResponse.json(
      { message: '投稿が見つかりません。' },
      { status: 404 },
    )
  }
  return NextResponse.json({
    deletePost,
  })
}
