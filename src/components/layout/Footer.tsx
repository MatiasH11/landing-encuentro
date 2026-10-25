import { CONTACTS, NAV_LINKS } from "@/constants/event-data";
import { EVENT_NAME, EVENT_TAGLINE } from "@/constants/history-data";
import TrackedLink from "@/components/ui/TrackedLink";

export default function Footer() {
  const year = new Date().getFullYear();
  const main = CONTACTS[0];

  return (
    <footer className="text-crema">
      <div className="guarda" aria-hidden />
      <div className="grano bg-bordo px-4 pb-28 pt-16 sm:px-7 sm:pb-10 sm:pt-24">
        <p className="display text-[clamp(2.75rem,6vw,5.5rem)]">
          ¿Tu ballet <span className="text-amarillo">se suma?</span>
        </p>
        <p className="mt-8 text-[1.125rem] font-semibold">Llamá o escribí a {main.name}:</p>
        <TrackedLink
          href={`tel:${main.phone.replace(/\s/g, "")}`}
          event="Contact"
          params={{ content_name: "Telefono", placement: "footer" }}
          className="display tabular mt-2 block whitespace-nowrap text-[11.5vw] text-amarillo hover:text-crema sm:text-[clamp(4rem,9vw,9rem)]"
        >
          {main.phone}
        </TrackedLink>

        <div className="mt-16 grid gap-6 text-[0.9375rem] sm:grid-cols-3">
          <nav aria-label="Secciones" className="flex flex-wrap gap-x-5">
            {NAV_LINKS.filter((l) => l.href !== "#inicio").map((link) => (
              <a key={link.href} href={link.href} className="inline-block py-2 font-semibold hover:text-amarillo">
                {link.label}
              </a>
            ))}
          </nav>
          <p className="sm:text-center">{EVENT_TAGLINE}</p>
          <p className="sm:text-right">
            © {year} {EVENT_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
