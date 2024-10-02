import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { title } = await req.json();
  const id = params.id;

  // 簡単なバリデーション
  if (!title || id) {
    return NextResponse.json(
      { message: "タイトルと内容とニックネームとカテゴリは必須です。" },
      { status: 400 },
    );
  }
  const newCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id);
  const category = await prisma.category.findFirst({
    where: {
      id,
    },
  });
  return NextResponse.json(category);
}
