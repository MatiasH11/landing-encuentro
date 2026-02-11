"use client";

import { useState } from "react";
import { SCHEDULE_PASO_2026, SCHEDULE_MDP_2026 } from "@/constants/event-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock } from "lucide-react";

type EditionType = "paso" | "mdp";

export default function ProgramSection() {
  const [selectedEdition, setSelectedEdition] = useState<EditionType>("paso");

  const currentSchedule = selectedEdition === "paso" ? SCHEDULE_PASO_2026 : SCHEDULE_MDP_2026;
  const editionInfo = selectedEdition === "paso"
    ? { city: "Paso de la Patria", dates: "9 al 12 de octubre", venue: "Anfiteatro Pinin Palma" }
    : { city: "Mar del Plata", dates: "19 al 22 de noviembre", venue: "Teatro Enrique Carreras" };

  return (
    <section id="programa" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-warm-bg" />

      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Cronograma
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Programa 2026
          </h2>

          {/* Edition switcher */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full bg-white p-1.5 shadow-lg ring-1 ring-border/50">
              <button
                onClick={() => setSelectedEdition("paso")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  selectedEdition === "paso"
                    ? "bg-tierra text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Paso de la Patria
              </button>
              <button
                onClick={() => setSelectedEdition("mdp")}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                  selectedEdition === "mdp"
                    ? "bg-tierra text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mar del Plata
              </button>
            </div>
          </div>

          <p className="mt-6 text-muted-foreground">
            {editionInfo.city} · {editionInfo.dates} · {editionInfo.venue}
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-12" defaultValue="day-0" key={selectedEdition}>
          {currentSchedule.map((day, dayIndex) => (
            <AccordionItem
              key={dayIndex}
              value={`day-${dayIndex}`}
              className="mb-3 overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]]:bg-tierra [&[data-state=open]]:text-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tierra/10 text-sm font-bold text-tierra [&[data-state=open]]:bg-white/20 [&[data-state=open]]:text-white">
                    {dayIndex + 1}
                  </div>
                  <div className="text-left">
                    <p className="text-base font-semibold">{day.day}</p>
                    <p className="text-sm opacity-70">{day.date}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <ul className="mt-2 space-y-3">
                  {day.activities.map((activity, actIndex) => (
                    <li
                      key={actIndex}
                      className={`flex gap-4 rounded-xl p-3 transition-colors ${
                        activity.highlight
                          ? "bg-tierra/5 border border-tierra/15"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-tierra">
                        <Clock className="h-4 w-4" />
                        <span className="w-28">{activity.time}</span>
                      </div>
                      <p className="text-sm text-slate">{activity.description}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
