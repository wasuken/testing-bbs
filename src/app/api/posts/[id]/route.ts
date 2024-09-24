import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number } },
) {
  const post = await prisma.post.findFirst({
    where: {
      id: Number(params.id),
    },
  });

  if (!post) {
    return NextResponse.json(
      { message: "投稿が見つかりません。" },
      { status: 404 },
    );
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: number } },
) {
  const { title, content, author } = await req.json();

  if (!title || !content || !author) {
    return NextResponse.json(
      { message: "タイトルと内容とニックネームは必須です。" },
      { status: 400 },
    );
  }
  const newPost = await prisma.post.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title,
      content,
      author,
    },
  });
  if (!post) {
    return NextResponse.json(
      { message: "投稿が見つかりません。" },
      { status: 404 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } },
) {
  const deletePost = await prisma.post.delete({
    where: {
      id: Number(params.id),
    },
  });
  if (!deletePost) {
    return NextResponse.json(
      { message: "投稿が見つかりません。" },
      { status: 404 },
    );
  }
  return NextResponse.json({
    deletePost,
  });
}
