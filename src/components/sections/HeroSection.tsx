import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import type { EventEdition } from "@/types";
import TrackedLink from "@/components/ui/TrackedLink";
import DaysLeft from "@/components/ui/DaysLeft";

interface HeroSectionProps {
  edition: EventEdition;
  isPast: boolean;
  inscriptionHref: string;
}

/**
 * El lema es el título: "Argentina le canta y [baila] a Latinoamérica".
 * En lugar de la palabra "baila" va la foto de una delegación bailando.
 */
export default function HeroSection({ edition, isPast, inscriptionHref }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="grid min-h-svh grid-rows-[1fr_auto] gap-10 px-4 pb-24 pt-28 sm:px-7 sm:pb-10 sm:pt-32"
    >
      <h1 className="display lines self-center text-[9.4vw] leading-[0.92] sm:text-display">
        <span className="line">
          <span data-line style={{ "--i": 0 } as React.CSSProperties}>
            Argentina le canta<span className="sm:hidden"> y</span>
          </span>
        </span>
        <span className="line">
          <span data-line style={{ "--i": 1 } as React.CSSProperties}>
          <span className="flex flex-wrap items-baseline gap-x-[0.22em] sm:flex-nowrap">
            <span className="max-sm:hidden">y</span>
            <span className="shutter relative my-[0.12em] block aspect-[2/1] w-full shrink-0 overflow-clip rounded-[14px] bg-night sm:my-0 sm:aspect-auto sm:h-[0.74em] sm:w-auto sm:flex-1 sm:translate-y-[0.02em]">
              <Image
                src="/images/gallery/imagen-1.jpeg"
                alt="baila"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 92vw, 40vw"
                className="object-cover object-[50%_58%]"
              />
            </span>
            <span className="whitespace-nowrap">a Latinoamérica</span>
          </span>
          </span>
        </span>
      </h1>

      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10">
        <p
          className="max-w-[40ch] text-lead"
          data-load
          style={{ "--d": "420ms" } as React.CSSProperties}
        >
          <strong className="font-semibold">
            {edition.editionNumber}º Encuentro Latinoamericano del Canto y las Danzas Folclóricas.
          </strong>{" "}
          {isPast ? "Se realizó en " : ""}
          {edition.location}, {edition.dateRange}, en el {edition.venue}.
          {!isPast && <DaysLeft startDate={edition.startDate} endDate={edition.endDate} />}
        </p>
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3"
          data-load
          style={{ "--d": "520ms" } as React.CSSProperties}
        >
          <a href="#programa" className="link font-semibold">
            Ver el programa
          </a>
          <TrackedLink
            href={inscriptionHref}
            target="_blank"
            rel="noopener noreferrer"
            event="Lead"
            params={{ content_name: "WhatsApp Inscripcion", edition: edition.location, placement: "hero" }}
            className="button min-h-14 text-body"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden />
            Inscribí a tu ballet
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
