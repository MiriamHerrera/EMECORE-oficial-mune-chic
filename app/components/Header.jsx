import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-elegant text-secondary font-bold tracking-wide">
          Muñe Chic
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link to="/productos" className="text-black hover:text-secondary transition-colors font-medium">Productos</Link>
          <Link to="/marcas" className="text-black hover:text-secondary transition-colors font-medium">Marcas</Link>
          <Link to="/nosotros" className="text-black hover:text-secondary transition-colors font-medium">Nosotros</Link>
          <Link to="/contacto" className="text-black hover:text-secondary transition-colors font-medium">Contacto</Link>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
          <Link to="/productos" className="block text-black hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Productos</Link>
          <Link to="/marcas" className="block text-black hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Marcas</Link>
          <Link to="/nosotros" className="block text-black hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Nosotros</Link>
          <Link to="/contacto" className="block text-black hover:text-secondary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </div>
      )}
    </header>
  );
} 