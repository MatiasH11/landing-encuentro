import { EDITIONS_2026, EDITIONS_2027, SCHEDULE_MDP_2026, SCHEDULE_PASO_2026 } from "@/constants/event-data";
import type { AnnouncedEdition, ContactPerson, EventEdition, ScheduleDay } from "@/types";

const SCHEDULES: Record<string, ScheduleDay[]> = {
  "paso-2026": SCHEDULE_PASO_2026,
  "mdp-2026": SCHEDULE_MDP_2026,
};

// Fechas de Argentina (UTC-3): una edición termina al final de su último día.
function endOf(edition: EventEdition) {
  return new Date(`${edition.endDate}T23:59:59-03:00`);
}

export function startOf(edition: EventEdition) {
  return new Date(`${edition.startDate}T00:00:00-03:00`);
}

export function isPast(edition: EventEdition, now = new Date()) {
  return endOf(edition).getTime() < now.getTime();
}

/** Ediciones ordenadas por fecha: primero las que vienen, después las realizadas (la más reciente primero). */
export function sortedEditions(now = new Date()) {
  const upcoming = EDITIONS_2026.filter((e) => !isPast(e, now)).sort(
    (a, b) => startOf(a).getTime() - startOf(b).getTime()
  );
  const past = EDITIONS_2026.filter((e) => isPast(e, now)).sort(
    (a, b) => startOf(b).getTime() - startOf(a).getTime()
  );
  return { upcoming, past };
}

/** La edición que la página pone al frente: la próxima, o la última realizada si no queda ninguna. */
export function featuredEdition(now = new Date()) {
  const { upcoming, past } = sortedEditions(now);
  return upcoming[0] ?? past[0];
}

export function scheduleFor(edition: EventEdition) {
  return SCHEDULES[edition.id] ?? [];
}

export function daysUntil(edition: EventEdition, now = new Date()) {
  return Math.ceil((startOf(edition).getTime() - now.getTime()) / 86_400_000);
}

/** Link de WhatsApp al contacto con el mensaje dado. */
export function whatsappLink(contact: ContactPerson, text: string) {
  const number = contact.whatsappUrl.match(/wa\.me\/(\d+)/)?.[1] ?? "";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

// ---------- Ediciones anunciadas (solo fecha y localidad) ----------

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** Anunciadas que todavía no terminaron, en orden de fecha. */
export function announcedEditions(now = new Date()) {
  return EDITIONS_2027.filter(
    (e) => new Date(`${e.endDate}T23:59:59-03:00`).getTime() >= now.getTime()
  ).sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/** Días, mes y año de una edición anunciada, y su rango en texto ("16 al 18 de julio de 2027"). */
export function fechasDe(e: AnnouncedEdition) {
  const [y, m, d1] = e.startDate.split("-").map(Number);
  const d2 = Number(e.endDate.split("-")[2]);
  const dias = Array.from({ length: d2 - d1 + 1 }, (_, i) => d1 + i);
  const mes = MESES[m - 1];
  return { dias, mes, anio: y, rango: `${d1} al ${d2} de ${mes} de ${y}` };
}

/** Mensaje de WhatsApp para reservar lugar en una edición anunciada. */
export function reserveMessage(e: AnnouncedEdition) {
  return `Hola! Quiero reservar lugar para mi ballet en el Encuentro Latinoamericano de ${e.location}, ${fechasDe(e).rango}. Quisiera más información.`;
}

/** Si la edición ya pasó (todavía no se cargó la siguiente), la consulta es por la próxima. */
export function inscriptionMessage(edition: EventEdition, past = false) {
  if (past) {
    return "Hola! Me interesa inscribir a mi ballet en la próxima edición del Encuentro Latinoamericano. Quisiera más información.";
  }
  return `Hola! Me interesa inscribir a mi ballet en el ${edition.editionNumber}º Encuentro Latinoamericano en ${edition.location} (${edition.dateRange}). Quisiera más información.`;
}
