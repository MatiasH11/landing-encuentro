import Image from "next/image";
import type { EventEdition } from "@/types";
import TrackedLink from "@/components/ui/TrackedLink";

interface UpcomingEditionsSectionProps {
  upcoming: EventEdition[];
  past: EventEdition[];
}

function Row({ kind, value }: { kind: string; value: string }) {
  return (
    <tr className="align-baseline">
      <th scope="row" className="w-[34%] py-[13px] pr-4 text-left font-normal text-muted">
        {kind}
      </th>
      <td className="py-[13px] font-semibold">{value}</td>
    </tr>
  );
}

function UpcomingTable({ edition }: { edition: EventEdition }) {
  return (
    <div data-reveal>
      <table className="w-full border-collapse">
        <caption className="display mb-4 text-left text-lead">
          {edition.editionNumber}º Encuentro · {edition.location}
        </caption>
        <tbody>
          <Row kind="Fechas" value={edition.dateRange} />
          <Row kind="Sala" value={edition.venue} />
          <Row kind="Ciudad" value={`${edition.location}, ${edition.province}`} />
        </tbody>
        <tbody className="before:block before:h-4">
          <Row
            kind="Delegaciones"
            value={`Hasta ${edition.maxBallets} ballets y ${edition.maxMusicGroups} grupos musicales`}
          />
          <Row kind="Integrantes" value={`Mínimo ${edition.minMembersPerBallet} por ballet`} />
          <Row kind="Actuación" value={`Hasta ${edition.maxPerformanceMinutes} minutos por ballet`} />
          <Row kind="Noches" value={`${edition.guaranteedNights} noches garantizadas por grupo`} />
        </tbody>
        <tbody className="before:block before:h-4">
          {edition.freeAdmission && <Row kind="Público" value="Entrada libre y gratuita" />}
          <Row kind="Pagos" value={`Hasta el ${edition.paymentDeadline}`} />
        </tbody>
      </table>
      <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
        <TrackedLink
          href="#inscripcion"
          event="ViewContent"
          params={{ content_name: "Inscripcion", edition: edition.location }}
          className="link"
        >
          Qué incluye la inscripción →
        </TrackedLink>
        <a href="#programa" className="link">
          Programa día por día →
        </a>
      </p>
    </div>
  );
}

function PastTable({ edition }: { edition: EventEdition }) {
  return (
    <table className="w-full border-collapse" data-reveal>
      <caption className="mb-2 text-left font-semibold">
        {edition.editionNumber}º Encuentro · {edition.location} · realizado
      </caption>
      <tbody>
        <Row kind="Fechas" value={edition.dateRange} />
        <Row kind="Lugar" value={`${edition.venue}, ${edition.province}`} />
      </tbody>
    </table>
  );
}

export default function UpcomingEditionsSection({ upcoming, past }: UpcomingEditionsSectionProps) {
  return (
    <section id="ediciones" className="px-4 pt-20 sm:px-7 sm:pt-48">
      <h2 className="display text-head" data-reveal>
        <span className="block lg:pl-[3vw]">Dos escenarios,</span>
        <span className="block">cuatro días cada uno</span>
      </h2>

      <div className="mt-14 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-x-6">
        <figure className="relative aspect-[4/5] w-[60%] justify-self-end overflow-clip lg:col-span-4 lg:w-full lg:self-end max-lg:order-last" data-reveal>
          <Image
            src="/images/gallery/imagen-3.jpeg"
            alt="Ballet de adultos mayores con polleras celestes y blancas, frente al público"
            fill
            sizes="(max-width: 1024px) 60vw, 30vw"
            className="object-cover object-[46%_50%]"
          />
        </figure>

        <div className="grid content-start gap-14 lg:col-span-5 lg:col-start-8">
          {upcoming.map((edition) => (
            <UpcomingTable key={edition.id} edition={edition} />
          ))}
          {past.map((edition) => (
            <PastTable key={edition.id} edition={edition} />
          ))}
        </div>
      </div>
    </section>
  );
}
