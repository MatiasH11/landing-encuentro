"use client";

import { useEffect } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Fondo del hero con parallax: baja un poco más lento que el scroll y, en desktop con mouse, se corre unos
 * píxeles hacia donde está el puntero. La foto (children) se pinta desde el servidor: no se demora el LCP.
 */
export default function HeroBackdrop({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollParallax = useTransform(scrollY, [0, 900], [0, 110]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const yMouse = useSpring(my, { stiffness: 60, damping: 20 });
  const y = useTransform([scrollParallax, yMouse], ([s, m]) => (s as number) + (m as number));

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * -22);
      my.set((e.clientY / window.innerHeight - 0.5) * -14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <m.div
      className="absolute -inset-x-[3%] -bottom-[4%] -top-[12%] -z-20"
      style={reduce ? undefined : { x, y }}
    >
      {children}
    </m.div>
  );
}
