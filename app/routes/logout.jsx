import { redirect } from "@remix-run/node";
import { destroySession } from "~/utils/auth.server";

export async function action({ request }) {
  return destroySession(request);
}

export async function loader() {
  return redirect("/login");
}