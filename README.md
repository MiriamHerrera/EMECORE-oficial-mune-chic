# Muñe Chic - Boutique de Moda

Sitio web para Muñe Chic, una boutique especializada en venta de artículos para hombres, mujeres y niños, que incluye zapatos, ropa, perfumes, joyería, carteras y bolsos.

## Tecnologías Utilizadas

- **Frontend**: Remix.js, Tailwind CSS
- **Estilos**: Tailwind CSS con configuración personalizada
- **Optimización**: Lazy loading de imágenes, código modularizado

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd mune-chic
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Añade las variables necesarias (ver `.env.example`)

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
/muñe-chic
  /app
    /routes (páginas principales)
    /components (componentes reutilizables)
    /styles (estilos globales)
    /utils (utilidades)
    /hooks (custom hooks)
  /api
    /auth (autenticación para administrador)
    /products (endpoints de productos)
    /categories (endpoints de categorías)
  /admin
    /dashboard
    /inventory
    /orders
```

## Características Principales

- Diseño responsivo para móviles, tablets y escritorio
- Integración con WhatsApp para contacto directo
- Sistema de filtrado de productos
- Galería de marcas
- Información de contacto y ubicación
- Panel de administración (en desarrollo)

## Optimización

- Lazy loading de imágenes
- Código modularizado
- CSS optimizado con Tailwind
- SEO optimizado con metaetiquetas

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Muñe Chic - [info@munechic.com](mailto:info@munechic.com)

## Agradecimientos

- [Remix.js](https://remix.run/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/) 