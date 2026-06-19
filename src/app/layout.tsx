import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emanuel Ridgo - Portfolio",
  description: "Desarrollador Fullstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-neutral-950 text-neutral-200">
        {children}
      </body>
    </html>
  );
}
