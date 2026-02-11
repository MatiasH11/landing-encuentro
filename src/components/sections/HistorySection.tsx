import Image from "next/image";
import {
  HISTORY_TEXT,
  OBJECTIVES,
  ORGANIZERS,
  ORGANIZED_BY,
  STATS,
} from "@/constants/history-data";
import { Award, CheckCircle, Heart, Shield } from "lucide-react";

export default function HistorySection() {
  return (
    <section id="historia" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-tierra">
            {HISTORY_TEXT.intro}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {HISTORY_TEXT.headline}
          </h2>
        </div>

        {/* Stats - Destacados */}
        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-gradient-to-br from-tierra/5 to-celeste/5 p-8 text-center ring-1 ring-border/50"
            >
              <p className="font-heading text-5xl font-bold text-tierra lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-medium leading-snug text-slate">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story con imagen */}
        <div className="mt-24 grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Imagen */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/gallery/imagen-2.jpeg"
                alt="Delegaciones en el Encuentro Latinoamericano"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Texto principal */}
          <div className="order-1 space-y-8 lg:order-2">
            <div>
              <h3 className="font-heading text-3xl font-bold text-foreground">
                Nuestra Historia
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-slate">
                {HISTORY_TEXT.body}
              </p>
            </div>

            <p className="text-lg leading-relaxed text-slate">
              {HISTORY_TEXT.mission}
            </p>

            <p className="text-lg leading-relaxed text-slate">
              {HISTORY_TEXT.impact}
            </p>
          </div>
        </div>

        {/* Trust factors */}
        <div className="mt-24">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-gradient-to-br from-cream to-white p-8 shadow-sm ring-1 ring-border/50 md:p-12">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tierra/10">
                  <Shield className="h-6 w-6 text-tierra" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Un evento con respaldo institucional
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-slate">
                    {HISTORY_TEXT.trust}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-celeste/10">
                  <Award className="h-6 w-6 text-celeste-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Experiencia comprobada
                  </h3>
                  <p className="mt-3 text-lg leading-relaxed text-slate">
                    {HISTORY_TEXT.credibility}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-tierra">
              Nuestros Objetivos
            </p>
            <h3 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Lo que buscamos lograr
            </h3>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {OBJECTIVES.map((objective, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-border/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tierra/10">
                  <CheckCircle className="h-5 w-5 text-tierra" />
                </div>
                <p className="text-base leading-relaxed text-slate">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Organizers */}
        <div className="mt-24">
          <div className="rounded-2xl bg-gradient-to-br from-tierra-dark to-tierra-deep p-12 text-center text-white shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Organizado con dedicación</h3>
            <p className="mt-3 text-lg text-white/80">
              {ORGANIZED_BY.join(" · ")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-8">
              {ORGANIZERS.map((org) => (
                <div key={org.name}>
                  <p className="text-lg font-semibold">{org.name}</p>
                  <p className="mt-1 text-sm text-white/70">{org.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
