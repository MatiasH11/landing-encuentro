import Image from "next/image";
import { EDITIONS_2026 } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Theater, Users, Ticket } from "lucide-react";

const EDITION_IMAGES = [
  "/images/gallery/imagen-3.jpeg",
  "/images/gallery/imagen-6.jpeg",
];

export default function UpcomingEditionsSection() {
  return (
    <section id="ediciones" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Próximamente
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Ediciones 2026
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dos encuentros, dos ciudades, una misma pasión por el folclore
          </p>
        </div>

        {/* Edition cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {EDITIONS_2026.map((edition, i) => (
            <div
              key={edition.id}
              className="group relative overflow-hidden rounded-3xl border border-border/50 bg-white shadow-sm transition-all hover:shadow-xl"
            >
              {/* Image header */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={EDITION_IMAGES[i]}
                  alt={`${edition.title} en ${edition.location}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tierra-deep/80 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <Badge className="mb-2 rounded-full bg-tierra/90 text-white">
                    {edition.editionNumber}º Edición
                  </Badge>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {edition.location}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarDays className="h-4 w-4 text-celeste-dark" />
                    <span className="font-medium">{edition.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Theater className="h-4 w-4 text-celeste-dark" />
                    <span>{edition.venue}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-celeste-dark" />
                    <span>{edition.location}, {edition.province}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-celeste-dark" />
                    <span>Hasta {edition.maxBallets} delegaciones</span>
                  </div>
                </div>

                {edition.freeAdmission && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                    <Ticket className="h-4 w-4" />
                    Entradas libres y gratuitas para el público
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <Button asChild className="flex-1 rounded-full">
                    <a href="#programa">Ver Programa</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 rounded-full">
                    <a href="#inscripcion">Inscribirse</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
