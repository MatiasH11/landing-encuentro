"use client";

import Image from "next/image";
import { EDITIONS_2026 } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Theater, Users, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const EDITION_IMAGES = [
  "/images/gallery/imagen-3.jpeg",
  "/images/gallery/imagen-6.jpeg",
];

export default function UpcomingEditionsSection() {
  return (
    <section id="ediciones" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Próximamente
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Ediciones 2026
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Dos encuentros, dos ciudades, una misma pasión por el folclore
          </p>
        </motion.div>

        {/* Edition cards */}
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {EDITIONS_2026.map((edition, i) => (
            <motion.div
              key={edition.id}
              className="group relative overflow-hidden rounded-3xl border border-border/30 bg-white shadow-lg transition-all"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Image header */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={EDITION_IMAGES[i]}
                  alt={`${edition.title} en ${edition.location}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-tierra-dark/90 via-tierra/40 to-transparent"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute bottom-5 left-6 right-6">
                  <Badge className="mb-3 rounded-full bg-tierra/95 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                    {edition.editionNumber}º Edición
                  </Badge>
                  <h3 className="font-heading text-3xl font-bold text-white drop-shadow-lg">
                    {edition.location}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-7">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-lg bg-tierra/5 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tierra/10">
                      <CalendarDays className="h-5 w-5 text-tierra" />
                    </div>
                    <span className="font-semibold text-foreground">{edition.dateRange}</span>
                  </div>
                  <div className="flex items-center gap-4 text-base text-muted-foreground">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                      <Theater className="h-5 w-5 text-tierra" />
                    </div>
                    <span>{edition.venue}</span>
                  </div>
                  <div className="flex items-center gap-4 text-base text-muted-foreground">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                      <MapPin className="h-5 w-5 text-tierra" />
                    </div>
                    <span>{edition.location}, {edition.province}</span>
                  </div>
                  <div className="flex items-center gap-4 text-base text-muted-foreground">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                      <Users className="h-5 w-5 text-tierra" />
                    </div>
                    <span>Hasta {edition.maxBallets} delegaciones</span>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-amber-50 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
                      <AlertCircle className="h-5 w-5 text-amber-700" />
                    </div>
                    <span className="font-semibold text-amber-900">Cupos limitados</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button asChild className="flex-1 rounded-full bg-tierra hover:bg-tierra-dark">
                    <a href="#programa">Ver Programa</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 rounded-full border-2 border-tierra/30 text-tierra hover:bg-tierra/5 hover:border-tierra">
                    <a href="#inscripcion">Inscribirse</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
