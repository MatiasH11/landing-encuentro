"use client";

import Image from "next/image";
import {
  HISTORY_TEXT,
  OBJECTIVES,
  ORGANIZERS,
  ORGANIZED_BY,
  STATS,
} from "@/constants/history-data";
import { Award, CheckCircle, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function HistorySection() {
  return (
    <section id="historia" className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-tierra md:text-sm">
            {HISTORY_TEXT.intro}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground md:mt-4 md:text-4xl lg:text-5xl">
            {HISTORY_TEXT.headline}
          </h2>
        </div>

        {/* Stats - Destacados */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-gradient-to-br from-tierra/5 to-celeste/5 p-4 text-center ring-1 ring-border/50 md:rounded-2xl md:p-8"
            >
              <p className="font-heading text-3xl font-bold text-tierra md:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium leading-snug text-slate md:mt-3 md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story con imagen */}
        <div className="mt-16 grid gap-8 md:mt-24 md:gap-16 lg:grid-cols-2 lg:items-center">
          {/* Imagen */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl md:rounded-2xl md:shadow-2xl">
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
          <div className="order-1 space-y-6 md:space-y-8 lg:order-2">
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                Nuestra Historia
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate md:mt-4 md:text-lg">
                {HISTORY_TEXT.body}
              </p>
            </div>

            <p className="text-base leading-relaxed text-slate md:text-lg">
              {HISTORY_TEXT.mission}
            </p>

            <p className="text-base leading-relaxed text-slate md:text-lg">
              {HISTORY_TEXT.impact}
            </p>
          </div>
        </div>

        {/* Trust factors */}
        <div className="mt-16 md:mt-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="grid gap-4 md:grid-cols-2 md:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div
                className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-border/30 bg-white p-6 md:gap-6 md:p-8"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(91, 155, 213, 0.4)",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 -z-0 bg-gradient-to-br from-tierra/5 to-celeste/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Shield className="relative z-10 h-6 w-6 shrink-0 text-tierra md:h-7 md:w-7" />
                </motion.div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    Un evento con respaldo institucional
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate/80 md:text-base">
                    {HISTORY_TEXT.trust}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-border/30 bg-white p-6 md:gap-6 md:p-8"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(91, 155, 213, 0.4)",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 -z-0 bg-gradient-to-br from-tierra/5 to-celeste/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Award className="relative z-10 h-6 w-6 shrink-0 text-tierra md:h-7 md:w-7" />
                </motion.div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    Experiencia comprobada
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate/80 md:text-base">
                    {HISTORY_TEXT.credibility}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Objetivos */}
        <div className="mt-16 md:mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-tierra md:text-sm">
              Nuestros Objetivos
            </p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Lo que buscamos lograr
            </h3>
          </div>

          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Image */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl md:rounded-2xl">
                <Image
                  src="/images/gallery/familia.jpeg"
                  alt="Familias y delegaciones en el Encuentro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Objectives List */}
            <motion.div
              className="order-1 space-y-4 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {OBJECTIVES.map((objective, i) => (
                <motion.div
                  key={i}
                  className="group flex gap-3 rounded-xl bg-white p-4 ring-1 ring-border/30 transition-all hover:ring-tierra/30 hover:shadow-md md:gap-4 md:p-5"
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <motion.div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tierra/10 transition-colors group-hover:bg-tierra/20 md:h-10 md:w-10"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CheckCircle className="h-4 w-4 text-tierra md:h-5 md:w-5" />
                  </motion.div>
                  <p className="text-sm leading-relaxed text-slate md:text-base">
                    {objective}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Organizers */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl bg-gradient-to-br from-tierra to-tierra-light p-6 text-center text-white shadow-lg md:rounded-2xl md:p-8">
            {/* Header with icon and title */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 md:h-12 md:w-12">
                <Heart className="h-5 w-5 text-white md:h-6 md:w-6" />
              </div>
              <h3 className="text-lg font-bold md:text-xl">
                Organizado con dedicación
              </h3>
            </div>

            {/* Organized by */}
            <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
              {ORGANIZED_BY.join(" y ")}
            </p>

            {/* Directors */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {ORGANIZERS.map((org) => (
                <div key={org.name}>
                  <p className="text-sm font-semibold leading-tight md:text-base">{org.name}</p>
                  <p className="mt-1 text-xs text-white/60">{org.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
