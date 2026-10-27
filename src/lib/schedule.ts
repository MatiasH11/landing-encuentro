import type { EventEdition, ScheduleDay } from "@/types";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export interface Resaltado {
  dia: number;
  actividad: number;
  tipo: "ahora" | "proxima";
}

// "20 de noviembre" + año → fecha a medianoche de Argentina (UTC-3)
function fechaDelDia(dia: ScheduleDay, anio: number) {
  const m = dia.date.match(/(\d{1,2}) de (\w+)/i);
  if (!m) return null;
  const mes = MESES.indexOf(m[2].toLowerCase());
  if (mes < 0) return null;
  return Date.UTC(anio, mes, Number(m[1]), 3, 0, 0);
}

// "18:00 a 22:00 hs" → [inicio, fin] en minutos. "19:30 hs" → [inicio, inicio + 2 h]. "Tarde libre" → null.
// Las horas de madrugada (antes de las 6) cuentan como del día siguiente.
function horario(texto: string): [number, number] | null {
  const horas = [...texto.matchAll(/(\d{1,2}):(\d{2})/g)].map(([, h, m]) => {
    const min = Number(h) * 60 + Number(m);
    return Number(h) < 6 ? min + 24 * 60 : min;
  });
  if (horas.length === 0) return null;
  const [inicio, fin = inicio + 120] = horas;
  return [inicio, fin];
}

/**
 * Qué marcar en el programa según la hora: la actividad que está pasando ("ahora") o la próxima función.
 * Solo devuelve algo entre el primer día del evento y el final del último.
 */
export function resaltadoPara(edition: EventEdition, schedule: ScheduleDay[], ahora = Date.now()): Resaltado | null {
  let proxima: Resaltado | null = null;
  let inicioProxima = Infinity;
  let primerDia = Infinity;
  let ultimoFin = -Infinity;

  schedule.forEach((dia, d) => {
    const base = fechaDelDia(dia, edition.year);
    if (base === null) return;
    primerDia = Math.min(primerDia, base);
    dia.activities.forEach((act, a) => {
      const h = horario(act.time);
      if (!h) return;
      const inicio = base + h[0] * 60_000;
      const fin = base + h[1] * 60_000;
      ultimoFin = Math.max(ultimoFin, fin);
      if (ahora >= inicio && ahora < fin && act.highlight) {
        // Lo que está pasando gana sobre cualquier "próxima"
        inicioProxima = -Infinity;
        proxima = { dia: d, actividad: a, tipo: "ahora" };
      } else if (inicio > ahora && act.highlight && inicio < inicioProxima) {
        inicioProxima = inicio;
        proxima = { dia: d, actividad: a, tipo: "proxima" };
      }
    });
  });

  if (ahora < primerDia || ahora > ultimoFin) return null;
  return proxima;
}
