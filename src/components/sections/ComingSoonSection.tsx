import { FaWhatsapp } from "react-icons/fa";
import { CONTACTS } from "@/constants/event-data";
import { fechasDe, reserveMessage, whatsappLink } from "@/lib/editions";
import type { AnnouncedEdition } from "@/types";
import TrackedLink from "@/components/ui/TrackedLink";

// Color de cada afiche de fecha, en orden
const COLORES = [
  { fondo: "bg-crema text-tinta", dias: "text-bordo", rot: "-rotate-[1.5deg]", cinta: "-5deg" },
  { fondo: "bg-turquesa text-tinta", dias: "text-tinta", rot: "rotate-1", cinta: "4deg" },
  { fondo: "bg-bordo text-crema", dias: "text-amarillo", rot: "-rotate-1", cinta: "-3deg" },
];

/**
 * Próximamente: las fechas 2027 como un afiche de anuncio. Solo se muestra lo confirmado (fecha y localidad);
 * sede y programa quedan "a confirmar". Cada fecha tiene su reserva por WhatsApp (evento Lead).
 */
export default function ComingSoonSection({ ediciones }: { ediciones: AnnouncedEdition[] }) {
  if (ediciones.length === 0) return null;
  const contacto = CONTACTS[0];

  return (
    <section id="proximamente" className="papel relative px-4 pb-24 pt-16 text-tinta sm:px-7 sm:pb-32 sm:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
        <h2 className="display tinta text-[clamp(3.25rem,8vw,8rem)]">
          <span className="block">Próximamente</span>
          <span className="tag -rotate-2 bg-rojo text-crema">fechas 2027</span>
        </h2>

        {/* Sello de afiche: anillo de texto alrededor del año. En el teléfono va arriba del título, a la derecha,
            pisando apenas la esquina como un sello estampado; desde tablet, al costado */}
        <div
          aria-hidden
          className="order-first -mb-10 ml-auto grid size-28 shrink-0 rotate-[10deg] place-items-center rounded-full border-4 border-dashed border-bordo text-center text-bordo sm:order-none sm:mb-0 sm:size-48"
        >
          <div className="px-3 sm:px-4">
            <p className="display text-[0.8125rem] leading-none sm:text-[1.1875rem]">Cupos limitados</p>
            <p className="display text-[2.25rem] leading-none sm:text-[3.75rem]">2027</p>
            <p className="text-[0.625rem] font-extrabold uppercase leading-tight sm:text-[0.8125rem]">Reservá tu lugar</p>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-[52ch] text-[1.125rem] font-semibold">
        Ya están las fechas del año que viene. Reservá el lugar de tu ballet antes de que se completen los cupos.
      </p>

      <ul className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        {ediciones.map((e, i) => {
          const { dias, mes, anio, rango } = fechasDe(e);
          const c = COLORES[i % COLORES.length];
          return (
            <li
              key={e.id}
              className={`cinta doblez relative flex flex-col rounded-[24px] p-6 sm:p-7 ${c.fondo} ${c.rot}`}
              style={{ "--cinta-rot": c.cinta } as React.CSSProperties}
              data-reveal
            >
              <h3 className="sr-only">
                {e.location}, {rango}
              </h3>
              <p aria-hidden className={`display tabular text-[clamp(3.75rem,6.5vw,5.5rem)] leading-[0.9] ${c.dias}`}>
                {dias.join(" · ")}
              </p>
              <p aria-hidden className="display mt-1 text-[clamp(2rem,3.4vw,2.75rem)]">
                {mes} {anio}
              </p>
              <p className="mt-5 text-[1.375rem] font-extrabold leading-tight">{e.location}</p>
              <p className="font-semibold opacity-85">{e.province}</p>
              <p className="mt-1 text-[0.9375rem] opacity-85">Sede y programa a confirmar</p>
              <TrackedLink
                href={whatsappLink(contacto, reserveMessage(e))}
                target="_blank"
                rel="noopener noreferrer"
                event="Lead"
                params={{ content_name: "WhatsApp Reserva 2027", edition: `${e.location} ${rango}`, placement: "proximamente" }}
                className={`pill mt-7 self-start ${i === 2 ? "" : "pill-tinta"}`}
              >
                <FaWhatsapp className="h-5 w-5" aria-hidden />
                Reservá tu lugar
              </TrackedLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
