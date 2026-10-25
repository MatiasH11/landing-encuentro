"use client";

import { useSyncExternalStore } from "react";

function describe(startDate: string, endDate: string) {
  const now = Date.now();
  const start = new Date(`${startDate}T00:00:00-03:00`).getTime();
  const end = new Date(`${endDate}T23:59:59-03:00`).getTime();
  const days = Math.ceil((start - now) / 86_400_000);
  if (now > end) return null;
  if (now >= start) return "Está pasando ahora.";
  if (days === 1) return "Empieza mañana.";
  return `Faltan ${days} días.`;
}

const subscribe = () => () => {};

/** "Faltan N días" calculado en el navegador, para que no quede congelado en el build. */
export default function DaysLeft({ startDate, endDate }: { startDate: string; endDate: string }) {
  const text = useSyncExternalStore(
    subscribe,
    () => describe(startDate, endDate),
    () => null
  );

  if (!text) return null;
  return <span> {text}</span>;
}
