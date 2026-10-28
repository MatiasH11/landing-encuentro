"use client";

import { useEffect } from "react";

// Si el observador no da su primera respuesta en este tiempo, se muestra todo
const RESPALDO_MS = 1500;

/**
 * Agrega .is-in a cada [data-reveal] la primera vez que entra en pantalla.
 * El contenido nunca depende solo del observador: IntersectionObserver entrega una primera respuesta por cada
 * elemento apenas se lo observa; si no llega (navegadores embebidos o pestañas que no pintan), se muestra todo.
 * Marca html.reveal-listo: el script de layout.tsx saca .js si eso no pasa (el JS de la página no cargó).
 */
export default function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const mostrarTodo = () => items.forEach((el) => el.classList.add("is-in"));
    document.documentElement.classList.add("reveal-listo");
    if (!("IntersectionObserver" in window)) {
      mostrarTodo();
      return;
    }
    let respondio = false;
    const io = new IntersectionObserver(
      (entries) => {
        respondio = true;
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
    const respaldo = window.setTimeout(() => {
      if (respondio) return;
      io.disconnect();
      mostrarTodo();
    }, RESPALDO_MS);
    return () => {
      window.clearTimeout(respaldo);
      io.disconnect();
    };
  }, []);

  return null;
}
