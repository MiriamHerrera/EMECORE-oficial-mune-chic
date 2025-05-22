// filepath: my-react-app/src/components/ProductCard.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Puedes personalizar el ícono según la categoría o tipo de producto
  const icon = <FaBoxOpen className="text-2xl text-purple-700" />;

  // Estado de inventario (ejemplo simple)
  const stock = product.details?.stock ?? 0;
  let stockStatus = "Disponible";
  let stockBadgeColor = "bg-green-100 text-green-800";
  if (stock <= 5) {
    stockStatus = "Pocas unidades";
    stockBadgeColor = "bg-yellow-100 text-yellow-800";
  } else if (stock === 0) {
    stockStatus = "Sin stock";
    stockBadgeColor = "bg-red-100 text-red-800";
  }

  return (
    <div className="bg-white rounded-xl shadow flex flex-col gap-2 p-4 mb-4">
      {/* Grid principal: icono | info | expandir */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Ícono */}
        <div className="bg-purple-100 rounded-full p-2 flex items-center justify-center">
          {icon}
        </div>
        {/* Nombre y precio */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base">{product.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${stockBadgeColor}`}>
              {stockStatus}
            </span>
          </div>
          <div className="text-lg font-bold text-gray-800">
            ${Number(product.price || 0).toFixed(2)}
          </div>
        </div>
        {/* Botón expandir */}
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 transition"
          aria-label={isExpanded ? "Colapsar" : "Expandir"}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {/* Detalles expandibles en grid */}
      {isExpanded && (
        <div className="mt-2 px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            <div>
              <span className="block text-xs text-gray-500">Marca</span>
              <span className="font-medium">{product.brand?.name || '-'}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Categoría</span>
              <span className="font-medium">
                {product.categories?.[0]?.category?.name || '-'}
              </span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Stock</span>
              <span className="font-medium">{stock} unidades</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Estado</span>
              <span className="font-medium">{stockStatus}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(product.id)}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              <FaEdit /> Editar
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              <FaTrash /> Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;