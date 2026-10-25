"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/event-data";
import TrackedLink from "@/components/ui/TrackedLink";

const LINKS = NAV_LINKS.filter((l) => l.href !== "#inicio" && l.href !== "#inscripcion");

interface HeaderProps {
  inscriptionHref: string;
  edition: string;
}

export default function Header({ inscriptionHref, edition }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape cierra el menú y el foco queda atrapado adentro mientras está abierto
  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    if (!nav) return;
    const focusable = nav.querySelectorAll<HTMLElement>("a, button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-tinta text-crema">
      <div className="flex h-16 items-center justify-between gap-6 px-4 sm:px-7">
        <a href="#inicio" className="display text-[1.375rem] leading-none sm:text-[1.625rem]">
          Encuentro <span className="text-amarillo">Latinoamericano</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.9375rem] font-semibold decoration-amarillo decoration-2 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <TrackedLink
            href={inscriptionHref}
            target="_blank"
            rel="noopener noreferrer"
            event="Lead"
            params={{ content_name: "WhatsApp Inscripcion", edition, placement: "header" }}
            className="pill hidden min-h-11 text-[0.9375rem] sm:inline-flex"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            Inscribí tu ballet
          </TrackedLink>
          <button
            ref={toggleRef}
            type="button"
            className="min-h-11 px-2 font-semibold lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          ref={navRef}
          id="menu-movil"
          data-menu
          className="bg-tinta px-4 pb-8 pt-2 sm:px-7 lg:hidden"
          aria-label="Navegación móvil"
        >
          <ul>
            {NAV_LINKS.filter((l) => l.href !== "#inicio").map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block py-1.5 text-[2.75rem] hover:text-amarillo"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
