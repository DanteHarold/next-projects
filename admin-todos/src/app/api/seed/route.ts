import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); //*delete * from todo
  await prisma.todo.createMany({
    data: [
      {
        description: "Priedra del Alma",
        complete: true,
      },
      {
        description: "Priedra del Poder",
      },
      {
        description: "Priedra del Tiempo",
      },
      {
        description: "Priedra del Espacio",
      },
      {
        description: "Priedra del Realidad",
      },
    ],
  });
  //   const todo = await prisma.todo.create({
  //     data: { description: "Piedra del Alma", complete: true },
  //   });
  return NextResponse.json({ message: "Seed Executed" });
}
