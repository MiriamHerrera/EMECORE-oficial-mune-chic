import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import styles from "./styles/tailwind.css";
import Layout from "./components/Layout";
import WhatsAppFloat from "./components/WhatsAppFloat";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta = () => {
  return [
    { title: "Muñe Chic - Boutique de Moda" },
    { description: "Tienda de moda con las mejores marcas en ropa, zapatos, perfumes y accesorios para toda la familia." },
    { "og:title": "Muñe Chic - Boutique de Moda" },
    { "og:description": "Tienda de moda con las mejores marcas en ropa, zapatos, perfumes y accesorios para toda la familia." },
    { "og:type": "website" },
    { "og:url": "https://munechic.com" },
    { "og:image": "/images/og-image.jpg" },
  ];
};

export default function App() {
  return (
    <html lang="es" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-white">
        <Layout>
          <Outlet />
        </Layout>
        <WhatsAppFloat />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}