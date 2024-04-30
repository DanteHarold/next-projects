"use client";
import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}
export const TodosGrid = ({ todos = [] }: Props) => {
  //*Importar de next/navigation, no  de de next/router
  const router = useRouter();

  //*Funcionalidad de Actualizar, sin necesidad de recargar next 13+
  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo(id, complete);
    console.log({ updatedTodo });
    router.refresh(); //*Refresca la ruta actual, sin destruir el estado de lo demas. nueva caracteristica de next 13+
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
