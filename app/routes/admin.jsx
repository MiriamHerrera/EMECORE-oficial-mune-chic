import { Outlet, Form, Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import { requireAdmin } from "~/utils/auth.server";

export async function loader({ request }) {
  await requireAdmin(request);
  return null;
}

export default function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/admin/inventory", label: "Inventario" },
    { to: "/admin/products", label: "Productos" },
    { to: "/admin/categories", label: "Categorías" },
    { to: "/admin/brands", label: "Marcas" },
  ];

  return (
    <div>
      {/* Nav desktop */}
      <nav className="bg-gray-100 p-4 mb-6 rounded flex gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-[#B88A1A] mr-4">Admin</Link>
          <div className="hidden md:flex gap-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:underline ${location.pathname.startsWith(link.to) ? "font-bold text-[#B88A1A]" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <Form method="post" action="/logout">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </Form>
        </div>
        {/* Botón menú móvil */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-7 h-7 text-[#B88A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-100 shadow-md py-4 px-6 space-y-4 mb-6 rounded">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block hover:underline ${location.pathname.startsWith(link.to) ? "font-bold text-[#B88A1A]" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Form method="post" action="/logout">
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Cerrar sesión
            </button>
          </Form>
        </div>
      )}
      <Outlet />
    </div>
  );
}