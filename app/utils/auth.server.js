import { redirect } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";

// Crear el almacenamiento de sesión
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cr3t"], // Cambia esto por una clave secreta segura
    secure: process.env.NODE_ENV === "production",
  },
});

// Función para obtener la sesión
export async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function requireAdmin(request) {
  const session = await getSession(request);
  const isAdmin = session.get("isAdmin");

  if (!isAdmin) {
    // Asegurarnos de que la URL de redirección sea absoluta
    const url = new URL(request.url);
    const redirectTo = `/login?redirectTo=${encodeURIComponent(url.pathname)}`;
    throw redirect(redirectTo);
  }
}

// Función para crear una sesión de administrador
export async function createAdminSession(adminId, redirectTo) {
  const session = await sessionStorage.getSession();
  session.set("isAdmin", true);
  session.set("adminId", adminId);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

// Función para destruir la sesión
export async function destroySession(request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function action({ request }) {
  return destroySession(request);
}

export async function loader() {
  return redirect("/login");
}
