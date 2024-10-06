import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { title, content, author, categoryId } = await req.json();

  // 簡単なバリデーション
  if (!title || !content || !categoryId) {
    return NextResponse.json(
      { message: "タイトルと内容とカテゴリは必須です。" },
      { status: 400 },
    );
  }
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author: author ?? "",
      categoryId,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const categoryId = Number(searchParams.get("categoryId"));
  const posts = await prisma.post.findMany({
    where: {
      categoryId,
    },
  });
  return NextResponse.json(posts);
}
