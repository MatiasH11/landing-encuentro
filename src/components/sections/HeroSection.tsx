import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import type { EventEdition } from "@/types";
import TrackedLink from "@/components/ui/TrackedLink";
import Countdown from "@/components/ui/Countdown";
import HeroBackdrop from "@/components/motion/HeroBackdrop";
import HeroTitle from "@/components/motion/HeroTitle";

interface HeroSectionProps {
  edition: EventEdition;
  isPast: boolean;
  inscriptionHref: string;
}

/** El escenario a pantalla completa y el lema como etiquetas de afiche. */
export default function HeroSection({ edition, isPast, inscriptionHref }: HeroSectionProps) {
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
      </HeroBackdrop>
      {/* Oscurece arriba y abajo para que el texto se lea sobre cualquier parte de la foto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_13_17/0.5)_0%,rgb(23_13_17/0)_28%,rgb(23_13_17/0.2)_55%,rgb(23_13_17/0.88)_100%)]"
      />

      <HeroTitle />

      {/* sm:pr-24 deja lugar al botón flotante de WhatsApp, abajo a la derecha */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-7 sm:pr-24">
        <p className="max-w-[42ch] text-[1.1875rem] font-semibold" data-load>
          <span className="font-extrabold">
            {edition.editionNumber}º Encuentro Latinoamericano del Canto y las Danzas Folclóricas.
          </span>{" "}
          <span className="font-normal">
            {isPast ? "Se realizó en " : ""}
            {edition.location}, {edition.dateRange}, en el {edition.venue}.
          </span>
        </p>
        {!isPast && (
          <div data-load style={{ "--d": "520ms" } as React.CSSProperties}>
            <Countdown startDate={edition.startDate} />
          </div>
        )}
        <TrackedLink
          href={inscriptionHref}
          target="_blank"
          rel="noopener noreferrer"
          event="Lead"
          params={{ content_name: "WhatsApp Inscripcion", edition: edition.location, placement: "hero" }}
          className="pill min-h-14 text-[1.0625rem]"
          data-load
          style={{ "--d": "600ms" } as React.CSSProperties}
        >
          <FaWhatsapp className="h-5 w-5" aria-hidden />
          {isPast ? "Consultá por la próxima edición" : "Inscribí a tu ballet"}
        </TrackedLink>
      </div>
    </section>
  );
}
