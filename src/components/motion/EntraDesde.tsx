"use client";

import { m } from "framer-motion";

interface EntraDesdeProps {
  children: React.ReactNode;
  /** -1 entra desde la izquierda, 1 desde la derecha */
  lado: -1 | 1;
  className?: string;
}

/**
 * Envuelve una tarjeta para que entre deslizando desde su costado, como un afiche que se pega.
 * El corrimiento es un % del ancho de la tarjeta (en el teléfono, unos 40 px) y arranca cuando la tarjeta asoma
 * 60 px: con una fracción del alto, la tarjeta de casi 1000 px del teléfono se veía corrida y cortada un buen rato.
 */
export default function EntraDesde({ children, lado, className = "" }: EntraDesdeProps) {
  return (
    <m.div
      className={className}
      initial={{ x: `${lado * 12}%`, rotate: lado * 2 }}
      whileInView={{ x: 0, rotate: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
    >
      {children}
    </m.div>
  );
}
