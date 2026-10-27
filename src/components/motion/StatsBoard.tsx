"use client";

import { useEffect, useRef } from "react";
import { animate, m, useInView, useReducedMotion } from "framer-motion";
import type { HistoricalStat } from "@/types";

const COLORS = ["bg-bordo text-crema", "bg-turquesa text-tinta", "bg-amarillo text-tinta", "bg-magenta text-tinta"];
// Duración de un "golpe de bombo": las tarjetas laten una tras otra, como un compás
const COMPAS = 0.32;

function Cifra({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [, numero, sufijo] = value.match(/^(\d+)(.*)$/) ?? [];

  // Antes de entrar en pantalla se muestra 0 (el servidor pinta el valor final, por si no hay JS)
  useEffect(() => {
    if (reduce || !numero || !ref.current || inView) return;
    ref.current.textContent = `0${sufijo}`;
  }, [reduce, numero, sufijo, inView]);

  useEffect(() => {
    if (reduce || !numero || !inView) return;
    const controls = animate(0, Number(numero), {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${sufijo}`;
      },
    });
    return () => controls.stop();
  }, [reduce, numero, sufijo, inView, delay]);

  return (
    <span ref={ref} className="tabular inline-block min-w-[4ch]">
      {value}
    </span>
  );
}

/** Las cifras del Encuentro: cuentan hacia arriba al entrar y cada tarjeta da un golpe, en secuencia. */
export default function StatsBoard({ stats }: { stats: HistoricalStat[] }) {
  return (
    <dl className="mt-24 grid grid-cols-2 gap-3 sm:mt-32 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <m.div
          key={stat.label}
          className={`cinta relative flex min-h-44 flex-col justify-between rounded-[22px] p-5 sm:min-h-56 sm:p-7 ${COLORS[i % COLORS.length]}`}
          style={{ "--cinta-rot": `${i % 2 ? 5 : -4}deg` } as React.CSSProperties}
          initial={{ y: 36, rotate: i % 2 ? 2 : -2 }}
          whileInView={{ y: 0, rotate: 0, scale: [1, 1, 1.07, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            y: { type: "spring", stiffness: 160, damping: 18, delay: i * 0.08 },
            rotate: { type: "spring", stiffness: 160, damping: 18, delay: i * 0.08 },
            // el golpe llega cuando termina de contar, una tarjeta por tiempo del compás
            scale: { duration: COMPAS, times: [0, 0.01, 0.35, 1], delay: 1.25 + i * COMPAS, ease: "easeOut" },
          }}
        >
          <dt className="order-2 text-[1rem] font-semibold leading-tight sm:text-[1.125rem]">{stat.label}</dt>
          <dd className="display order-1 text-[clamp(3.5rem,7vw,6.5rem)]">
            <Cifra value={stat.value} delay={i * 0.12} />
          </dd>
        </m.div>
      ))}
    </dl>
  );
}
