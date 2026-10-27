"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import { CONTACTS } from "@/constants/event-data";
import { whatsappLink } from "@/lib/editions";
import TrackedLink from "@/components/ui/TrackedLink";

const GLOBITO_VISTO = "fab-globito-cerrado";

/**
 * Botón flotante de WhatsApp con el menú de contactos. Solo desde tablet: en el teléfono la barra fija de abajo ya
 * tiene los dos WhatsApp, y el botón encima tapaba texto y fotos del borde derecho.
 */
export default function WhatsAppFAB({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  const [globito, setGlobito] = useState(false);

  // El globito aparece a los 3 segundos, salvo que ya lo hayan cerrado en esta visita.
  // Se va solo a los 12 segundos o apenas la persona empieza a recorrer la página, para no tapar texto.
  useEffect(() => {
    let cerrado = false;
    try {
      cerrado = sessionStorage.getItem(GLOBITO_VISTO) === "1";
    } catch {}
    if (cerrado) return;
    const mostrar = setTimeout(() => setGlobito(true), 3000);
    const ocultar = setTimeout(() => setGlobito(false), 15000);
    const onScroll = () => {
      if (window.scrollY > 400) setGlobito(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(mostrar);
      clearTimeout(ocultar);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mientras la galería ocupa el centro de la pantalla el botón se aparta, para no tapar fotos.
  // El WhatsApp sigue a mano en el header (desktop) y en la barra fija (teléfono).
  const [enGaleria, setEnGaleria] = useState(false);
  useEffect(() => {
    const galeria = document.getElementById("galeria");
    if (!galeria || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setEnGaleria(e.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
    });
    io.observe(galeria);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const cerrarGlobito = () => {
    setGlobito(false);
    try {
      sessionStorage.setItem(GLOBITO_VISTO, "1");
    } catch {}
  };

  const toggle = () => {
    setOpen((v) => !v);
    cerrarGlobito();
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 transition-[opacity,translate] duration-300 sm:flex ${
        enGaleria && !open ? "pointer-events-none translate-y-6 opacity-0" : ""
      }`}
      inert={enGaleria && !open}
    >
      {/* El globito va arriba del botón */}
      {globito && !open && (
        <div data-menu className="sticker absolute bottom-[5.25rem] right-0 flex items-center gap-1 whitespace-nowrap bg-crema py-2 pl-4 pr-2 text-[0.9375rem] text-tinta shadow-[0_5px_0_var(--color-tinta)]">
          <button type="button" onClick={toggle} className="font-extrabold">
            ¿Consultas? Escribinos
          </button>
          <button
            type="button"
            onClick={cerrarGlobito}
            className="grid size-7 place-items-center rounded-full hover:bg-crema-oscuro"
            aria-label="Cerrar aviso"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      )}

      {open && (
        <>
          {/* Clic afuera cierra el menú */}
          <div className="fixed inset-0 -z-10" onClick={() => setOpen(false)} aria-hidden />
          <ul id="fab-contactos" data-menu className="flex flex-col items-end gap-2">
            {CONTACTS.map((contact) => (
              <li key={contact.name}>
                <TrackedLink
                  href={whatsappLink(contact, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="Contact"
                  params={{ content_name: "WhatsApp", placement: "flotante" }}
                  className="pill bg-crema shadow-[0_5px_0_var(--color-tinta)]"
                >
                  <FaWhatsapp className="size-5" aria-hidden />
                  Escribir a {contact.name.split(" ")[0]}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="relative">
        {!open && <span aria-hidden className="fab-pulso absolute inset-0 rounded-full bg-amarillo" />}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="fab-contactos"
          aria-label={open ? "Cerrar contactos de WhatsApp" : "Escribir por WhatsApp"}
          className="relative grid size-16 place-items-center rounded-full bg-amarillo text-tinta shadow-[0_5px_0_var(--color-tinta)] transition-transform duration-150 active:scale-95"
        >
          {open ? <X className="size-7" aria-hidden /> : <FaWhatsapp className="size-8" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
