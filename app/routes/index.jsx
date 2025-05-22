import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";

export async function loader() {
  // Trae productos con marca y categorías
  const products = await prisma.product.findMany({
    where: { status: "active" },
    include: {
      brand: true,
      categories: {
        include: { category: true }
      },
      tags: {
        include: { tag: true }
      }
    },
    orderBy: { created_at: "desc" },
    take: 12 // los más recientes
  });

  // Trae todas las categorías
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" }
  });

  // Trae todas las marcas
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" }
  });

  return json({ products, categories, brands });
}

export default function Index() {
  const { products, categories, brands } = useLoaderData();

  // Mock de productos y categorías
  const mockProducts = [
    { id: 1, name: "Tenis Deportivos", price: 1299, img: "/images/tenis.png", desc: "Tenis deportivos de alta calidad para actividades diarias.", tag: "Nuevo" },
    { id: 2, name: "Blusa Elegante", price: 899, img: "/images/blusa.png", desc: "Blusa casual con diseño moderno para toda ocasión." },
    { id: 3, name: "Perfume Floral", price: 1599, img: "/images/perfume.png", desc: "Fragancia exclusiva con notas florales y cítricas." },
    { id: 4, name: "Collar Elegante", price: 2499, img: "/images/collar.png", desc: "Collar de plata con diseño contemporáneo y elegante." },
    { id: 5, name: "Bolso Elegante", price: 1899, img: "/images/bolso.png", desc: "Bolso espacioso con compartimentos y diseño sofisticado." },
    { id: 6, name: "Sandalias Veraniegas", price: 799, img: "/images/sandalias.png", desc: "Sandalias cómodas ideales para climas cálidos." },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between bg-[#FDE7EF] min-h-[60vh] px-6 py-16 md:py-24 shadow-md" style={{ fontFamily: 'Lora, serif', fontSize: '18px', border: 'solid 4px #d9a398' }}>
        {/* Columna Izquierda: Texto */}
        <div className="flex-1 max-w-xl z-10">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#222] leading-tight" style={{ fontFamily: 'Libre Baskerville, serif', letterSpacing: '0.01em' }}>
            Estilo y Elegancia<br />para Toda la Familia
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#444]" style={{ lineHeight: '1.6' }}>
            Descubre nuestra exclusiva colección de moda y accesorios con la mejor calidad y garantía.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Link
              to="/productos"
              className="bg-[#B88A1A] hover:bg-[#a07616] text-white font-bold py-3 px-8 rounded transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-[#B88A1A] focus:ring-offset-2 shadow-xl"
            >
              Ver Colección
            </Link>
            <Link
              to="/contacto"
              className="text-[#222] font-semibold py-3 px-8 rounded transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-[#B88A1A] focus:ring-offset-2 shadow-lg"
              style={{ border: 'solid 2px #b88a1a;' }}
            >
              Contáctanos
            </Link>
          </div>
        </div>
        {/* Columna Derecha: Imagen abstracta y tarjeta */}
        <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0">
          <div className="w-[350px] h-[250px] md:w-[420px] md:h-[300px] bg-[#ebc7a1] rounded-xl shadow-lg flex items-center justify-center relative shadow-xl" style={{ border: 'solid 4px #d9a398' }}>
            
          <img width="260" height="120" viewBox="0 0 180 120" fill="none" className="shadow-xl" src="https://i.pinimg.com/736x/25/62/7a/25627adcecab931a5766e6e9a728c16b.jpg"/>
            {/* <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="90" cy="60" rx="80" ry="40" fill="#EBC7A1" />
              <ellipse cx="120" cy="50" rx="30" ry="20" fill="#F7F3ED" />
              <ellipse cx="150" cy="80" rx="20" ry="15" fill="#EBC7A1" />
            </svg> */}
          </div>
          <div className="absolute bottom-4 right-4 bg-[#ffd2c9] rounded-lg shadow-xl px-6 py-4 text-[#222] w-[220px] md:w-[240px]" style={{ fontFamily: 'Lora, serif', fontSize: '16px', border: 'solid 5px #d9a398' }}>
            <div className="font-bold mb-1">Horario:</div>
            <div>Lun-Vie: 9:00 - 20:00<br />Sáb: 10:00 - 18:00</div>
            <div className="font-bold mt-3 mb-1">Ubicación:</div>
            <div>Av. Principal #123</div>
          </div>
        </div>
      </section>

      {/* Nuestro Inventario */}
      <section className="bg-white py-16 px-4" style={{ fontFamily: 'Lora, serif' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#222] mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>Nuestro Inventario</h2>
          <div className="h-1 w-16 bg-[#B88A1A] rounded mb-6"></div>
          <p className="text-lg text-[#444] mb-8">Explora nuestra amplia selección de productos de alta calidad para toda la familia.</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-5 py-2 rounded-full border border-[#fde3ec] text-black bg-[#ffd2c9] hover:bg-[#FDE7EF] focus:outline-none focus:ring-2 focus:ring-[#B88A1A] text-base font-semibold transition-colors`}
                type="button"
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {products.map((prod) => (
              <div key={prod.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start relative hover:shadow-lg transition-shadow">
                {prod.tags.map((t) => (
                  <span key={t.tag.id} className="absolute top-4 right-4 bg-[#B88A1A] text-white text-xs font-bold px-3 py-1 rounded-full">{t.tag.name}</span>
                ))}
                <div className="w-full flex justify-center mb-4">
                  <img src={prod.img} alt={prod.name} className="h-24 object-contain" />
                </div>
                <h3 className="text-lg font-serif text-[#222] mb-1" style={{ fontFamily: 'Libre Baskerville, serif' }}>{prod.name}</h3>
                <p className="text-[#444] text-sm mb-2 flex-1">{prod.desc}</p>
                <div className="text-[#B88A1A] font-bold text-lg mb-3">${prod.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
                <div className="text-[#444] text-sm mb-2">Marca: {prod.brand?.name}</div>
                <div className="text-[#444] text-sm mb-2">Categorías: {prod.categories.map((c) => c.category.name).join(", ")}</div>
                <div className="text-[#444] text-sm mb-2">Etiquetas: {prod.tags.map((t) => t.tag.name).join(", ")}</div>
                <Link
                  to={`/productos/${prod.id}`}
                  className="border border-[#B88A1A] text-[#B88A1A] px-5 py-2 rounded-full font-semibold hover:bg-[#B88A1A] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#B88A1A]"
                >
                  Ver detalles
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link
              to="/productos"
              className="bg-[#B88A1A] hover:bg-[#a07616] text-white font-bold py-3 px-10 rounded transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-[#B88A1A] focus:ring-offset-2"
            >
              Ver más productos
            </Link>
          </div>
        </div>
      </section>

      {/* Nuestras Marcas */}
      <section
  className="relative py-16 px-4 overflow-hidden"
  style={{
    fontFamily: 'Lora, serif',
    backgroundImage: "url('/images/fondo2.jpg')", // Cambia la ruta si tu imagen está en otro lugar
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="max-w-6xl mx-auto bg-transparent rounded-xl p-8">
    <h2 className="text-3xl md:text-4xl font-serif text-[#222] mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>Nuestras Marcas</h2>
    <div className="h-1 w-16 bg-[#B88A1A] rounded mb-6"></div>
    <p className="text-lg text-[#444] mb-10">Trabajamos con las mejores marcas para ofrecerte productos de calidad garantizada.</p>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
      <div className="bg-white rounded-xl shadow-sm border border-[#F3E6D0] flex items-center justify-center h-32 md:h-36">
        <img src="/images/marca1.png" alt="Puma" className="max-h-20 object-contain" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[#F3E6D0] flex items-center justify-center h-32 md:h-36">
        <img src="/images/marca2.png" alt="Reebok" className="max-h-20 object-contain" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[#F3E6D0] flex items-center justify-center h-32 md:h-36">
        <img src="/images/marca3.png" alt="Nike" className="max-h-20 object-contain" />
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-[#F3E6D0] flex items-center justify-center h-32 md:h-36">
        <img src="/images/marca4.png" alt="Adidas" className="max-h-20 object-contain" />
      </div>
    </div>
  </div>
</section>

      {/* Sobre Nosotros */}
      <section className="bg-white py-16 px-4" style={{ fontFamily: 'Lora, serif' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="bg-[#FDE7EF] rounded-xl shadow-lg flex items-center justify-center w-full">
              <img src="\images\imagenNosotros.jpg" alt="Descripción de la imagen" className="max-w-full h-auto rounded-lg"/>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#222] mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>Sobre Nosotros</h2>
            <div className="h-1 w-16 bg-[#B88A1A] rounded mb-6"></div>
            <h3 className="text-2xl font-serif text-[#222] mb-3" style={{ fontFamily: 'Libre Baskerville, serif' }}>Nuestra Historia</h3>
            <p className="text-[#444] mb-6">Muñe Chic nació en 2010 con la visión de ofrecer productos de moda de alta calidad para toda la familia. Desde nuestros humildes inicios como una pequeña tienda local, hemos crecido hasta convertirnos en un referente de estilo y calidad en la región.<br /><br />Nuestra pasión por la moda y el compromiso con la satisfacción del cliente nos ha permitido expandirnos y ofrecer una amplia gama de productos que incluyen desde calzado y ropa hasta accesorios y perfumes.</p>
            <h3 className="text-xl font-serif text-[#222] mb-3" style={{ fontFamily: 'Libre Baskerville, serif' }}>Nuestra Filosofía</h3>
            <ul className="space-y-2 text-[#444]">
              <li className="flex items-start gap-2"><span className="text-[#B88A1A] mt-1">✔</span> Calidad garantizada en todos nuestros productos</li>
              <li className="flex items-start gap-2"><span className="text-[#B88A1A] mt-1">✔</span> Atención personalizada y asesoramiento de moda</li>
              <li className="flex items-start gap-2"><span className="text-[#B88A1A] mt-1">✔</span> Compromiso con las últimas tendencias y estilos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contáctanos */}
      <section className="bg-[#FDE7EF] py-16 px-4" style={{ fontFamily: 'Lora, serif' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#222] mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>Contáctanos</h2>
          <div className="h-1 w-16 bg-[#B88A1A] rounded mb-6"></div>
          <p className="text-lg text-[#444] mb-10 text-center">Estamos aquí para ayudarte. Contáctanos a través de WhatsApp o nuestras redes sociales.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-4">
              <h3 className="text-xl font-serif text-[#222] mb-4" style={{ fontFamily: 'Libre Baskerville, serif' }}>Información de Contacto</h3>
              <div className="flex items-start gap-3 mb-2">
                <span className="text-[#B88A1A] text-xl">📍</span>
                <div>
                  <span className="font-bold text-[#222]">Dirección</span><br />
                  <span className="text-[#444]">Av. Principal #123, Colonia Centro</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-2">
                <span className="text-[#B88A1A] text-xl">⏰</span>
                <div>
                  <span className="font-bold text-[#222]">Horario</span><br />
                  <span className="text-[#444]">Lunes a Viernes: 9:00 - 20:00<br />Sábados: 10:00 - 18:00</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-2">
                <span className="text-[#B88A1A] text-xl">📱</span>
                <div>
                  <span className="font-bold text-[#222]">WhatsApp</span><br />
                  <span className="text-[#444]">+1 (234) 567-890</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="font-bold text-[#222]">Síguenos</span>
                <div className="flex gap-3 mt-2">
                  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F9D6E5] text-[#222] hover:bg-[#B88A1A] hover:text-white transition-colors" aria-label="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.32 0-.63-.02-.94-.06A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg></a>
                  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F9D6E5] text-[#222] hover:bg-[#B88A1A] hover:text-white transition-colors" aria-label="Instagram"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6.01 4.85.07 1.17.05 1.8.24 2.22.41.54.21.93.47 1.34.88.41.41.67.8.88 1.34.17.42.36 1.05.41 2.22.06 1.25.07 1.65.07 4.85s-.01 3.6-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.21.54-.47.93-.88 1.34-.41.41-.8.67-1.34.88-.42.17-1.05.36-2.22.41-1.25.06-1.65.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41-.54-.21-.93-.47-1.34-.88-.41-.41-.67-.8-.88-1.34-.17-.42-.36-1.05-.41-2.22C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.85c.05-1.17.24-1.8.41-2.22.21-.54.47-.93.88-1.34.41-.41.8-.67 1.34-.88.42-.17 1.05-.36 2.22-.41 1.25-.06 1.65-.07 4.85-.07s3.6-.01 4.85-.07c1.17-.05 1.8-.24 2.22-.41.54-.21.93-.47 1.34-.88.41-.41.67-.8.88-1.34.17-.42.36-1.05.41-2.22.06-1.25.07-1.65.07-4.85s-.01-3.6-.07-4.85c-.05-1.17-.24-1.8-.41-2.22-.21-.54-.47-.93-.88-1.34-.41-.41-.8-.67-1.34-.88-.42-.17-1.05-.36-2.22-.41C8.4 2.21 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3.01 7.05.07 5.8.12 5.17.31 4.75.48c-.54.21-.93.47-1.34.88-.41.41-.67.8-.88 1.34-.17.42-.36 1.05-.41 2.22C2.21 8.4 2.2 8.8 2.2 12s.01 3.6.07 4.85c.05 1.17.24 1.8.41 2.22.21.54.47.93.88 1.34.41.41.8.67 1.34.88.42.17 1.05.36 2.22.41 1.25.06 1.65.07 4.85.07s3.6-.01 4.85-.07c1.17-.05 1.8-.24 2.22-.41.54-.21.93-.47 1.34-.88.41-.41.67-.8.88-1.34.17-.42.36-1.05.41-2.22.06-1.25.07-1.65.07-4.85s-.01-3.6-.07-4.85c-.05-1.17-.24-1.8-.41-2.22-.21-.54-.47-.93-.88-1.34-.41-.41-.8-.67-1.34-.88-.42-.17-1.05-.36-2.22-.41C15.6.21 15.2.2 12 .2zM12 5.8A6.2 6.2 0 1 0 12 18.2 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 12 7.8a4 4 0 0 1 0 8.2zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg></a>
                  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F9D6E5] text-[#222] hover:bg-[#B88A1A] hover:text-white transition-colors" aria-label="Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg></a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center gap-6">
              <h3 className="text-xl font-serif text-[#222] mb-2" style={{ fontFamily: 'Libre Baskerville, serif' }}>Contáctanos por WhatsApp</h3>
              <p className="text-[#444] text-center mb-4">Escanea el código QR o haz clic en el botón para contactarnos directamente por WhatsApp.</p>
              <div className="w-20 h-20 bg-[#F9D6E5] rounded-lg flex items-center justify-center mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#fff"/><rect x="6" y="6" width="8" height="8" fill="#222"/><rect x="26" y="6" width="8" height="8" fill="#222"/><rect x="6" y="26" width="8" height="8" fill="#222"/><rect x="18" y="18" width="4" height="4" fill="#222"/></svg>
              </div>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="bg-[#B88A1A] hover:bg-[#a07616] text-white font-bold py-3 px-8 rounded transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-[#B88A1A] focus:ring-offset-2 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                Contáctanos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}