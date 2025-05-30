export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-elegant mb-4">Muñe Chic</h3>
            <p className="text-gray-300">
              Tu boutique de confianza para encontrar las mejores marcas en moda y accesorios.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-elegant mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/productos" className="text-gray-300 hover:text-white transition-colors">Productos</a></li>
              <li><a href="/marcas" className="text-gray-300 hover:text-white transition-colors">Marcas</a></li>
              <li><a href="/nosotros" className="text-gray-300 hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="/contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-elegant mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>WhatsApp: +1234567890</li>
              <li>Email: info@munechic.com</li>
              <li>Dirección: Tu dirección aquí</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-secondary">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-secondary">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Muñe Chic. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 