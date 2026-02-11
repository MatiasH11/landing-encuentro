import Image from "next/image";
import { CONTACTS, NAV_LINKS } from "@/constants/event-data";
import { EVENT_NAME, ORGANIZED_BY } from "@/constants/history-data";
import { Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-tierra-deep text-white">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-tierra-dark/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/branding/logo.png"
              alt={EVENT_NAME}
              width={180}
              height={54}
              className="h-12 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Organizado por {ORGANIZED_BY.join(" y ")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Contacto
            </h4>
            <ul className="mt-4 space-y-4">
              {CONTACTS.map((contact) => (
                <li key={contact.name} className="space-y-1.5">
                  <p className="text-sm font-medium text-white/80">{contact.name}</p>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{contact.email}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a
              href="https://www.facebook.com/profile.php?id=100063657592907"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-white/30">
            &copy; {currentYear} {EVENT_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
