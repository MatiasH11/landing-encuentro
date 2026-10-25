import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import HeroSection from "@/components/sections/HeroSection";
import HistorySection from "@/components/sections/HistorySection";
import UpcomingEditionsSection from "@/components/sections/UpcomingEditionsSection";
import ProgramSection from "@/components/sections/ProgramSection";
import GallerySection from "@/components/sections/GallerySection";
import RegistrationSection from "@/components/sections/RegistrationSection";
import ContactSection from "@/components/sections/ContactSection";
import RevealObserver from "@/components/ui/RevealObserver";
import { CONTACTS } from "@/constants/event-data";
import {
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
  const message = inscriptionMessage(edition, featuredIsPast);
  const inscriptionHref = whatsappLink(CONTACTS[0], message);
  const programEntries = [...upcoming, ...past].map((e) => ({
    edition: e,
    schedule: scheduleFor(e),
    isPast: isPast(e, now),
  }));

  return (
    <>
      <a
        href="#contenido"
        className="button sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header inscriptionHref={inscriptionHref} edition={edition.location} />
      <main id="contenido">
        <HeroSection edition={edition} isPast={featuredIsPast} inscriptionHref={inscriptionHref} />
        <HistorySection />
        <UpcomingEditionsSection upcoming={upcoming} past={past} />
        <ProgramSection entries={programEntries} />
        <GallerySection />
        <RegistrationSection edition={edition} isPast={featuredIsPast} />
        <ContactSection />
      </main>
      <Footer />
      <MobileActionBar inscriptionHref={inscriptionHref} edition={edition.location} message={message} />
      <RevealObserver />
    </>
  );
}
