"use client";

import { m } from "framer-motion";

const COLORES = ["bg-bordo", "bg-rojo", "bg-turquesa", "bg-amarillo", "bg-magenta", "bg-crema"];
const CANTIDAD = 26;

// Valores fijos por índice (sin Math.random) para que cada lluvia sea igual y el render sea puro
const rombos = Array.from({ length: CANTIDAD }, (_, i) => {
  const t = (i * 37) % 100;
  return {
    x: (t - 50) * 6,
    y: 160 + ((i * 53) % 140),
    giro: ((i * 71) % 360) - 180,
    tamaño: 10 + ((i * 13) % 12),
    retraso: (i % 7) * 0.025,
    color: COLORES[i % COLORES.length],
  };
});

/**
 * Lluvia corta de rombos de colores, como papel picado: sale del botón de enviar y cae.
 * Se monta al enviar la consulta y el padre la retira a los 1,4 s. Con movimiento reducido no se muestra.
 */
export default function LluviaDeRombos() {
  return (
    <div aria-hidden className="pointer-events-none absolute bottom-10 left-1/2 z-20 h-0 w-0">
      {rombos.map((r, i) => (
        <m.span
          key={i}
          className={`absolute block rotate-45 ${r.color}`}
          style={{ width: r.tamaño, height: r.tamaño }}
          initial={{ x: 0, y: 0, rotate: 45, opacity: 1, scale: 0.6 }}
          animate={{
            x: [0, r.x * 0.6, r.x],
            y: [0, -r.y, -r.y * 0.35],
            rotate: 45 + r.giro,
            opacity: [1, 1, 0],
            scale: 1,
          }}
          transition={{ duration: 1.2, delay: r.retraso, ease: "easeOut", times: [0, 0.45, 1] }}
        />
      ))}
    </div>
  );
}
