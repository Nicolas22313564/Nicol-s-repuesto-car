import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Tienda de Repuestos para Carros en Colombia`,
  description: SITE_CONFIG.description,
  keywords: [
    "repuestos colombia",
    "autopartes bogota",
    "pastillas de freno",
    "filtros carro",
    "amortiguadores",
    "baterias carros",
    "repuestos chevrolet",
    "repuestos renault",
    "repuestos mazda",
    "repuestos toyota",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
