import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { useRef, useEffect } from "react";

// Loader: obtener todas las categorías
export async function loader() {
  try {
    const categories = await prisma.category.findMany();
    return json({ categories });
  } catch (error) {
    console.error(error);
    throw new Response("Error cargando categorías", { status: 500 });
  }
}

// Action: crear, actualizar y eliminar
export async function action({ request }) {
  try {
    const form = await request.formData();
    const intent = form.get("intent");

    if (intent === "create") {
      const name = form.get("name");
      if (typeof name === "string" && name.trim()) {
        await prisma.category.create({ data: { name } });
      }
    }

    if (intent === "delete") {
      const id = form.get("id");
      if (id) {
        await prisma.category.delete({ where: { id: Number(id) } });
      }
    }

    return redirect("/admin/categories");
  } catch (error) {
    console.error(error);
    throw new Response("Error en acción de categorías", { status: 500 });
  }
}

export default function AdminCategories() {
  const { categories } = useLoaderData();
  const inputRef = useRef(null);
  const navigation = useNavigation();

  // Limpiar el input cuando la navegación termine (después de crear)
  useEffect(() => {
    if (navigation.state === "idle" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [navigation.state]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <p>Aquí puedes gestionar las Categories de los clientes.</p>
      <Form method="post" className="mb-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          name="name"
          placeholder="Nueva categoría"
          className="border rounded px-2 py-1"
          required
        />
        <button
          type="submit"
          name="intent"
          value="create"
          className="bg-[#B88A1A] text-white px-4 py-1 rounded"
        >
          Crear
        </button>
      </Form>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td className="px-4 py-2">{cat.name}</td>
              <td className="px-4 py-2">
                <Form method="post">
                  <input type="hidden" name="id" value={cat.id} />
                  <button
                    type="submit"
                    name="intent"
                    value="delete"
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}