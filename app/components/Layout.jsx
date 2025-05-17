import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  // Solo aplica fondo en la ruta de marcas
  const isBrandsRoute = location.pathname === "/marcas";

  return (
    <div
      className={
        "min-h-screen flex flex-col" +
        (isBrandsRoute ? " bg-mune bg-fixed bg-cover bg-center" : "")
      }
    >
      {/* Solo muestra el Header si NO es ruta admin */}
      {!isAdminRoute && <Header />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 shadow-xl">
        {children}
      </main>
      {/* Puedes ocultar el Footer en admin si quieres */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}