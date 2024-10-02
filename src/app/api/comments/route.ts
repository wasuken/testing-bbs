import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(
  req: Request
) {
  const { postId, content, author } = await req.json();

  if (!content || postId) {
    return NextResponse.json(
      { message: "親Postとコメントは必須です。" },
      { status: 400 },
    );
  }

  const newComment = await prisma.comment.create({
    data: {
      postId,
      content,
      author,
    },
  });
  return NextResponse.json(newComment, { status: 201 });
}

export async function GET() {
  const comments = await prisma.comment.findMany({});
  return NextResponse.json(comments);
}
