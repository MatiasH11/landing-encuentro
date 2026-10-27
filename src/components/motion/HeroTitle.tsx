import { Fragment } from "react";

const TAGS = [
  { text: "Argentina le canta", className: "bg-bordo text-crema", registro: "var(--color-rojo)" },
  { text: "y baila", className: "bg-crema text-bordo -rotate-[1.5deg]", registro: "var(--color-turquesa)" },
  { text: "a Latinoamérica", className: "bg-turquesa text-tinta", registro: "rgb(214 51 132 / 0.7)" },
];

/**
 * El lema como carteles: cada palabra cae y se pega con un rebote chico.
 * La caída es una animación CSS (.palabra-cae en globals.css), no de framer: arranca con el primer cuadro y no
 * espera al JS. Con framer, el servidor pintaba las palabras giradas y encimadas hasta que cargaba el script.
 * Solo se anima transform (nunca la opacidad): el título no demora el LCP.
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
                <span
                  className="desregistro palabra-cae inline-block"
                  style={{ "--registro": tag.registro, "--i": i, "--giro": i % 2 ? "7deg" : "-7deg" } as React.CSSProperties}
                >
                  {word}
                </span>
                {j < arr.length - 1 ? " " : ""}
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
