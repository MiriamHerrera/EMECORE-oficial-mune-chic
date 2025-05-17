
export default function Nosotros() {
  const values = [
    {
      title: "Calidad",
      description: "Nos comprometemos a ofrecer productos de la más alta calidad, seleccionando cuidadosamente cada marca y artículo.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Servicio",
      description: "Brindamos una atención personalizada y asesoramiento experto para ayudarte a encontrar lo que buscas.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
    {
      title: "Variedad",
      description: "Ofrecemos una amplia selección de productos para toda la familia, desde ropa hasta accesorios y perfumes.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
    },
  ];

  return (
      <div className="container-custom py-12">
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-primary mb-16">
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-elegant mb-6">
                Nuestra Historia
              </h1>
              <p className="text-xl">
                Más de 10 años brindando estilo y calidad a nuestros clientes
              </p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-elegant mb-6">¿Quiénes Somos?</h2>
          <p className="text-gray-600 mb-4">
            Muñe Chic nació con la visión de crear un espacio donde la moda y la
            calidad se encuentren para ofrecer lo mejor a nuestros clientes. Desde
            nuestros inicios, nos hemos dedicado a seleccionar cuidadosamente
            cada producto que ofrecemos, asegurando que cumpla con nuestros
            estándares de calidad y estilo.
          </p>
          <p className="text-gray-600 mb-4">
            A lo largo de los años, hemos crecido y evolucionado, pero siempre
            manteniendo nuestros valores fundamentales y el compromiso con
            nuestros clientes. Hoy, nos enorgullece ser una boutique de
            referencia en la comunidad, ofreciendo una experiencia de compra
            única y productos de las mejores marcas.
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-elegant text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <div className="text-secondary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-elegant mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Store Photos */}
        <div className="mb-16">
          <h2 className="text-3xl font-elegant text-center mb-12">
            Nuestra Tienda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-gray-200 rounded-lg">
              {/* Replace with actual store image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Imagen de la tienda 1
              </div>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg">
              {/* Replace with actual store image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Imagen de la tienda 2
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-elegant mb-6">
            ¿Quieres conocernos mejor?
          </h2>
          <p className="text-gray-600 mb-8">
            Visita nuestra tienda física y descubre por qué somos la boutique de
            confianza de tantas familias.
          </p>
          <div className="space-x-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-block"
            >
              Contactar por WhatsApp
            </a>
            <a
              href="/contacto"
              className="btn-primary inline-block"
            >
              Ver Ubicación
            </a>
          </div>
        </div>
      </div>
  );
} 