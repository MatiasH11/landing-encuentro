import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas",
  description:
    "Evento cultural de 19 ediciones que reúne a 600+ participantes de Argentina y Latinoamérica en celebración del canto y las danzas folclóricas. Próximas ediciones: Paso de la Patria (octubre 2026) y Mar del Plata (noviembre 2026).",
  keywords: [
    "encuentro latinoamericano",
    "danzas folclóricas",
    "canto folclórico",
    "folklore argentino",
    "festival folclórico",
    "Paso de la Patria",
    "Mar del Plata",
    "ballet folclórico",
  ],
  openGraph: {
    title: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas",
    description:
      "19 ediciones reuniendo 600+ participantes de Argentina y Latinoamérica. Próximas ediciones 2026.",
    type: "website",
    locale: "es_AR",
    siteName: "Encuentro Latinoamericano del Canto y las Danzas Folclóricas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
