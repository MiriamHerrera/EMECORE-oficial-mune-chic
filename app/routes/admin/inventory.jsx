// app/routes/admin/inventory.jsx
import { json, redirect } from "@remix-run/node";
import { requireAdmin } from "~/utils/auth.server";

export async function loader({ request }) {
  // First check if user is authenticated
  await requireAdmin(request);
  
  // Then redirect to the index route
  return redirect("/admin/inventory/index");
}

export default function Inventory() {
  return null;
}