"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/event-data";
import { EVENT_NAME } from "@/constants/history-data";
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
    <header className="fixed inset-x-0 top-0 z-50 bg-bg">
      <div className="flex h-16 items-center justify-between gap-6 px-4 sm:h-[72px] sm:px-7">
        <a href="#inicio" className="shrink-0" aria-label={`${EVENT_NAME}, inicio`}>
          <Image
            src="/images/branding/logo.png"
            alt=""
            width={627}
            height={320}
            className="h-11 w-auto sm:h-12"
            priority
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="link text-small font-semibold">
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
            className="button hidden min-h-11 text-small sm:inline-flex"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            Inscribí tu ballet
          </TrackedLink>
          <button
            ref={toggleRef}
            type="button"
            className="min-h-11 px-2 text-small font-semibold lg:hidden"
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
          className="bg-bg px-4 pb-6 shadow-[0_24px_32px_-24px_rgb(20_33_46/0.35)] sm:px-7 lg:hidden"
          aria-label="Navegación móvil"
        >
          <ul>
            {NAV_LINKS.filter((l) => l.href !== "#inicio").map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block py-2 text-head"
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
