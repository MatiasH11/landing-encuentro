import Image from "next/image";
import type { EventEdition } from "@/types";
import TrackedLink from "@/components/ui/TrackedLink";
import DaysLeft from "@/components/ui/DaysLeft";
import EntraDesde from "@/components/motion/EntraDesde";

interface UpcomingEditionsSectionProps {
  upcoming: EventEdition[];
  past: EventEdition[];
}

// Cada edición tiene su afiche: color, foto y encuadre propios
const POSTER: Record<string, { bg: string; photo: string; pos: string; alt: string }> = {
  "mdp-2026": {
    bg: "bg-turquesa text-tinta",
    photo: "/images/gallery/imagen-4.jpeg",
    pos: "object-[45%_62%]",
    alt: "Ballet con polleras celestes bailando en el escenario",
  },
  "paso-2026": {
    bg: "bg-bordo text-crema",
    photo: "/images/gallery/2026/saludo-final-paso-de-la-patria.webp",
    pos: "object-[50%_68%]",
    alt: "Un ballet saluda en el escenario del Encuentro 2026 en Paso de la Patria",
  },
};
const FALLBACK = POSTER["mdp-2026"];

function details(edition: EventEdition) {
  return [
    { k: "Delegaciones", v: `Hasta ${edition.maxBallets} ballets y ${edition.maxMusicGroups} grupos musicales` },
    { k: "Integrantes", v: `Mínimo ${edition.minMembersPerBallet} por ballet` },
    { k: "Actuación", v: `Hasta ${edition.maxPerformanceMinutes} minutos por ballet` },
    { k: "Noches", v: `${edition.guaranteedNights} noches garantizadas por grupo` },
    ...(edition.freeAdmission ? [{ k: "Público", v: "Entrada libre y gratuita" }] : []),
    { k: "Pagos", v: `Hasta el ${edition.paymentDeadline}` },
  ];
}

function Poster({ edition, isPast }: { edition: EventEdition; isPast: boolean }) {
  const p = POSTER[edition.id] ?? FALLBACK;
  return (
    <article className={`doblez relative flex flex-col overflow-hidden rounded-[28px] ${p.bg}`}>
      <div className="p-6 sm:p-8">
        {/* El sticker va en la fila del número, no encima del título: en el teléfono pisaba "Paso de la Patria" */}
        <div className="flex items-start justify-between gap-3">
          <p className="display text-[1.375rem]">{edition.editionNumber}º Encuentro</p>
          <span
            className={`sticker shrink-0 text-[0.9375rem] ${isPast ? "bg-crema text-tinta" : "bg-amarillo text-tinta"}`}
          >
            {isPast ? (
              "Realizado"
            ) : (
              <DaysLeft startDate={edition.startDate} endDate={edition.endDate} fallback="Próximo" />
            )}
          </span>
        </div>
        <h3 className="display mt-1 text-[clamp(3.25rem,6vw,5.75rem)]">{edition.location}</h3>
        <p className="mt-3 text-[1.0625rem] font-extrabold">
          {edition.dateRange} · {edition.venue}
        </p>
      </div>

      <div className={`relative ${isPast ? "h-64" : "h-72 sm:h-80"} [clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)]`}>
        <Image
          src={p.photo}
          alt={p.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover ${p.pos}`}
        />
      </div>

      {!isPast && (
        <div className="p-6 sm:p-8">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-4">
            {details(edition).map((d) => (
              <div key={d.k}>
                <dt className="text-[0.8125rem] font-semibold sm:text-[0.875rem]">{d.k}</dt>
                <dd className="text-[0.9375rem] font-extrabold leading-snug sm:text-[1.0625rem]">{d.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href="#inscripcion"
              event="ViewContent"
              params={{ content_name: "Inscripcion", edition: edition.location }}
              className="pill pill-tinta"
            >
              Qué incluye la inscripción →
            </TrackedLink>
            <a href="#programa" className="pill pill-linea">
              Programa día por día
            </a>
          </p>
        </div>
      )}
    </article>
  );
}

export default function UpcomingEditionsSection({ upcoming, past }: UpcomingEditionsSectionProps) {
  return (
    <section id="ediciones" className="papel px-4 pb-32 pt-16 sm:px-7 sm:pb-40 sm:pt-20">
      <h2 className="display tinta flex flex-wrap items-end gap-x-5 gap-y-2 text-[clamp(3.25rem,7vw,7rem)]">
        <span>Dos escenarios</span>
        <span className="tag -rotate-2 bg-bordo text-crema">en 2026</span>
      </h2>

      <div className="mt-12 grid items-start gap-5 lg:grid-cols-[1.25fr_1fr]">
        {/* Cada afiche entra desde su costado y queda sostenido con una cinta */}
        {[...upcoming.map((e) => ({ e, isPast: false })), ...past.map((e) => ({ e, isPast: true }))].map(
          ({ e, isPast }, i) => (
            <EntraDesde
              key={e.id}
              lado={i % 2 ? 1 : -1}
              className="cinta relative"
            >
              <Poster edition={e} isPast={isPast} />
            </EntraDesde>
          )
        )}
      </div>
    </section>
  );
}
