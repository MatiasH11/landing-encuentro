import { FaWhatsapp } from "react-icons/fa";
import { CONTACTS } from "@/constants/event-data";
import TrackedLink from "@/components/ui/TrackedLink";
import { whatsappLink } from "@/lib/editions";

interface MobileActionBarProps {
  inscriptionHref: string;
  edition: string;
  message: string;
}

/** En el teléfono, la inscripción y el WhatsApp quedan siempre a mano, abajo. */
export default function MobileActionBar({ inscriptionHref, edition, message }: MobileActionBarProps) {
  const second = CONTACTS[1];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-tinta px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-crema sm:hidden">
      <TrackedLink
        href={inscriptionHref}
        target="_blank"
        rel="noopener noreferrer"
        event="Lead"
        params={{ content_name: "WhatsApp Inscripcion", edition, placement: "barra" }}
        className="pill min-h-12 flex-1"
      >
        <FaWhatsapp className="h-5 w-5" aria-hidden />
        Inscribí tu ballet
      </TrackedLink>
      {second && (
        <TrackedLink
          href={whatsappLink(second, message)}
          target="_blank"
          rel="noopener noreferrer"
          event="Lead"
          params={{ content_name: "WhatsApp Inscripcion", edition, placement: "barra-2" }}
          className="pill pill-linea min-h-12"
          aria-label={`Escribir por WhatsApp a ${second.name}`}
        >
          {second.name.split(" ")[0]}
        </TrackedLink>
      )}
    </div>
  );
}
