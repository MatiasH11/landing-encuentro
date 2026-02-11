import { CONTACTS } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Facebook, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-bg to-cream" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Hablemos
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Contacto
          </h2>
          <p className="mt-4 text-muted-foreground">
            Escribinos para consultas, inscripciones o más información
          </p>
        </div>

        {/* Contact cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CONTACTS.map((contact) => (
            <div
              key={contact.name}
              className="group rounded-3xl border border-border/50 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Name */}
              <h3 className="font-heading text-xl font-bold text-foreground">
                {contact.name}
              </h3>

              {/* Contact info */}
              <div className="mt-5 space-y-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-sm text-slate transition-colors hover:text-tierra"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tierra/10">
                    <Phone className="h-4 w-4 text-tierra" />
                  </div>
                  {contact.phone}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-sm text-slate transition-colors hover:text-tierra"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tierra/10">
                    <Mail className="h-4 w-4 text-tierra" />
                  </div>
                  {contact.email}
                </a>
              </div>

              {/* WhatsApp CTA */}
              <Button
                asChild
                className="mt-6 w-full rounded-full bg-green-600 text-base hover:bg-green-700"
              >
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Social + location */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <a
            href="https://www.facebook.com/profile.php?id=100063657592907"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-border/50 bg-white px-6 py-3 text-sm font-medium text-slate shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <Facebook className="h-5 w-5 text-[#1877F2]" />
            Seguinos en Facebook
          </a>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Corrientes, Argentina
          </p>
        </div>
      </div>
    </section>
  );
}
