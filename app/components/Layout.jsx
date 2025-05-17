import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Detecta si la ruta es admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Solo muestra el Header si NO es ruta admin */}
      {!isAdminRoute && <Header />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 shadow-xl">{children}</main>
      {/* Puedes ocultar el Footer en admin si quieres */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}