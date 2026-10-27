import Image from "next/image";
import { HISTORY_TEXT, STATS } from "@/constants/history-data";
import StatsBoard from "@/components/motion/StatsBoard";

// Fotos del collage: cada una con su sombra de color, su etiqueta y el giro de la cinta que la sostiene.
// Ancho y alto van en % del contenedor (que tiene proporción propia), así el collage nunca se sale de su bloque.
// La foto grande ocupa la columna izquierda; las otras dos se apilan a la derecha y solo pisan una esquina de
// las polleras de la grande, lejos de las caras.
const COLLAGE = [
  {
    src: "/images/gallery/2026/bombo-y-polleras.webp",
    alt: "Un bailarín mayor con bombo baila entre bailarinas con polleras de volados",
    label: "Bombo y polleras",
    sombra: "var(--color-amarillo)",
    className: "left-[1%] top-[5%] w-[54%] h-[86%] -rotate-2 z-10",
    pos: "object-[50%_45%]",
    cinta: "-6deg",
  },
  {
    src: "/images/gallery/2026/pareja-de-baile.webp",
    alt: "Pareja vestida de negro bailando en el escenario del Encuentro",
    label: "En pareja",
    sombra: "var(--color-magenta)",
    className: "right-[2%] top-[3%] w-[42%] h-[42%] rotate-[3deg] z-20",
    pos: "object-[50%_55%]",
    cinta: "5deg",
  },
  {
    src: "/images/gallery/imagen-5.jpeg",
    alt: "Percusionistas tocando bombos legüeros en el escenario",
    label: "Bombos legüeros",
    sombra: "var(--color-turquesa)",
    className: "right-[3%] bottom-[4%] w-[48%] h-[40%] -rotate-[1.5deg] z-30",
    pos: "object-[45%_55%]",
    cinta: "-3deg",
  },
];

export default function HistorySection() {
  return (
    <section id="historia" className="papel px-4 pb-20 pt-20 sm:px-7 sm:pb-24 sm:pt-28">
      {/* Título impreso: tinta de serigrafía y la capa bordó corrida (no se anima: lleva filtro) */}
      <h2 className="display tinta text-[clamp(3.5rem,10vw,10rem)]">
        <span className="desregistro block text-bordo" style={{ "--registro": "rgb(47 194 189 / 0.55)" } as React.CSSProperties}>
          19 ediciones
        </span>
        <span className="block">desde 2010</span>
      </h2>

      <div className="mt-14 grid items-center gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="space-y-5 text-[1.1875rem] lg:col-span-5" data-reveal>
          <p className="text-[1.375rem] font-semibold leading-snug">{HISTORY_TEXT.body}</p>
          <p>{HISTORY_TEXT.mission}</p>
          <p>{HISTORY_TEXT.impact}</p>
        </div>

        {/* Proporción fija (no altura fija): las fotos escalan juntas y la caja crece con ellas.
            En desktop el ancho tope lo empareja con el alto de la columna de texto. */}
        <div className="relative aspect-[5/6] w-full sm:aspect-[6/5] lg:col-span-7 lg:max-w-[760px] lg:justify-self-end 2xl:max-w-[900px] 2xl:justify-self-center">
          {COLLAGE.map((photo, i) => (
            // Fotos pegadas con cinta: ya no flotan, la cinta las sostiene en su lugar
            <figure
              key={photo.src}
              className={`cinta absolute ${photo.className}`}
              data-reveal
              style={{ "--i": i, "--cinta-rot": photo.cinta } as React.CSSProperties}
            >
              <div
                className="copia doblez h-full w-full"
                style={{ "--sombra": photo.sombra } as React.CSSProperties}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 55vw, 420px"
                  className={`object-cover ${photo.pos}`}
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-crema px-3 py-1 text-[0.875rem] font-extrabold text-tinta">
                  {photo.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Cifras en bloques de color, al ritmo del bombo */}
      <StatsBoard stats={STATS} />
    </section>
  );
}
