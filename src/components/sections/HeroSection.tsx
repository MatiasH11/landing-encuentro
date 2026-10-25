import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import type { EventEdition } from "@/types";
import TrackedLink from "@/components/ui/TrackedLink";
import Countdown from "@/components/ui/Countdown";

interface HeroSectionProps {
  edition: EventEdition;
  isPast: boolean;
  inscriptionHref: string;
}

const TAGS = [
  { text: "Argentina le canta", className: "bg-bordo text-crema" },
  { text: "y baila", className: "bg-crema text-bordo -rotate-[1.5deg]" },
  { text: "a Latinoamérica", className: "bg-turquesa text-tinta" },
];

/** El escenario a pantalla completa y el lema como etiquetas de afiche. */
export default function HeroSection({ edition, isPast, inscriptionHref }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[calc(100svh-6.25rem)] flex-col justify-end overflow-hidden px-4 pb-32 pt-24 text-crema sm:px-7 sm:pb-14"
    >
      <Image
        src="/images/gallery/imagen-1.jpeg"
        alt="Delegación con trajes bordó bailando en el escenario del Encuentro"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="zoom-lento -z-20 object-cover object-[50%_55%]"
      />
      {/* Oscurece arriba y abajo para que el texto se lea sobre cualquier parte de la foto */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_13_17/0.5)_0%,rgb(23_13_17/0)_28%,rgb(23_13_17/0.2)_55%,rgb(23_13_17/0.88)_100%)]"
      />

      <h1 className="display flex flex-col items-start gap-2 text-[10.8vw] sm:text-[clamp(3rem,7.4vw,8rem)]">
        {TAGS.map((tag, i) => (
          <span
            key={tag.text}
            data-tag
            style={{ "--i": i } as React.CSSProperties}
            className={`tag ${tag.className}`}
          >
            {tag.text}
          </span>
        ))}
      </h1>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
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
