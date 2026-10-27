"use client";

import { m } from "framer-motion";

interface EntraDesdeProps {
  children: React.ReactNode;
  /** -1 entra desde la izquierda, 1 desde la derecha */
  lado: -1 | 1;
  className?: string;
}

/** Envuelve una tarjeta para que entre deslizando desde su costado, como un afiche que se pega. */
export default function EntraDesde({ children, lado, className = "" }: EntraDesdeProps) {
  return (
    <m.div
      className={className}
      initial={{ x: lado * 90, rotate: lado * 3 }}
      whileInView={{ x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 120, damping: 17 }}
    >
      {children}
    </m.div>
  );
}
