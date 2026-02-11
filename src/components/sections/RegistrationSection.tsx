import { EDITIONS_2026, CONTACTS } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, MessageCircle } from "lucide-react";

export default function RegistrationSection() {
  return (
    <section id="inscripcion" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-warm-bg" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Participá
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Inscripción y Costos
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {EDITIONS_2026.map((edition) => (
            <div
              key={edition.id}
              className="overflow-hidden rounded-3xl border border-border/50 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-tierra-dark to-tierra-deep p-6 text-white">
                <p className="text-sm font-medium text-white/70">{edition.editionNumber}º Edición</p>
                <h3 className="mt-1 font-heading text-2xl font-bold">{edition.location}</h3>
                <p className="mt-1 text-sm text-white/70">{edition.dateRange}</p>
              </div>

              <div className="p-6">
                {/* Price */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Valor por persona</p>
                  <p className="mt-1 text-4xl font-bold text-foreground">
                    ${edition.costPerPerson.toLocaleString("es-AR")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Seña: ${edition.depositPerPerson.toLocaleString("es-AR")} por bailarín
                  </p>
                </div>

                {/* Inclusions */}
                <div className="mt-6 space-y-2.5">
                  {edition.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span className="text-slate">{inc.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border/50 bg-white p-8 shadow-sm">
          <h3 className="font-heading text-xl font-bold text-foreground">
            Requisitos para participar
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Mínimo 15 integrantes por ballet",
              "Cupo máximo: 30 ballets y 2 grupos musicales",
              "2 noches de actuación garantizadas por grupo",
              "15 minutos máximo por presentación",
              "2 delegaciones por provincia/país + 1 grupo musical",
              "Niños desde 4 años abonan tarifa completa",
            ].map((req, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-celeste-dark" />
                <span className="text-slate">{req}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-tierra">
            Fecha límite de pago: 10 de noviembre de 2026
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-muted-foreground">
            ¿Querés inscribir a tu delegación?
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-green-600 px-8 text-base hover:bg-green-700"
          >
            <a
              href={CONTACTS[0].whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Consultar e Inscribirse por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
