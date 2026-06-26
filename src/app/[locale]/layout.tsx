import type { Metadata } from "next";
import "@/app/globals.css";
import { AppProvider } from "@/context/AppContext";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Emanuel Ridgo - Portfolio",
  description: "Desarrollador Fullstack",
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return notFound();
  return (
    <html lang={locale}>
      <body className="antialiased bg-neutral-950 text-neutral-200">
        <AppProvider>
          <NextIntlClientProvider> {children}</NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
