"use client";

import { CONTACTS } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Facebook, MapPin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-warm-bg to-cream" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
          color: '#5B9BD5'
        }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
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
            ¿Tenés dudas?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Estamos para ayudarte con cualquier consulta sobre el encuentro
          </p>
        </motion.div>

        {/* Main contact container */}
        <motion.div
          className="mt-16 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-border/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2">
            {/* Contact persons */}
            {CONTACTS.map((contact, i) => (
              <motion.div
                key={contact.name}
                className="group relative p-8 transition-colors hover:bg-tierra/5"
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                {/* Divider between cards on desktop */}
                {i === 0 && (
                  <div className="absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
                )}

                {/* Name and role */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    {contact.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-tierra">Organizador del Encuentro</p>
                </div>

                {/* Contact methods */}
                <div className="space-y-4">
                  <a
                    href={`tel:${contact.phone}`}
                    className="group/link flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-white hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tierra text-white transition-transform group-hover/link:scale-110">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Teléfono</p>
                      <p className="text-sm font-semibold text-foreground">{contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    className="group/link flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-white hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tierra text-white transition-transform group-hover/link:scale-110">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">Email</p>
                      <p className="truncate text-sm font-semibold text-foreground">{contact.email}</p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp CTA */}
                <Button
                  asChild
                  size="lg"
                  className="mt-6 w-full rounded-full bg-green-600 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:bg-green-700 hover:shadow-xl"
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
              </motion.div>
            ))}
          </div>

          {/* Footer section with social and location */}
          <div className="border-t border-border/50 bg-gradient-to-r from-warm-bg to-cream p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              {/* Location */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tierra/10">
                  <MapPin className="h-5 w-5 text-tierra" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Ubicaciones</p>
                  <p className="text-sm font-semibold text-foreground">Paso de la Patria & Mar del Plata</p>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <a
                  href="https://www.facebook.com/groups/599225440173246"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-[#1877F2] transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="https://www.instagram.com/encuentrolatinoamericano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-pink-500 transition-transform group-hover:scale-110" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Help text */}
        <motion.p
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Respondemos todas las consultas a la brevedad
        </motion.p>
      </div>
    </section>
  );
}
