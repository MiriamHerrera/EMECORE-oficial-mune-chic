import Layout from "~/components/Layout";

export default function Marcas() {
  const brands = [
    {
      id: 1,
      name: "Marca A",
      logo: "/images/brands/marca-a.png",
      description: "Líder en moda casual y accesorios para toda la familia.",
      categories: ["Ropa", "Accesorios"],
    },
    {
      id: 2,
      name: "Marca B",
      logo: "/images/brands/marca-b.png",
      description: "Especialistas en calzado de alta calidad y diseño.",
      categories: ["Zapatos"],
    },
    {
      id: 3,
      name: "Marca C",
      logo: "/images/brands/marca-c.png",
      description: "Fragancias exclusivas y perfumes de lujo.",
      categories: ["Perfumes"],
    },
    {
      id: 4,
      name: "Marca D",
      logo: "/images/brands/marca-d.png",
      description: "Ropa deportiva y casual de última tendencia.",
      categories: ["Ropa"],
    },
    // Add more brands as needed
  ];

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl font-elegant text-center mb-12">Nuestras Marcas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-video relative bg-gray-100">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-elegant mb-3">{brand.name}</h2>
                <p className="text-gray-600 mb-4">{brand.description}</p>
                <div className="flex flex-wrap gap-2">
                  {brand.categories.map((category) => (
                    <span
                      key={category}
                      className="bg-primary text-black px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-elegant mb-6">
            ¿Interesado en nuestras marcas?
          </h2>
          <p className="text-gray-600 mb-8">
            Visita nuestra tienda física para descubrir nuestra completa selección
            de productos de estas y más marcas exclusivas.
          </p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </Layout>
  );
} 