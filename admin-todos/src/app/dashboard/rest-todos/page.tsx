import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Todos",
};
export default async function RestTodosPage() {
  //*No vemos la necesidad de Usar el UseEffect
  //*Si podemos ya tenerlo antes de que cree la pantalla
  //*Aprovechando Server Components
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc",
    },
  });
  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((resp) => resp.json())
  //     .then(console.log);
  // }, []);

  return (
    <div>
      {/* Formulario para Agregar */}
      <div className="w-full px-10 mx-10 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
