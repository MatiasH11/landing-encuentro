"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// Devuelve "días:horas:minutos" como texto, así el snapshot es estable entre renders del mismo minuto
function snapshot(target: number) {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff / 3_600_000) % 24);
  const m = Math.floor((diff / 60_000) % 60);
  return `${d}:${h}:${m}`;
}

/** Cuenta regresiva al inicio de la edición, calculada en el navegador. */
export default function Countdown({ startDate }: { startDate: string }) {
  const target = new Date(`${startDate}T00:00:00-03:00`).getTime();
  const value = useSyncExternalStore(
    subscribe,
    () => snapshot(target),
    () => ""
  );
  const [d, h, m] = value ? value.split(":") : ["--", "--", "--"];
  const units = [
    { n: d, label: "días" },
    { n: h.padStart(2, "0"), label: "horas" },
    { n: m.padStart(2, "0"), label: "min" },
  ];

  return (
    <div className="flex gap-5 sm:gap-7" role="timer" aria-label={value ? `Faltan ${d} días` : undefined}>
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <span className="display tabular block text-[clamp(2.75rem,4.6vw,4.5rem)] leading-none">{u.n}</span>
          <span className="text-[0.8125rem] font-semibold">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
