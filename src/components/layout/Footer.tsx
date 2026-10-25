import { CONTACTS, NAV_LINKS } from "@/constants/event-data";
import { EVENT_NAME, ORGANIZED_BY } from "@/constants/history-data";
import TrackedLink from "@/components/ui/TrackedLink";

export default function Footer() {
  const year = new Date().getFullYear();
  const main = CONTACTS[0];

  return (
    <footer className="flex min-h-[70svh] flex-col bg-accent px-4 pb-28 pt-10 text-accent-ink sm:px-7 sm:pb-8">
      <div className="grid gap-6 text-small sm:grid-cols-12 sm:gap-x-6">
        <p className="font-semibold sm:col-span-4">{EVENT_NAME}</p>
        <p className="sm:col-span-4">Organizan {ORGANIZED_BY.join(" y ")}.</p>
        <a href="#inicio" className="link font-semibold sm:col-span-4 sm:justify-self-end">
          Volver arriba ↑
        </a>
      </div>

      <div className="mt-auto pt-24">
        <p className="text-lead">Para inscribir a tu ballet, llamá o escribí a {main.name}:</p>
        <TrackedLink
          href={`tel:${main.phone.replace(/\s/g, "")}`}
          event="Contact"
          params={{ content_name: "Telefono", placement: "footer" }}
          className="display tabular mt-4 block whitespace-nowrap text-[9vw] leading-[0.95] sm:text-display"
        >
          {main.phone}
        </TrackedLink>
      </div>

      <div className="mt-12 grid gap-3 text-small sm:grid-cols-3">
        <nav aria-label="Secciones" className="flex flex-wrap gap-x-5">
          {NAV_LINKS.filter((l) => l.href !== "#inicio").map((link) => (
            <a key={link.href} href={link.href} className="link inline-block py-2">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="sm:text-center">Fotos: ediciones anteriores del Encuentro</p>
        <p className="sm:text-right">Paso de la Patria · Mar del Plata · © {year}</p>
      </div>
    </footer>
  );
}
