"use client";

import { useEffect, useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
    { value: time.hours, label: "horas" },
    { value: time.minutes, label: "min" },
    { value: time.seconds, label: "seg" },
  ];

  return (
    <div className="mb-10 flex flex-col items-center gap-3 md:mb-14">
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-white/20" />
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          Paso de la Patria · 9 de octubre 2026
        </p>
        <span className="h-px w-8 bg-white/20" />
      </div>

      {/* Countdown */}
      <div className="flex items-start gap-2 sm:gap-4">
        {units.map(({ value, label }, i) => (
          <div key={label} className="flex items-start gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`${bebas.className} text-[72px] leading-none text-white sm:text-[96px] md:text-[120px]`}
              >
                {String(value).padStart(2, "0")}
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/35">
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mt-3 text-lg text-oro/80 sm:mt-4 sm:text-xl">✦</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
