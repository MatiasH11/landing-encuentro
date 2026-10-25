import Image from "next/image";
import { CONTACTS } from "@/constants/event-data";
import { ORGANIZERS } from "@/constants/history-data";
import TrackedLink from "@/components/ui/TrackedLink";

export default function ContactSection() {
  return (
    <section id="contacto" className="px-4 pb-28 pt-24 sm:px-7 sm:pb-32 sm:pt-32">
      <h2 className="display text-head">
        Hablá con quienes lo organizan
      </h2>

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <p className="max-w-[26ch] text-lead">
            Escribinos o llamanos: te contamos costos, formas de pago y cómo inscribir a tu
            delegación.
          </p>
          <div className="relative mt-8 aspect-[4/3] w-full max-w-[420px] overflow-clip">
            <Image
              src="/images/gallery/familia.jpeg"
              alt="Familias y delegaciones en el escenario del Encuentro"
              fill
              sizes="(max-width: 640px) 92vw, 420px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid content-start gap-12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:gap-x-6">
          {CONTACTS.map((contact) => (
            <div key={contact.name}>
              <h3 className="text-lead font-semibold">{contact.name}</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <TrackedLink
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    event="Contact"
                    params={{ content_name: "WhatsApp" }}
                    className="link font-semibold"
                  >
                    WhatsApp
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    event="Contact"
                    params={{ content_name: "Telefono" }}
                    className="link tabular"
                  >
                    {contact.phone}
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    href={`mailto:${contact.email}`}
                    event="Contact"
                    params={{ content_name: "Email" }}
                    className="link break-all"
                  >
                    {contact.email}
                  </TrackedLink>
                </li>
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2">
            <h3 className="font-semibold">Dirección general</h3>
            <p className="mt-2 text-muted">{ORGANIZERS.map((o) => o.name).join(" · ")}</p>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
              <a
                href="https://www.facebook.com/groups/599225440173246"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/encuentrolatinoamericano"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
