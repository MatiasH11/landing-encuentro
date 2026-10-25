import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACTS } from "@/constants/event-data";
import { EVENT_NAME, HISTORY_TEXT, ORGANIZED_BY, ORGANIZERS } from "@/constants/history-data";
import TrackedLink from "@/components/ui/TrackedLink";

const CARD_COLORS = ["bg-bordo text-crema", "bg-amarillo text-tinta"];

export default function ContactSection() {
  return (
    <section id="contacto" className="px-4 py-24 sm:px-7 sm:py-32">
      <h2 className="display text-[clamp(3.25rem,8vw,8rem)]">
        <span className="block">Hablá con</span>
        <span className="block text-bordo">quienes lo organizan</span>
      </h2>
      <p className="mt-6 max-w-[48ch] text-[1.25rem] font-semibold">
        Escribinos o llamanos: te contamos costos, formas de pago y cómo inscribir a tu delegación.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {CONTACTS.map((contact, i) => (
          <article
            key={contact.name}
            className={`flex flex-col justify-between gap-10 rounded-[28px] p-6 sm:p-8 ${CARD_COLORS[i % CARD_COLORS.length]}`}
          >
            <h3 className="display text-[clamp(2.5rem,4.5vw,4rem)]">{contact.name}</h3>
            <div className="space-y-4">
              <TrackedLink
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                event="Contact"
                params={{ content_name: "WhatsApp" }}
                className={`pill ${i === 0 ? "" : "pill-tinta"}`}
              >
                <FaWhatsapp className="h-5 w-5" aria-hidden />
                Escribir por WhatsApp
              </TrackedLink>
              <p className="flex flex-col gap-1 text-[1.0625rem] font-semibold">
                <TrackedLink
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  event="Contact"
                  params={{ content_name: "Telefono" }}
                  className="link tabular w-fit"
                >
                  {contact.phone}
                </TrackedLink>
                <TrackedLink
                  href={`mailto:${contact.email}`}
                  event="Contact"
                  params={{ content_name: "Email" }}
                  className="link w-fit break-all"
                >
                  {contact.email}
                </TrackedLink>
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div
          className="copia relative aspect-[4/3] -rotate-2 lg:col-span-5"
          style={{ "--sombra": "var(--color-magenta)" } as React.CSSProperties}
        >
          <Image
            src="/images/gallery/familia.jpeg"
            alt="Familias y delegaciones en el escenario del Encuentro"
            fill
            sizes="(max-width: 1024px) 92vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-6 lg:col-span-6 lg:col-start-7">
          <Image
            src="/images/branding/logo.png"
            alt={EVENT_NAME}
            width={627}
            height={320}
            className="h-auto w-56"
          />
          <p className="text-[1.125rem]">{HISTORY_TEXT.credibility}</p>
          <div>
            <h3 className="font-extrabold">Dirección general</h3>
            <p className="mt-1">{ORGANIZERS.map((o) => o.name).join(" · ")}</p>
            <p className="mt-1 text-tinta-suave">Organizan {ORGANIZED_BY.join(" y ")}.</p>
          </div>
          <p className="flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/groups/599225440173246"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-linea"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/encuentrolatinoamericano"
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-linea"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
