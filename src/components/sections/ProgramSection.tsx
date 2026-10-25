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
    <section id="programa" className="mt-20 bg-surface px-4 py-20 sm:mt-48 sm:px-7 sm:py-36">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <h2 className="display text-head lg:col-span-7" data-reveal>
          Programa de {current.edition.location}
        </h2>
        <div
          className="flex flex-wrap gap-2 lg:col-span-5 lg:justify-end"
          role="group"
          aria-label="Elegir edición"
          data-reveal
        >
          {entries.map((entry, i) => (
            <button
              key={entry.edition.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`button min-h-11 text-small ${
                i === active ? "" : "button-quiet text-ink"
              }`}
            >
              {entry.edition.location}
              {entry.isPast ? " · realizado" : ""}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-[60ch] text-muted">
        {current.edition.dateRange}, {current.edition.venue}.{" "}
        {current.isPast
          ? "Así fueron los cuatro días de esta edición."
          : "Las funciones del festival, en negrita, tienen entrada libre y gratuita para el público."}
      </p>

      <div
        key={current.edition.id}
        data-swap
        className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4"
      >
        {current.schedule.map((day, i) => (
          <article key={day.date} style={{ "--i": i } as React.CSSProperties}>
            <h3 className="text-lead font-semibold">
              {day.day} <span className="font-normal text-muted">{day.date}</span>
            </h3>
            <ul className="mt-5 space-y-4">
              {day.activities.map((activity, j) => (
                <li key={j} className="grid grid-cols-[7rem_1fr] gap-3">
                  <span className="tabular font-semibold">{activity.time}</span>
                  <span className={activity.highlight ? "font-semibold" : "text-muted"}>
                    {activity.description}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
