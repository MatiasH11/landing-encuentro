"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS } from "@/constants/event-data";
import { EVENT_NAME } from "@/constants/history-data";
import TrackedLink from "@/components/ui/TrackedLink";

const LINKS = NAV_LINKS.filter((l) => l.href !== "#inicio" && l.href !== "#inscripcion");

/** Punto amarillo que late suave para marcar una novedad (quieto con movimiento reducido) */
function PuntoNuevo() {
  return (
    <span aria-hidden className="relative inline-flex size-2.5">
      <span className="punto-late absolute inset-0 rounded-full bg-amarillo" />
      <span className="relative size-2.5 rounded-full bg-amarillo" />
    </span>
  );
}

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
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${EVENT_NAME}, inicio`}>
          {/* El logo tiene trazos oscuros: va sobre una ficha crema, como un sticker */}
          <span className="-rotate-2 rounded-[10px] bg-crema px-1.5 py-1">
            <Image
              src="/images/branding/logo.png"
              alt=""
              width={627}
              height={320}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </span>
          <span className="display hidden text-[1.5rem] leading-none sm:inline">
            Encuentro <span className="text-amarillo">Latinoamericano</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {LINKS.map((link) =>
            link.badge ? (
              // Ítem destacado: en amarillo, con la etiqueta del año y un punto que late
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-extrabold text-amarillo"
              >
                <PuntoNuevo />
                <span className="decoration-amarillo decoration-2 underline-offset-4 group-hover:underline">
                  {link.label}
                </span>
                <span className="-rotate-3 rounded-full bg-rojo px-2 py-0.5 text-[0.75rem] text-crema">{link.badge}</span>
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.9375rem] font-semibold decoration-amarillo decoration-2 underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            )
          )}
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
            className="relative inline-flex min-h-11 items-center gap-2 px-2 font-semibold lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            {/* Con el menú cerrado, el punto avisa que adentro hay algo nuevo */}
            {!open && <PuntoNuevo />}
            {open ? "Cerrar" : "Menú"}
            {!open && <span className="sr-only">(hay fechas 2027)</span>}
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
                  className={`display flex items-center gap-3 py-1.5 text-[2.75rem] hover:text-amarillo ${
                    link.badge ? "text-amarillo" : ""
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="-rotate-3 rounded-full bg-rojo px-3 py-1 font-sans text-[1rem] font-extrabold text-crema">
                      {link.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
