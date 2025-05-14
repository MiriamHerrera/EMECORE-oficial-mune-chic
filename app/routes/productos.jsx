import { useState } from "react";
import { useSearchParams } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function Productos() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("categoria") || "";
  
  const [filters, setFilters] = useState({
    category: initialCategory,
    gender: "",
    priceRange: "",
    brand: "",
  });

  // Mock data - In a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: "Vestido Floral",
      category: "ropa",
      gender: "mujer",
      price: 89.99,
      brand: "Marca A",
      image: "/images/products/vestido-floral.jpg",
    },
    // Add more products here
  ];

  const categories = ["Ropa", "Zapatos", "Perfumes", "Accesorios"];
  const genders = ["Hombre", "Mujer", "Niños"];
  const priceRanges = [
    { label: "Todos los precios", value: "" },
    { label: "Menos de $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Más de $200", value: "200+" },
  ];
  const brands = ["Marca A", "Marca B", "Marca C", "Marca D"];

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category || product.category === filters.category.toLowerCase()) &&
      (!filters.gender || product.gender === filters.gender.toLowerCase()) &&
      (!filters.brand || product.brand === filters.brand)
    );
  });

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-4xl font-elegant mb-8">Nuestros Productos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-elegant mb-4">Filtros</h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Categoría</h3>
                <select
                  className="w-full p-2 border rounded"
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Género</h3>
                <select
                  className="w-full p-2 border rounded"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                >
                  <option value="">Todos</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender.toLowerCase()}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Rango de Precio</h3>
                <select
                  className="w-full p-2 border rounded"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Marca</h3>
                <select
                  className="w-full p-2 border rounded"
                  value={filters.brand}
                  onChange={(e) => handleFilterChange("brand", e.target.value)}
                >
                  <option value="">Todas las marcas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.brand}</p>
                    <p className="text-secondary font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <a
                      href={`https://wa.me/1234567890?text=Hola, me interesa el producto: ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 btn-primary block text-center"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No se encontraron productos con los filtros seleccionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 