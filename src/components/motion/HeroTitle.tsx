"use client";

import { Fragment } from "react";
import { m } from "framer-motion";

const TAGS = [
  { text: "Argentina le canta", className: "bg-bordo text-crema", registro: "var(--color-rojo)" },
  { text: "y baila", className: "bg-crema text-bordo -rotate-[1.5deg]", registro: "var(--color-turquesa)" },
  { text: "a Latinoamérica", className: "bg-turquesa text-tinta", registro: "rgb(214 51 132 / 0.7)" },
];

/**
 * El lema como carteles: cada palabra cae y se pega con un rebote chico.
 * Solo se anima transform (nunca la opacidad): el título se pinta en el primer cuadro y no demora el LCP.
 * El desregistro (sombra de color corrida) va en el texto, que se mueve con la palabra.
 */
export default function HeroTitle() {
  let n = 0;
  return (
    <h1 className="display flex flex-col items-start gap-2 text-[10.8vw] sm:text-[clamp(3rem,7.4vw,8rem)]">
      {TAGS.map((tag) => (
        <span key={tag.text} className={`tag ${tag.className}`}>
          {tag.text.split(" ").map((word, j, arr) => {
            const i = n++;
            return (
              // El espacio va afuera del bloque animado: adentro de un inline-block se colapsa
              <Fragment key={word + j}>
                <m.span
                  className="desregistro inline-block"
                  style={{ "--registro": tag.registro } as React.CSSProperties}
                  initial={{ y: "-0.45em", rotate: i % 2 ? 7 : -7, scale: 1.12 }}
                  animate={{ y: 0, rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 520, damping: 17, mass: 0.7, delay: 0.08 + i * 0.075 }}
                >
                  {word}
                </m.span>
                {j < arr.length - 1 ? " " : ""}
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
