/**
 * Botón de inscripción del hero. Los botones que lo repiten (la barra fija del teléfono y el del header) aparecen
 * recién cuando sale de pantalla:
 *   const visible = useSyncExternalStore(suscribirCtaHero, ctaHeroFuera, () => false);
 * Sin React a propósito: el hero es un componente de servidor y solo importa el id.
 */
export const CTA_HERO_ID = "cta-hero";

let fuera = false;

/** true cuando el botón del hero ya no está en pantalla (o no existe) */
export const ctaHeroFuera = () => fuera;

export function suscribirCtaHero(onChange: () => void) {
  const el = document.getElementById(CTA_HERO_ID);
  if (!el || !("IntersectionObserver" in window)) {
    fuera = true;
    return () => {};
  }
  const io = new IntersectionObserver(([entry]) => {
    fuera = !entry.isIntersecting;
    onChange();
  });
  io.observe(el);
  return () => io.disconnect();
}
