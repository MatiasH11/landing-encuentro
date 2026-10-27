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
 * Pliego de afiche pegado encima de la sección anterior: un fondo con borde rasgado arriba que entra torcido y se
 * asienta. El contenido no se mueve ni se tuerce: solo el papel de atrás.
 * Se inclina con skewY y no con rotate: el borde de arriba queda torcido igual, pero los costados siguen verticales.
 * Con rotate, en el teléfono (secciones de 2000 px de alto) la parte de abajo se corría hasta 90 px de costado.
 */
export default function PosterPanel({ children, color, rot = 0, variante = 0 }: PosterPanelProps) {
  const [bg, fill] = color;
  return (
    <div className="relative isolate -mt-5 sm:-mt-7">
      {/* El pliego es un poco más ancho que la pantalla, así el borde rasgado nunca termina antes del costado;
          lo que sobra lo recorta el overflow-x: clip de main */}
      <m.div
        aria-hidden
        className="absolute -inset-x-[3%] inset-y-0 -z-10 origin-top"
        initial={{ skewY: rot * 4 - 1.2, y: 18 }}
        whileInView={{ skewY: rot, y: 0 }}
        // Arranca apenas asoma: con una fracción del alto, en el teléfono quedaba torcido mientras se veía
        viewport={{ once: true, amount: "some" }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        <TornEdge className={fill} variante={variante} />
        <div className={`absolute inset-x-0 bottom-0 top-5 sm:top-7 ${bg}`} />
      </m.div>
      <div className="pt-5 sm:pt-7">{children}</div>
    </div>
  );
}
