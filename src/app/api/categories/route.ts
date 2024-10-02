import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title } = await req.json();

  // 簡単なバリデーション
  if (!title) {
    return NextResponse.json(
      { message: "カテゴリ名は必須です。" },
      { status: 400 },
    );
  }
  const newPost = await prisma.category.create({
    data: {
      title,
    },
  });

  return NextResponse.json(newPost, { status: 201 });
}

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}
