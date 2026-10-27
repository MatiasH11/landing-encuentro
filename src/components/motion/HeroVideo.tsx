"use client";

import { useEffect, useRef, useState } from "react";

export interface FuenteVideo {
  src: string;
  type: string;
  /** Tramo a repetir, en segundos. Solo hace falta si el archivo no está recortado. */
  tramo?: { inicio: number; fin: number };
}

interface HeroVideoProps {
  /** En orden de preferencia: el navegador reproduce la primera que soporta */
  fuentes: FuenteVideo[];
  /** Versión para pantallas de menos de 768 px (vertical y liviana); si falta, se usan las mismas */
  fuentesMovil?: FuenteVideo[];
}

// Duración del fundido a oscuro al volver al principio del loop, en segundos
const FUNDIDO = 0.35;

// Conexiones donde el video no se carga: lentas o con ahorro de datos
function conexionLiviana() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$|3g/.test(c.effectiveType ?? ""));
}

/**
 * Video de fondo del hero, encima de la foto (que sigue siendo el póster y el elemento LCP).
 * - No descarga nada hasta después del load, en un momento libre (preload="none" y src asignado tarde).
 * - En el teléfono (menos de 768 px) carga la versión vertical de 540 px, de menos de 1 MB.
 * - Con movimiento reducido o ahorro de datos, queda la foto fija.
 * - Aparece con un fundido cuando ya está reproduciendo, y se pausa cuando el hero sale de pantalla.
 */
export default function HeroVideo({ fuentes: fuentesAncho, fuentesMovil }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [fuentes, setFuentes] = useState<FuenteVideo[] | null>(null);
  const [visible, setVisible] = useState(false);
  const [fundido, setFundido] = useState(false);

  // Decide si cargar el video (y cuál) y lo hace recién con la página cargada y el navegador libre
  useEffect(() => {
    const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto || conexionLiviana()) return;
    const elegidas = fuentesMovil && !matchMedia("(min-width: 768px)").matches ? fuentesMovil : fuentesAncho;

    let idle = 0;
    const programar = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
      idle = ric(() => setFuentes(elegidas), { timeout: 2500 });
    };
    if (document.readyState === "complete") programar();
    else window.addEventListener("load", programar, { once: true });
    return () => {
      window.removeEventListener("load", programar);
      window.cancelIdleCallback?.(idle);
    };
  }, [fuentesAncho, fuentesMovil]);

  // Con las fuentes puestas: arranca (en el tramo, si la fuente elegida tiene uno), repite con un fundido corto
  // a oscuro en el empalme y se pausa fuera de pantalla
  useEffect(() => {
    const v = ref.current;
    if (!fuentes || !v) return;
    // iOS solo deja arrancar solo un video mudo: se asegura la propiedad, no solo el atributo
    v.muted = true;
    v.load();
    let inicio = 0;
    let fin = Infinity;
    const alCargar = () => {
      const elegida = fuentes.find((f) => v.currentSrc.endsWith(f.src));
      if (elegida?.tramo) {
        inicio = elegida.tramo.inicio;
        fin = elegida.tramo.fin;
        v.currentTime = inicio;
      } else {
        fin = v.duration;
      }
      v.play().catch(() => {});
    };
    const alAvanzar = () => {
      setFundido(v.currentTime >= fin - FUNDIDO || v.currentTime < inicio + 0.12);
      if (v.currentTime >= fin - 0.05) v.currentTime = inicio;
    };
    // timeupdate llega cada ~250 ms: si el video termina antes de que salte, vuelve al principio igual
    const alTerminar = () => {
      v.currentTime = inicio;
      v.play().catch(() => {});
    };
    v.addEventListener("ended", alTerminar);
    const alReproducir = () => setVisible(true);
    v.addEventListener("loadedmetadata", alCargar, { once: true });
    v.addEventListener("timeupdate", alAvanzar);
    v.addEventListener("playing", alReproducir, { once: true });

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => {
      v.removeEventListener("timeupdate", alAvanzar);
      v.removeEventListener("ended", alTerminar);
      io.disconnect();
    };
  }, [fuentes]);

  return (
    <div
      aria-hidden
      className={`video-tramado absolute inset-0 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <video
        ref={ref}
        className="h-full w-full object-cover object-[50%_45%]"
        muted
        playsInline
        preload="none"
        disablePictureInPicture
      >
        {fuentes?.map((f) => <source key={f.src} src={f.src} type={f.type} />)}
      </video>
      {/* Fundido a oscuro en el empalme del loop, para que el salto del final al principio no corte feo */}
      <div
        className={`absolute inset-0 bg-tinta transition-opacity duration-300 ${fundido ? "opacity-70" : "opacity-0"}`}
      />
    </div>
  );
}
