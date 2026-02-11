"use client";

import { EDITIONS_2026, CONTACTS } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function RegistrationSection() {
  return (
    <section id="inscripcion" className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-warm-bg to-white" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Inscripción
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            ¿Qué incluye tu participación?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Beneficios y experiencias incluidas en las ediciones 2026
          </p>
        </motion.div>

        {/* Edition cards */}
        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {EDITIONS_2026.map((edition) => (
            <motion.div
              key={edition.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-border/50 transition-shadow hover:shadow-2xl"
            >
              {/* Card header with gradient */}
              <div className="relative overflow-hidden bg-gradient-to-br from-tierra to-tierra-light p-8">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/20 blur-xl" />
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white">
                    {edition.location}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-white">
                    {edition.dateRange}
                  </p>
                  <p className="mt-1 text-xs text-white/90">{edition.venue}</p>
                </div>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-8">
                <div className="flex-1 space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-tierra">
                    Incluye
                  </p>
                  {edition.inclusions.map((inclusion, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-tierra/10">
                        <Check className="h-3.5 w-3.5 text-tierra" />
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {inclusion.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp button */}
                <div className="mt-6">
                  <Button
                    asChild
                    className="w-full rounded-full bg-tierra text-white shadow-md transition-all hover:bg-tierra-dark hover:shadow-lg"
                  >
                    <a
                      href={CONTACTS[0].whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Consultar por WhatsApp
                    </a>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Consultá costos y formas de pago
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
