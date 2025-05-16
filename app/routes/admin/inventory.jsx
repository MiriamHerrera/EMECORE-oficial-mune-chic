// app/routes/admin/inventory.jsx
import { redirect } from "@remix-run/node";
import { json } from "express";

export const loader = () => {
    // return json({ redirect: '/login' });

  return redirect("/admin/inventory/");
};

export default function() {
  return null;
}
