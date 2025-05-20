import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";

// Loader: obtener todos los productos con su marca
export async function loader() {
  const products = await prisma.product.findMany({
    include: { brand: true },
    orderBy: { created_at: "desc" },
  });
  return json({ products });
}

export default function AdminProducts() {
  const { products } = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <p>Aquí puedes gestionar los productos del catálogo.</p>
      <div className="my-6">
        <Link
          to="/admin/products/new"
          className="bg-[#B88A1A] text-white px-4 py-2 rounded hover:bg-[#a07616]"
        >
          Nuevo producto
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estado
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.brand?.name || "—"}</td>
                  <td className="px-6 py-4">
                    {product.price != null && !isNaN(Number(product.price))
                      ? `$${Number(product.price).toFixed(2)}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="text-[#B88A1A] hover:underline mr-3"
                    >
                      Editar
                    </Link>
                    {/* Puedes agregar botón de eliminar aquí */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}