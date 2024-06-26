import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      {
        message: " Take tiene que ser un Número",
      },
      { status: 400 }
    );
  }
  if (isNaN(skip)) {
    return NextResponse.json(
      {
        message: " Skip tiene que ser un Número",
      },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });
  return NextResponse.json(todos);
}

//*Configurando la Dependencia YUP
//*Cualquier Propiedad que no está en el postSchema dará error!
const postSchema = object({
  description: string().required(),
  complete: boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({ data: { complete, description } });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    return NextResponse.json("Borrados");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
