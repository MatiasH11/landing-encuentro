"use client";

import { useState } from "react";
import type { EventEdition, ScheduleDay } from "@/types";

interface ProgramEntry {
  edition: EventEdition;
  schedule: ScheduleDay[];
  isPast: boolean;
}

export default function ProgramSection({ entries }: { entries: ProgramEntry[] }) {
  const [active, setActive] = useState(0);
  const current = entries[active];
  if (!current) return null;

  return (
    <section id="programa" className="grano bg-bordo px-4 py-24 text-crema sm:px-7 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <h2 className="display text-[clamp(3.25rem,8vw,8rem)]" data-reveal>
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
          : "Las noches de festival, marcadas en amarillo, tienen entrada libre y gratuita para el público."}
      </p>

      <div
        key={current.edition.id}
        data-swap
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {current.schedule.map((day, i) => (
          <article
            key={day.date}
            className="rounded-[22px] bg-bordo-oscuro p-6"
            style={{ "--i": i } as React.CSSProperties}
          >
            <h3>
              <span className="display block text-[2.75rem] text-amarillo">{day.day}</span>
              <span className="font-semibold text-crema/85">{day.date}</span>
            </h3>
            <ul className="mt-6 space-y-5">
              {day.activities.map((activity, j) => (
                <li key={j}>
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
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
