"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

// Las funciones de animación se descargan después de la carga inicial, así no demoran la foto del hero (LCP)
const cargarFunciones = () => import("@/components/motion/features").then((r) => r.default);

/**
 * Configuración global de framer-motion. Con reducedMotion="user", si el visitante pidió menos movimiento,
 * las animaciones de transform se saltan al estado final. Lo atado al scroll se frena aparte con useReducedMotion.
 * Los componentes usan `m` (no `motion`) para que LazyMotion funcione.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={cargarFunciones} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
