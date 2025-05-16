import { Outlet, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { requireAdmin } from "~/utils/auth.server"; // Ajusta la ruta según tu proyecto

export async function loader({ request }) {
  // Si no está autenticado, redirige a login
  await requireAdmin(request); // Debe lanzar o redirigir si no hay sesión
  return null;
}

export default function AdminLayout() {
  return (
    <div>
     <nav className="bg-gray-100 p-4 mb-6 rounded flex gap-4 items-center">
        <a href="/admin/inventory" className="hover:underline">Inventario</a>
        <a href="/admin/products" className="hover:underline">Productos</a>
        <a href="/admin/categories" className="hover:underline">Categorías</a>
        <a href="/admin/brands" className="hover:underline">Marcas</a>
        <Form method="post" action="/logout">
          <button
            type="submit"
            className="ml-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </Form>
      </nav>
      <Outlet />
    </div>
  );
}