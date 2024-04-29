import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todoById = await prisma.todo.findFirst({
    where: {
      id: id,
    },
  });
  return todoById;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todoById = await getTodo(id);

  if (!todoById)
    return NextResponse.json(
      { message: `Todo con Id '${id}'  no Encontrado` },
      { status: 404 }
    );

  return NextResponse.json(todoById);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todoById = await getTodo(id);

  if (!todoById)
    return NextResponse.json(
      { message: `Todo con Id '${id}'  no Encontrado` },
      { status: 404 }
    );
  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        complete,
        description,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
