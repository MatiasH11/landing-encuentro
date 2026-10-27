import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import HeroSection from "@/components/sections/HeroSection";
import HistorySection from "@/components/sections/HistorySection";
import PurposeSection from "@/components/sections/PurposeSection";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import Guarda from "@/components/motion/Guarda";
import PosterPanel from "@/components/motion/PosterPanel";
import UpcomingEditionsSection from "@/components/sections/UpcomingEditionsSection";
import ProgramSection from "@/components/sections/ProgramSection";
import GallerySection from "@/components/sections/GallerySection";
import RegistrationSection from "@/components/sections/RegistrationSection";
import ContactSection from "@/components/sections/ContactSection";
import RevealObserver from "@/components/ui/RevealObserver";
import Ticker from "@/components/ui/Ticker";
import { CONTACTS } from "@/constants/event-data";
import { EVENT_TAGLINE, STATS } from "@/constants/history-data";
import ComingSoonSection from "@/components/sections/ComingSoonSection";
import {
  announcedEditions,
  fechasDe,
  reserveMessage,
  featuredEdition,
  inscriptionMessage,
  isPast,
  scheduleFor,
  sortedEditions,
  whatsappLink,
} from "@/lib/editions";

// La edición destacada depende de la fecha: se recalcula cada hora.
export const revalidate = 3600;

export default function Home() {
  const now = new Date();
  const edition = featuredEdition(now);
  const { upcoming, past } = sortedEditions(now);
  const featuredIsPast = isPast(edition, now);
  // Fechas 2027 anunciadas que todavía no pasaron. Cuando terminen las de 2026, la primera pasa al frente:
  // el hero, la cinta y el botón de WhatsApp hablan de ella (sin inventar sede ni programa).
  const anunciadas = announcedEditions(now);
  const proxima = featuredIsPast ? anunciadas[0] : undefined;
  const message = proxima ? reserveMessage(proxima) : inscriptionMessage(edition, featuredIsPast);
  // Edición que se manda en los eventos Lead del header y de la barra de mobile
  const leadEdition = proxima ? `${proxima.location} ${fechasDe(proxima).rango}` : edition.location;
  const inscriptionHref = whatsappLink(CONTACTS[0], message);
  const programEntries = [...upcoming, ...past].map((e) => ({
    edition: e,
    schedule: scheduleFor(e),
    isPast: isPast(e, now),
  }));

  // Datos reales de la edición destacada para la cinta de arriba
  const facts = proxima
    ? [`${proxima.location}`, fechasDe(proxima).rango, "Reservá tu lugar", EVENT_TAGLINE]
    : featuredIsPast
    ? [EVENT_TAGLINE, "19 ediciones desde 2010", "Paso de la Patria", "Mar del Plata"]
    : [
        `${edition.location}`,
        edition.dateRange.replace(/ de \d{4}$/, ""),
        edition.venue,
        ...(edition.freeAdmission ? ["Entrada libre y gratuita"] : []),
        `Hasta ${edition.maxBallets} ballets`,
      ];
  const stats = [EVENT_TAGLINE, ...STATS.map((s) => `${s.value} ${s.label.toLowerCase()}`)];

  return (
    <>
      <a
        href="#contenido"
        className="pill sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Ticker items={facts} className="h-9 bg-amarillo text-[1.125rem] text-tinta" duration="36s" />
      <Header inscriptionHref={inscriptionHref} edition={leadEdition} />
      {/* overflow-x: clip (no hidden) para que los pliegues que entran girados no generen scroll lateral */}
      <main id="contenido" className="overflow-x-clip">
        <HeroSection edition={edition} isPast={featuredIsPast} inscriptionHref={inscriptionHref} proxima={proxima} />
        <Guarda />
        {/* Cada sección es un pliego de afiche pegado encima de la anterior, con el borde rasgado */}
        <PosterPanel color={["bg-crema", "fill-crema"]} rot={-0.3} variante={0}>
          <HistorySection />
        </PosterPanel>
        <PurposeSection />
        <Guarda />
        <UpcomingEditionsSection upcoming={upcoming} past={past} />
        <PosterPanel color={["bg-bordo", "fill-bordo"]} rot={0.35} variante={1}>
          <ProgramSection entries={programEntries} />
        </PosterPanel>
        {/* Después de todo 2026 (ediciones y programa), lo que viene */}
        {anunciadas.length > 0 && (
          <PosterPanel color={["bg-amarillo", "fill-amarillo"]} rot={-0.3} variante={5}>
            <ComingSoonSection ediciones={anunciadas} />
          </PosterPanel>
        )}
        <Ticker items={stats} className="h-16 bg-turquesa text-[1.75rem] text-tinta" duration="48s" />
        <PosterPanel color={["bg-tinta", "fill-tinta"]} rot={-0.25} variante={2}>
          <GallerySection />
        </PosterPanel>
        <PosterPanel color={["bg-turquesa", "fill-turquesa"]} rot={0.3} variante={3}>
          <RegistrationSection edition={edition} isPast={featuredIsPast} />
        </PosterPanel>
        <PosterPanel color={["bg-crema", "fill-crema"]} rot={-0.2} variante={4}>
          <ContactSection />
        </PosterPanel>
      </main>
      <Footer />
      <MobileActionBar inscriptionHref={inscriptionHref} edition={leadEdition} message={message} />
      <WhatsAppFAB message={message} />
      <RevealObserver />
    </>
  );
}
