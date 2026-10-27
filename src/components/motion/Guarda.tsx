"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Un módulo de la guarda mide 84 × 56. Antes de medir se dibujan los que cubren una pantalla ancha.
const MODULO = 84;
const MODULOS_MAX = 34;

// Hilos en zigzag: el de arriba (amarillo) y el de abajo (turquesa) se cruzan y forman los rombos
function zigzag(yA: number, yB: number, modulos: number) {
  let d = `M0,${yA}`;
  for (let i = 0; i < modulos; i++) d += ` L${i * MODULO + 42},${yB} L${(i + 1) * MODULO},${yA}`;
  return d;
}

/**
 * Guarda andina tejida. Los rombos están fijos y los dos hilos se tejen a medida que la guarda cruza la pantalla.
 * Se dibujan solo los módulos que entran en el ancho real: si el hilo fuera más largo que lo visible (en el
 * teléfono se veía el 13 %), el tejido terminaría antes de que se note.
 * Con movimiento reducido se muestra terminada.
 */
export default function Guarda({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end 45%"] });
  const tejido = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const largo = reduce ? 1 : tejido;

  const [modulos, setModulos] = useState(MODULOS_MAX);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(([entry]) =>
      setModulos(Math.min(MODULOS_MAX, Math.ceil(entry.contentRect.width / MODULO) + 1))
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`h-14 bg-bordo ${className}`}>
    <svg
      aria-hidden
      viewBox={`0 0 ${modulos * MODULO} 56`}
      preserveAspectRatio="xMinYMid slice"
      className="block h-14 w-full"
    >
      {Array.from({ length: modulos + 1 }, (_, i) => (
        <g key={i} transform={`translate(${i * MODULO} 28)`}>
          <path d="M0,-15 L15,0 L0,15 L-15,0Z" className="fill-crema" />
          <path d="M0,-6 L6,0 L0,6 L-6,0Z" className="fill-rojo" />
        </g>
      ))}
      <m.path
        d={zigzag(7, 25, modulos)}
        fill="none"
        strokeWidth={7}
        strokeLinejoin="round"
        className="stroke-amarillo"
        style={{ pathLength: largo }}
      />
      <m.path
        d={zigzag(49, 31, modulos)}
        fill="none"
        strokeWidth={7}
        strokeLinejoin="round"
        className="stroke-turquesa"
        style={{ pathLength: largo }}
      />
    </svg>
    </div>
  );
}
