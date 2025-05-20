import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { useRef, useEffect } from "react";

// Loader: obtener todas las marcas
export async function loader() {
  const brands = await prisma.brand.findMany();
  return json({ brands });
}

// Action: crear y eliminar marcas
export async function action({ request }) {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "create") {
    const name = form.get("name");
    if (typeof name === "string" && name.trim()) {
      await prisma.brand.create({ data: { name } });
    }
  }

  if (intent === "delete") {
    const id = form.get("id");
    if (id) {
      await prisma.brand.delete({ where: { id: Number(id) } });
    }
  }

  return redirect("/admin/brands");
}

export default function AdminBrands() {
  const { brands } = useLoaderData();
  const inputRef = useRef(null);
  const navigation = useNavigation();

  // Limpiar el input después de crear
  useEffect(() => {
    if (navigation.state === "idle" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [navigation.state]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Marcas</h1>
      <p>Aquí puedes gestionar las marcas.</p>
      <Form method="post" className="mb-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          name="name"
          placeholder="Nueva marca"
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
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="px-4 py-2">{brand.name}</td>
              <td className="px-4 py-2">
                <Form method="post">
                  <input type="hidden" name="id" value={brand.id} />
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