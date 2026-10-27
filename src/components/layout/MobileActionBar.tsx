import { FaWhatsapp } from "react-icons/fa";
import { CONTACTS } from "@/constants/event-data";
import TrackedLink from "@/components/ui/TrackedLink";
import { whatsappLink } from "@/lib/editions";

interface MobileActionBarProps {
  inscriptionHref: string;
  edition: string;
  message: string;
}

/**
 * En el teléfono, la inscripción queda siempre a mano, abajo: el rótulo a la izquierda y un botón por contacto,
 * los dos iguales y con el nombre de quién atiende.
 */
export default function MobileActionBar({ inscriptionHref, edition, message }: MobileActionBarProps) {
  const [first, second] = CONTACTS;
  const botones = [
    { contact: first, href: inscriptionHref, color: "", placement: "barra" },
    ...(second
      ? [{ contact: second, href: whatsappLink(second, message), color: "bg-turquesa", placement: "barra-2" }]
      : []),
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-tinta px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 text-crema sm:hidden">
      <p aria-hidden className="display shrink-0 text-[1.0625rem] leading-[0.95] text-amarillo">
        Inscribí
        <br />
        tu ballet
      </p>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {botones.map(({ contact, href, color, placement }) => (
          <TrackedLink
            key={contact.name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            event="Lead"
            params={{ content_name: "WhatsApp Inscripcion", edition, placement }}
            className={`pill min-h-12 gap-2 px-3 ${color}`}
            aria-label={`Inscribir tu ballet: WhatsApp a ${contact.name}`}
          >
            <FaWhatsapp className="size-5 shrink-0" aria-hidden />
            {contact.name.split(" ")[0]}
          </TrackedLink>
        ))}
      </div>
    </div>
  );
}
