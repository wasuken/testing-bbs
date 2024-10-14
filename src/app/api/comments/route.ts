import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { postId, content, author } = await req.json()

  if (!content || !postId) {
    return NextResponse.json(
      { message: '親Postとコメントは必須です。' },
      { status: 400 },
    )
  }

  const newComment = await prisma.comment.create({
    data: {
      postId: Number(postId),
      content,
      author,
    },
  })
  return NextResponse.json(newComment, { status: 201 })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const postId = Number(searchParams.get('postId'))
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  })
  return NextResponse.json(comments)
}
