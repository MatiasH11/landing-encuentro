"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Un módulo de la guarda mide 84 × 56. Se repite lo suficiente para cubrir pantallas anchas.
const MODULOS = 34;
const ANCHO = MODULOS * 84;

// Hilos en zigzag: el de arriba (amarillo) y el de abajo (turquesa) se cruzan y forman los rombos
function zigzag(yA: number, yB: number) {
  let d = `M0,${yA}`;
  for (let i = 0; i < MODULOS; i++) d += ` L${i * 84 + 42},${yB} L${(i + 1) * 84},${yA}`;
  return d;
}
const HILO_ARRIBA = zigzag(7, 25);
const HILO_ABAJO = zigzag(49, 31);

/**
 * Guarda andina tejida. Los rombos están fijos y los dos hilos se tejen a medida que la guarda cruza la pantalla.
 * Con movimiento reducido se muestra terminada.
 */
export default function Guarda({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end 45%"] });
  const tejido = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const largo = reduce ? 1 : tejido;

  return (
    <div ref={ref} className={`h-14 bg-bordo ${className}`}>
    <svg
      aria-hidden
      viewBox={`0 0 ${ANCHO} 56`}
      preserveAspectRatio="xMinYMid slice"
      className="block h-14 w-full"
    >
      {Array.from({ length: MODULOS + 1 }, (_, i) => (
        <g key={i} transform={`translate(${i * 84} 28)`}>
          <path d="M0,-15 L15,0 L0,15 L-15,0Z" className="fill-crema" />
          <path d="M0,-6 L6,0 L0,6 L-6,0Z" className="fill-rojo" />
        </g>
      ))}
      <m.path
        d={HILO_ARRIBA}
        fill="none"
        strokeWidth={7}
        strokeLinejoin="round"
        className="stroke-amarillo"
        style={{ pathLength: largo }}
      />
      <m.path
        d={HILO_ABAJO}
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
