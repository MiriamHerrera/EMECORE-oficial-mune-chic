import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { createAdminSession } from "~/utils/auth.server";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/admin/inventory";

  // Aquí deberías implementar tu lógica de autenticación real
  // Por ahora, usaremos credenciales de prueba
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <Form method="post" className="mt-8 space-y-6">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          {actionData?.error && (
            <div className="text-red-500 text-center">{actionData.error}</div>
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
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#B88A1A] focus:border-[#B88A1A] focus:z-10 sm:text-sm"
                placeholder="Username"
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
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#B88A1A] focus:border-[#B88A1A] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#B88A1A] hover:bg-[#a07616] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B88A1A]"
            >
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
