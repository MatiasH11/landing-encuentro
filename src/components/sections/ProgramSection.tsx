"use client";

import { useState, useSyncExternalStore } from "react";
import { resaltadoPara, type Resaltado } from "@/lib/schedule";
import type { EventEdition, ScheduleDay } from "@/types";

interface ProgramEntry {
  edition: EventEdition;
  schedule: ScheduleDay[];
  isPast: boolean;
}

// Se revisa una vez por minuto qué actividad marcar
function cadaMinuto(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export default function ProgramSection({ entries }: { entries: ProgramEntry[] }) {
  const [active, setActive] = useState(0);
  const current = entries[active];
  // "Ahora" o "Próxima función", solo durante los días del evento. Se calcula en el navegador (el servidor no
  // marca nada) y se guarda como texto para que el valor sea estable entre renders.
  const marcaTexto = useSyncExternalStore(
    cadaMinuto,
    () => (current ? JSON.stringify(resaltadoPara(current.edition, current.schedule)) : "null"),
    () => "null"
  );
  const resaltado = JSON.parse(marcaTexto) as Resaltado | null;
  if (!current) return null;

  return (
    <section id="programa" className="grano px-4 pb-24 pt-16 text-crema sm:px-7 sm:pb-32 sm:pt-24">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="display tinta text-[clamp(3.25rem,8vw,8rem)]">
          <span className="block">Programa</span>
          <span className="block text-amarillo">{current.edition.location}</span>
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Elegir edición" data-reveal>
          {entries.map((entry, i) => (
            <button
              key={entry.edition.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`pill min-h-11 text-[0.9375rem] ${i === active ? "" : "pill-linea text-crema"}`}
            >
              {entry.edition.location}
              {entry.isPast ? " · realizado" : ""}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-[60ch] text-crema/85">
        {current.edition.dateRange}, {current.edition.venue}.{" "}
        {current.isPast
          ? "Así fueron los cuatro días de esta edición."
          : "Las noches de festival van marcadas en amarillo."}
      </p>

      {/* En el teléfono los días se deslizan de costado (se ve un pedazo del siguiente como señal);
          desde tablet van en grilla */}
      <p className="mt-10 text-[0.9375rem] font-semibold text-crema/85 sm:hidden" aria-hidden>
        Deslizá para ver los cuatro días →
      </p>
      <div
        key={current.edition.id}
        data-swap
        className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"
      >
        {current.schedule.map((day, i) => (
          <article
            key={day.date}
            className={`w-[82%] shrink-0 snap-start rounded-[22px] bg-bordo-oscuro p-6 sm:w-auto ${
              resaltado?.dia === i ? "ring-4 ring-amarillo" : ""
            }`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <h3>
              <span className="display block text-[2.75rem] text-amarillo">{day.day}</span>
              <span className="font-semibold text-crema/85">{day.date}</span>
            </h3>
            <ul className="mt-6 space-y-5">
              {day.activities.map((activity, j) => {
                const marca = resaltado?.dia === i && resaltado.actividad === j ? resaltado.tipo : null;
                return (
                  <li key={j}>
                    {marca && (
                      <span className="sticker mb-2 mr-2 bg-crema text-[0.8125rem] text-bordo">
                        {marca === "ahora" ? "Ahora" : "Próxima función"}
                      </span>
                    )}
                    <span
                      className={`tabular inline-block rounded-full px-2.5 py-0.5 text-[0.875rem] font-extrabold ${
                        activity.highlight ? "bg-amarillo text-tinta" : "bg-crema/15 text-crema"
                      }`}
                    >
                      {activity.time}
                    </span>
                    <p className={`mt-2 leading-snug ${activity.highlight ? "font-extrabold" : "text-crema/85"}`}>
                      {activity.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
