"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Una hoja de la pila: una foto, o la miniatura de un video */
export interface Hoja {
  id: string;
  src: string;
  alt: string;
  etiqueta: string;
  /** Encuadre (object-position) */
  encuadre?: string;
}

interface PilaProps {
  hojas: Hoja[];
  /** "Fotos del Encuentro", "Videos del Encuentro" */
  nombre: string;
  /** Proporción de las hojas, por ejemplo "aspect-video" */
  aspecto: string;
  /** Texto del botón accesible de cada hoja ("Ver en grande", "Ver el video") */
  accion: string;
  /** Tocar la hoja de arriba */
  onTocar: (indice: number) => void;
  /** Cada vez que cambia la hoja de arriba */
  onCambio?: (indice: number) => void;
  /** Se dibuja centrado sobre la hoja de arriba (el botón de play de los videos) */
  sello?: React.ReactNode;
  /** Reemplaza el contenido de la hoja de arriba (el video reproduciéndose); mientras está, no se arrastra */
  contenidoArriba?: React.ReactNode;
  ayuda: string;
}

// Hojas que se ven apiladas y cómo queda cada una según su lugar (0 = la de arriba)
const HOJAS = [
  { x: 0, y: 0, rotate: -1.5, scale: 1 },
  { x: 12, y: 10, rotate: 3, scale: 0.96 },
  { x: -12, y: 20, rotate: -4, scale: 0.92 },
];
const SOMBRAS = ["var(--color-amarillo)", "var(--color-turquesa)", "var(--color-magenta)"];
// Cuánto hay que arrastrar (px) o qué tan rápido (px/s) para tirar la hoja
const UMBRAL = 90;
const VELOCIDAD = 500;

// Cómo cambia la pila: al avanzar, la de arriba sale volando hacia `lado` y entra una nueva al fondo; al volver,
// la anterior vuelve desde `lado` arriba de todo y la del fondo se va
type Cambio = { avanza: boolean; lado: number };
const volando = (c: Cambio) => ({ x: `${c.lado * 120}%`, rotate: c.lado * 18, opacity: 0 });
const alFondo = { y: 40, scale: 0.88, opacity: 0 };
const variantes = {
  entra: (c: Cambio) => (c.avanza ? alFondo : volando(c)),
  sale: (c: Cambio) => ({
    ...(c.avanza ? volando(c) : alFondo),
    transition: { duration: 0.35, ease: "easeOut" as const },
  }),
};

/**
 * Pila de copias impresas: la de arriba se arrastra hacia un costado (o se pasa con las flechas o el teclado) y
 * se va volando; tocarla llama a onTocar. Las de abajo asoman giradas. La usan las fotos y los videos de la
 * galería, así las dos pestañas se ven y se manejan igual.
 * En el teléfono el arrastre es solo horizontal: el scroll vertical de la página pasa de largo.
 * Con movimiento reducido, MotionConfig deja solo el fundido.
 */
export default function Pila({ hojas, nombre, aspecto, accion, onTocar, onCambio, sello, contenidoArriba, ayuda }: PilaProps) {
  const [actual, setActual] = useState(0);
  const [cambio, setCambio] = useState<Cambio>({ avanza: true, lado: -1 });
  // Un arrastre termina con un click: este flag evita que cuente como toque
  const arrastro = useRef(false);
  const n = hojas.length;

  const ir = (nuevo: number, c: Cambio) => {
    setCambio(c);
    setActual(nuevo);
    onCambio?.(nuevo);
  };
  const siguiente = (lado = -1) => ir((actual + 1) % n, { avanza: true, lado });
  const anterior = () => ir((actual - 1 + n) % n, { avanza: false, lado: -1 });

  const soltar = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > UMBRAL || Math.abs(info.velocity.x) > VELOCIDAD) {
      siguiente(info.offset.x < 0 ? -1 : 1);
    }
    window.setTimeout(() => (arrastro.current = false), 0);
  };

  const pila = HOJAS.slice(0, Math.min(HOJAS.length, n)).map((pose, lugar) => {
    const indice = (actual + lugar) % n;
    return { pose, lugar, indice, hoja: hojas[indice] };
  });

  return (
    <div>
      <div
        role="group"
        aria-roledescription="pila"
        aria-label={nombre}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") siguiente();
          if (e.key === "ArrowLeft") anterior();
        }}
        className={`relative mx-auto w-[calc(100%-1.5rem)] max-w-3xl rounded-[18px] ${aspecto}`}
      >
        <AnimatePresence initial={false} custom={cambio}>
          {/* De la del fondo a la de arriba, así la de arriba se pinta encima */}
          {[...pila].reverse().map(({ pose, lugar, indice, hoja }) => {
            const esArriba = lugar === 0;
            const reemplazo = esArriba ? contenidoArriba : null;
            return (
              <m.div
                key={hoja.id}
                custom={cambio}
                variants={variantes}
                initial="entra"
                animate={{ ...pose, opacity: 1 }}
                exit="sale"
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag={esArriba && !reemplazo ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.7}
                onDragStart={() => (arrastro.current = true)}
                onDragEnd={soltar}
                inert={!esArriba}
                className={`absolute inset-0 ${esArriba ? "cinta" : ""}`}
                style={{ zIndex: HOJAS.length - lugar }}
              >
                <div
                  className="copia h-full w-full border-[6px] border-crema bg-tinta"
                  style={{ "--sombra": SOMBRAS[indice % SOMBRAS.length] } as React.CSSProperties}
                >
                  {reemplazo ?? (
                    <button
                      type="button"
                      onClick={() => !arrastro.current && onTocar(indice)}
                      className="block h-full w-full cursor-grab active:cursor-grabbing"
                      aria-label={`${accion}: ${hoja.etiqueta}`}
                    >
                      <Image
                        src={hoja.src}
                        alt={hoja.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 768px) 92vw, 48rem"
                        className={`pointer-events-none object-cover ${hoja.encuadre ?? ""}`}
                      />
                      {esArriba && sello && (
                        <span className="pointer-events-none absolute inset-0 grid place-items-center">{sello}</span>
                      )}
                      <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-crema px-3 py-1 text-left text-[0.875rem] font-extrabold text-tinta">
                        {hoja.etiqueta}
                      </span>
                    </button>
                  )}
                </div>
              </m.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={anterior}
          className="grid size-12 place-items-center rounded-full bg-crema text-tinta shadow-[0_4px_0_var(--color-turquesa)] transition-transform active:scale-95"
          aria-label="Anterior"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <p className="display tabular min-w-[5ch] text-center text-[1.75rem]">
          {actual + 1} <span className="text-crema/60">/ {n}</span>
          <span className="sr-only" aria-live="polite">
            {actual + 1} de {n}: {hojas[actual].etiqueta}
          </span>
        </p>
        <button
          type="button"
          onClick={() => siguiente()}
          className="grid size-12 place-items-center rounded-full bg-amarillo text-tinta shadow-[0_4px_0_var(--color-turquesa)] transition-transform active:scale-95"
          aria-label="Siguiente"
        >
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-center text-[0.9375rem] text-crema/75">{ayuda}</p>
    </div>
  );
}
