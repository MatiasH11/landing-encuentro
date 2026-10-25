"use client";

import { useId, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACTS } from "@/constants/event-data";
import { trackEvent } from "@/lib/pixel";
import { whatsappLink } from "@/lib/editions";
import type { EventEdition } from "@/types";

function buildMessage(
  edition: EventEdition,
  past: boolean,
  ballet: string,
  city: string,
  members: string
) {
  const parts = [`Hola! Soy director/a${ballet ? ` del ballet ${ballet}` : " de un ballet"}`];
  if (city) parts[0] += ` de ${city}`;
  parts[0] += ".";
  parts.push(
    past
      ? "Queremos participar en la próxima edición del Encuentro Latinoamericano"
      : `Queremos participar en el ${edition.editionNumber}º Encuentro Latinoamericano en ${edition.location} (${edition.dateRange})`
  );
  if (members) parts[1] += ` con ${members} integrantes`;
  parts[1] += ".";
  parts.push("¿Me pasan costos y formas de pago?");
  return parts.join(" ");
}

interface RegistrationSectionProps {
  edition: EventEdition;
  /** La edición destacada ya pasó y todavía no se cargó la siguiente */
  isPast: boolean;
}

export default function RegistrationSection({ edition, isPast }: RegistrationSectionProps) {
  const id = useId();
  const [ballet, setBallet] = useState("");
  const [city, setCity] = useState("");
  const [members, setMembers] = useState("");
  const [contactIndex, setContactIndex] = useState(0);

  const contact = CONTACTS[contactIndex];
  const message = buildMessage(edition, isPast, ballet.trim(), city.trim(), members.trim());
  const tooFew = members !== "" && Number(members) < edition.minMembersPerBallet;

  const field =
    "mt-2 block min-h-12 w-full rounded-[12px] bg-white px-4 text-tinta transition-shadow duration-150 shadow-[inset_0_0_0_2px_var(--color-crema-oscuro)] focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_3px_var(--color-bordo)]";

  return (
    <section id="inscripcion" className="relative bg-turquesa px-4 py-24 text-tinta sm:px-7 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[clamp(3.25rem,8vw,8rem)]" data-reveal>
          <span className="block">Tu ballet</span>
          <span className="tag bg-bordo text-crema">en escena</span>
        </h2>
        <span className="sticker bg-amarillo text-[1rem] sm:text-[1.5rem]" data-reveal>
          {isPast ? "Próxima edición" : `${edition.dateRange.replace(/ de \d{4}$/, "")} · ${edition.location}`}
        </span>
      </div>

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" data-reveal>
          <h3 className="display text-[2.25rem]">
            {isPast ? `Qué incluyó en ${edition.location}` : `Qué incluye en ${edition.location}`}
          </h3>
          <ul className="mt-6 space-y-3">
            {edition.inclusions.map((inclusion) => (
              <li key={inclusion.label} className="flex gap-3 text-[1.1875rem] font-semibold">
                <span aria-hidden className="mt-2 size-3.5 shrink-0 rotate-45 bg-bordo" />
                {inclusion.label}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[44ch]">
            Pueden participar hasta {edition.maxBallets} ballets, con un mínimo de{" "}
            {edition.minMembersPerBallet} integrantes cada uno, y {edition.maxMusicGroups} grupos
            musicales. Costos y formas de pago se consultan por WhatsApp
            {isPast ? "." : `; la fecha límite de pago es el ${edition.paymentDeadline}.`}
          </p>
        </div>

        {/* Lo vivo de la página: la consulta se arma mientras escribís y sale por WhatsApp */}
        <form
          className="rounded-[28px] bg-crema p-6 shadow-[12px_12px_0_var(--color-bordo)] sm:p-8 lg:col-span-7"
          onSubmit={(e) => {
            e.preventDefault();
            trackEvent("Lead", {
              content_name: "WhatsApp Inscripcion",
              edition: edition.location,
              placement: "consulta",
            });
            window.open(whatsappLink(contact, message), "_blank", "noopener,noreferrer");
          }}
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <h3 className="display text-[2.5rem]">Armá tu consulta</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block font-semibold">
              Nombre del ballet
              <input
                className={field}
                value={ballet}
                onChange={(e) => setBallet(e.target.value)}
                autoComplete="organization"
              />
            </label>
            <label className="block font-semibold">
              Ciudad o país
              <input
                className={field}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
              />
            </label>
            <label className="block font-semibold">
              Integrantes
              <input
                className={field}
                type="number"
                inputMode="numeric"
                min={1}
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                aria-describedby={`${id}-min`}
                aria-invalid={tooFew || undefined}
              />
              <span
                id={`${id}-min`}
                className={`mt-2 block text-[0.875rem] font-normal ${tooFew ? "font-semibold text-[#b42318]" : "text-tinta-suave"}`}
              >
                Mínimo {edition.minMembersPerBallet} por ballet.
              </span>
            </label>
            <fieldset>
              <legend className="font-semibold">Escribirle a</legend>
              <div className="mt-2 flex gap-2">
                {CONTACTS.map((c, i) => (
                  <label
                    key={c.name}
                    className={`flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-full px-3 font-extrabold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-bordo ${
                      i === contactIndex ? "bg-bordo text-crema" : "bg-crema-oscuro text-tinta"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${id}-contact`}
                      className="sr-only"
                      checked={i === contactIndex}
                      onChange={() => setContactIndex(i)}
                    />
                    {c.name.split(" ")[0]}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <p className="mt-6 rounded-[16px] bg-crema-oscuro p-4 text-tinta-suave">{message}</p>

          <button type="submit" className="pill mt-6 min-h-14 w-full whitespace-normal py-3 text-center text-[1.0625rem]">
            <FaWhatsapp className="h-5 w-5" aria-hidden />
            Enviar por WhatsApp a {contact.name.split(" ")[0]}
          </button>
        </form>
      </div>
    </section>
  );
}
