import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import MotionProvider from "@/components/motion/MotionProvider";
import PaperFilters from "@/components/motion/PaperFilters";
import "./globals.css";

// Títulos de afiche
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Texto
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "800"],
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
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Marca que hay JS: las animaciones de entrada solo ocultan contenido bajo html.js.
            Si a los 5 s RevealObserver no arrancó (el JS de la página no cargó), se saca .js y se ve todo */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('reveal-listo'))d.classList.remove('js')},5000)})(document.documentElement)",
          }}
        />
      </head>
      <body className={`${anton.variable} ${bricolage.variable} font-sans antialiased`}>
        <PaperFilters />
        <MotionProvider>{children}</MotionProvider>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
