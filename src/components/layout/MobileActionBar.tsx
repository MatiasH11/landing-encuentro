"use client";

import { useSyncExternalStore } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACTS } from "@/constants/event-data";
import TrackedLink from "@/components/ui/TrackedLink";
import { ctaHeroFuera, suscribirCtaHero } from "@/lib/cta-hero";

interface MobileActionBarProps {
  inscriptionHref: string;
  edition: string;
}

/**
 * En el teléfono, la inscripción queda siempre a mano, abajo: un solo botón, con el nombre de quién atiende.
 * Aparece cuando el botón del hero sale de pantalla, para no repetirlo en el inicio (sin JS queda siempre).
 */
export default function MobileActionBar({ inscriptionHref, edition }: MobileActionBarProps) {
  const visible = useSyncExternalStore(suscribirCtaHero, ctaHeroFuera, () => false);
  const nombre = CONTACTS[0].name.split(" ")[0];

  return (
    <div
      data-tras-hero="barra"
      data-visible={visible || undefined}
      className="fixed inset-x-0 bottom-0 z-40 bg-tinta px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden"
    >
      <TrackedLink
        href={inscriptionHref}
        target="_blank"
        rel="noopener noreferrer"
        event="Lead"
        params={{ content_name: "WhatsApp Inscripcion", edition, placement: "barra" }}
        className="pill min-h-12 w-full"
      >
        <FaWhatsapp className="size-5 shrink-0" aria-hidden />
        <span>
          Inscribí tu ballet <span className="font-semibold opacity-75">con {nombre}</span>
        </span>
      </TrackedLink>
    </div>
  );
}
