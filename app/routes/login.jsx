import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { createAdminSession } from "~/utils/auth.server";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/admin/inventory";

  if (username === "admin" && password === "admin123") {
    return createAdminSession(1, redirectTo);
  }

  return json({ error: "Invalid credentials" }, { status: 400 });
}

export default function Login() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin/inventory";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7e6] to-[#f3e0c7]">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl border border-[#f5e2b8]">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 mb-2"
            style={{ objectFit: "contain" }}
          />
          <h2 className="text-center text-3xl font-extrabold text-[#B88A1A]">
            Admin Login
          </h2>
          <p className="text-gray-500 text-sm mt-1">Acceso exclusivo para administradores</p>
        </div>
        <Form method="post" className="mt-8 space-y-6">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          {actionData?.error && (
            <div className="text-red-600 text-center font-semibold bg-red-50 border border-red-200 rounded py-2 mb-2">
              {actionData.error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#B88A1A] focus:border-[#B88A1A] focus:z-10 sm:text-sm"
                placeholder="Usuario"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#B88A1A] focus:border-[#B88A1A] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-[#B88A1A] hover:bg-[#a07616] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B88A1A] transition"
            >
              Ingresar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}