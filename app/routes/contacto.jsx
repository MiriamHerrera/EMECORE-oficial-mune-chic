import Layout from "~/components/Layout";

export default function Contacto() {
  const contactInfo = {
    address: "Tu dirección aquí",
    phone: "+1234567890",
    email: "info@munechic.com",
    hours: [
      { day: "Lunes - Viernes", hours: "9:00 AM - 8:00 PM" },
      { day: "Sábado", hours: "9:00 AM - 6:00 PM" },
      { day: "Domingo", hours: "Cerrado" },
    ],
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl font-elegant text-center mb-12">Contacto</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-elegant mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Dirección</h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Teléfono</h3>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Horario de Atención</h3>
                  <ul className="space-y-2">
                    {contactInfo.hours.map((schedule) => (
                      <li key={schedule.day} className="text-gray-600">
                        <span className="font-medium">{schedule.day}:</span>{" "}
                        {schedule.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-center block"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-elegant mb-6">Ubicación</h2>
              <div className="aspect-video bg-gray-200 rounded-lg">
                {/* Replace with actual Google Maps embed */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Mapa de Google Maps
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-elegant mb-6">Síguenos en Redes Sociales</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-secondary transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-secondary transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
} 