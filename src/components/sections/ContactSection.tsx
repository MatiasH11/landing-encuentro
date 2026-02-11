"use client";

import { CONTACTS } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Facebook, MapPin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export default function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-bg to-cream" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Hablemos
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Contacto
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Escribinos para consultas, inscripciones o más información
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {CONTACTS.map((contact, i) => (
            <motion.div
              key={contact.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-border/30 transition-shadow hover:shadow-2xl"
            >
              {/* Gradient header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-tierra to-tierra-light p-6">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-xl" />
                <div className="absolute -bottom-3 -left-3 h-20 w-20 rounded-full bg-white/20 blur-lg" />
                <div className="relative">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {contact.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">Organizador</p>
                </div>
              </div>

              {/* Contact info */}
              <div className="p-6">
                <div className="space-y-3">
                  <a
                    href={`tel:${contact.phone}`}
                    className="group/item flex items-center gap-3 rounded-lg p-2 text-sm text-muted-foreground transition-all hover:bg-tierra/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tierra/10 transition-colors group-hover/item:bg-tierra/20">
                      <Phone className="h-4 w-4 text-tierra" />
                    </div>
                    <span className="transition-colors group-hover/item:text-tierra">{contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group/item flex items-center gap-3 rounded-lg p-2 text-sm text-muted-foreground transition-all hover:bg-tierra/5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tierra/10 transition-colors group-hover/item:bg-tierra/20">
                      <Mail className="h-4 w-4 text-tierra" />
                    </div>
                    <span className="transition-colors group-hover/item:text-tierra">{contact.email}</span>
                  </a>
                </div>

                {/* WhatsApp CTA */}
                <Button
                  asChild
                  className="mt-6 w-full rounded-full bg-green-600 text-base shadow-md transition-all hover:bg-green-700 hover:shadow-lg"
                >
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Escribir por WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social + location */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.facebook.com/groups/599225440173246"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-border/50 bg-white px-6 py-3 text-sm font-medium text-slate shadow-md transition-all hover:scale-105 hover:border-[#1877F2]/30 hover:shadow-lg"
            >
              <Facebook className="h-5 w-5 text-[#1877F2] transition-transform group-hover:scale-110" />
              Grupo de Facebook
            </a>
            <a
              href="https://www.instagram.com/encuentrolatinoamericano"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-border/50 bg-white px-6 py-3 text-sm font-medium text-slate shadow-md transition-all hover:scale-105 hover:border-pink-500/30 hover:shadow-lg"
            >
              <Instagram className="h-5 w-5 text-pink-500 transition-transform group-hover:scale-110" />
              Instagram
            </a>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-tierra" />
            Mar del Plata, Argentina
          </p>
        </motion.div>
      </div>
    </section>
  );
}
