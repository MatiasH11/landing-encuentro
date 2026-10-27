import Image from "next/image";
import { HISTORY_TEXT, OBJECTIVES, OBJECTIVE_TITLES } from "@/constants/history-data";

const TITLE_COLORS = ["text-amarillo", "text-turquesa", "text-magenta", "text-crema"];

/**
 * Para qué existe el Encuentro: dos mitades sin espacio entre ellas.
 * A la izquierda una foto 2026 con el título en etiquetas; a la derecha los objetivos sobre campo oscuro.
 */
export default function PurposeSection() {
  return (
    <section aria-labelledby="para-que" className="grid lg:grid-cols-2">
      <div className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden px-4 pb-10 pt-32 sm:px-7 lg:min-h-[92svh] lg:pb-14">
        <Image
          src="/images/gallery/2026/reconocimiento-en-escena.webp"
          alt="Un organizador abraza a integrantes de una delegación andina en el escenario del Encuentro 2026"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="-z-20 object-cover object-[52%_40%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(23_13_17/0)_35%,rgb(23_13_17/0.85)_100%)]"
        />
        <h2 id="para-que" className="display flex flex-col items-start gap-2 text-[clamp(3rem,6.4vw,6.5rem)]" data-reveal>
          <span className="tag bg-amarillo text-tinta">Para qué</span>
          <span className="tag self-end -rotate-[1.5deg] bg-crema text-bordo">existe</span>
          <span className="tag bg-rojo text-crema">el Encuentro</span>
        </h2>
        <p className="mt-6 max-w-[46ch] text-[1rem] font-semibold text-crema" data-reveal>
          {HISTORY_TEXT.trust}
        </p>
      </div>

      <div className="grano flex flex-col justify-center bg-tinta px-4 py-16 text-crema sm:px-10 lg:px-14">
        <ol className="space-y-10 sm:space-y-12">
          {OBJECTIVES.map((objective, i) => (
            <li key={objective.slice(0, 30)} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <h3 className={`display text-[clamp(2.25rem,3.6vw,3.5rem)] ${TITLE_COLORS[i % TITLE_COLORS.length]}`}>
                {OBJECTIVE_TITLES[i]}
              </h3>
              <p className="mt-2 max-w-[48ch] text-[1.0625rem] text-crema/85">{objective}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
