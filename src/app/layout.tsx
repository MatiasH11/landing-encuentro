import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
