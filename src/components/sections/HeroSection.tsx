import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import type { AnnouncedEdition, EventEdition } from "@/types";
import { fechasDe } from "@/lib/editions";
import TrackedLink from "@/components/ui/TrackedLink";
import Countdown from "@/components/ui/Countdown";
import HeroBackdrop from "@/components/motion/HeroBackdrop";
import HeroTitle from "@/components/motion/HeroTitle";
import HeroVideo from "@/components/motion/HeroVideo";

// Video del hero: IMG_7996 (8,6 s, grabado en HDR) pasado a SDR, sin audio, a 1920 px.
// WebM VP9 (2,5 MB) primero y MP4 H.264 con faststart (2,8 MB) de respaldo; los dos se reproducen en cualquier
// navegador actual. Para regenerarlos, ver el comando en public/videos/README.md.
const HERO_VIDEO = {
  fuentes: [
    { src: "/videos/hero.webm", type: "video/webm" },
    { src: "/videos/hero.mp4", type: "video/mp4" },
  ],
};

interface HeroSectionProps {
  edition: EventEdition;
  isPast: boolean;
  inscriptionHref: string;
  /** Edición anunciada que pasa al frente cuando ya terminaron las de 2026 */
  proxima?: AnnouncedEdition;
}

/** El escenario a pantalla completa y el lema como etiquetas de afiche. */
export default function HeroSection({ edition, isPast, inscriptionHref, proxima }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[calc(100svh-6.25rem)] flex-col justify-end overflow-hidden px-4 pb-40 pt-24 text-crema sm:px-7 sm:pb-14"
    >
      <HeroBackdrop>
        <Image
          src="/images/gallery/2026/arcos-de-flores.webp"
          alt="Bailarinas con polleras de volados levantan arcos de flores en el Encuentro 2026"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="zoom-lento object-cover object-[50%_40%]"
        />
        <HeroVideo fuentes={HERO_VIDEO.fuentes} />
      </HeroBackdrop>
      {/* Oscurece arriba y abajo para que el texto se lea sobre cualquier parte de la foto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_13_17/0.5)_0%,rgb(23_13_17/0)_28%,rgb(23_13_17/0.2)_55%,rgb(23_13_17/0.88)_100%)]"
      />

      <HeroTitle />

      {/* sm:pr-24 deja lugar al botón flotante de WhatsApp, abajo a la derecha */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-7 sm:pr-24">
        {proxima ? (
          // Terminó 2026 y ya hay una fecha anunciada: va al frente, solo con lo confirmado
          <p className="max-w-[42ch] text-[1.1875rem] font-semibold" data-load>
            <span className="font-extrabold">Próxima edición: {proxima.location}, {fechasDe(proxima).rango}.</span>{" "}
            <span className="font-normal">Sede y programa a confirmar.</span>
          </p>
        ) : (
          <p className="max-w-[42ch] text-[1.1875rem] font-semibold" data-load>
            <span className="font-extrabold">
              {edition.editionNumber}º Encuentro Latinoamericano del Canto y las Danzas Folclóricas.
            </span>{" "}
            <span className="font-normal">
              {isPast ? "Se realizó en " : ""}
              {edition.location}, {edition.dateRange}, en el {edition.venue}.
            </span>
          </p>
        )}
        {(proxima || !isPast) && (
          <div data-load style={{ "--d": "520ms" } as React.CSSProperties}>
            <Countdown startDate={proxima ? proxima.startDate : edition.startDate} />
          </div>
        )}
        <TrackedLink
          href={inscriptionHref}
          target="_blank"
          rel="noopener noreferrer"
          event="Lead"
          params={{
            content_name: proxima ? "WhatsApp Reserva 2027" : "WhatsApp Inscripcion",
            edition: proxima ? `${proxima.location} ${fechasDe(proxima).rango}` : edition.location,
            placement: "hero",
          }}
          className="pill min-h-14 text-[1.0625rem]"
          data-load
          style={{ "--d": "600ms" } as React.CSSProperties}
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden />
          {proxima ? "Reservá tu lugar" : isPast ? "Consultá por la próxima edición" : "Inscribí a tu ballet"}
        </TrackedLink>
      </div>
    </section>
  );
}
