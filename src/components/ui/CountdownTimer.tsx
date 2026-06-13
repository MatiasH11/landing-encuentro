"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TARGET = new Date("2026-10-09T00:00:00");

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calculate(TARGET));
    const id = setInterval(() => setTime(calculate(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const units = [
    { value: time.days, label: "días" },
    { value: time.hours, label: "hs" },
    { value: time.minutes, label: "min" },
    { value: time.seconds, label: "seg" },
  ];

  return (
    <div className="mb-10 flex flex-col items-center gap-3 md:mb-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
        Paso de la Patria · 9 de octubre 2026
      </p>
      <div className="flex items-center gap-3 sm:gap-5">
        {units.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <div className="glass-dark rounded-xl px-4 py-3 sm:px-5 sm:py-4">
                <span className="font-heading text-3xl font-bold tabular-nums text-white sm:text-4xl">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-1.5 text-xs font-medium uppercase tracking-widest text-white/40">
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mb-5 text-2xl font-light text-white/30">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
