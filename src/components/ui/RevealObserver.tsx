"use client";

import { useEffect } from "react";

/** Agrega .is-in a cada [data-reveal] la primera vez que entra en pantalla. */
export default function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      // Arranca un poco antes de que el bloque entre, para que nunca se lea vacío
      { rootMargin: "0px 0px 15% 0px", threshold: 0 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
