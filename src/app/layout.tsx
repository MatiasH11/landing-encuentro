import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
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
        {/* Marca que hay JS: las animaciones de entrada solo ocultan contenido bajo html.js */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${schibsted.variable} font-sans antialiased`}>
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
