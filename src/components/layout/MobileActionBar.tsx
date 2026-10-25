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
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-bg px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_-16px_rgb(20_33_46/0.4)] sm:hidden">
      <TrackedLink
        href={inscriptionHref}
        target="_blank"
        rel="noopener noreferrer"
        event="Lead"
        params={{ content_name: "WhatsApp Inscripcion", edition, placement: "barra" }}
        className="button min-h-12 flex-1 text-body"
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
          className="button button-quiet min-h-12 text-body text-ink"
          aria-label={`Escribir por WhatsApp a ${second.name}`}
        >
          {second.name.split(" ")[0]}
        </TrackedLink>
      )}
    </div>
  );
}
