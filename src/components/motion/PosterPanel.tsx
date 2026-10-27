"use client";

import { m } from "framer-motion";
import TornEdge from "@/components/motion/TornEdge";

interface PosterPanelProps {
  children: React.ReactNode;
  /** Color del pliego: clase de fondo y de relleno del borde rasgado, por ejemplo ["bg-bordo", "fill-bordo"] */
  color: [string, string];
  /** Inclinación final del pliego, en grados (mínima, para que se note que está pegado encima) */
  rot?: number;
  variante?: number;
}

/**
 * Pliego de afiche pegado encima de la sección anterior: un fondo con borde rasgado arriba que entra con una
 * rotación chica. El contenido no se mueve ni se rota: solo el papel de atrás.
 */
export default function PosterPanel({ children, color, rot = 0, variante = 0 }: PosterPanelProps) {
  const [bg, fill] = color;
  return (
    <div className="relative isolate -mt-5 sm:-mt-7">
      {/* El pliego es un poco más ancho que la pantalla, así al girar no destapa el fondo en los costados;
          lo que sobra lo recorta el overflow-x: clip de main */}
      <m.div
        aria-hidden
        className="absolute -inset-x-[3%] inset-y-0 -z-10 origin-top"
        initial={{ rotate: rot * 4 - 1.2, y: 18 }}
        whileInView={{ rotate: rot, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        <TornEdge className={fill} variante={variante} />
        <div className={`absolute inset-x-0 bottom-0 top-5 sm:top-7 ${bg}`} />
      </m.div>
      <div className="pt-5 sm:pt-7">{children}</div>
    </div>
  );
}
