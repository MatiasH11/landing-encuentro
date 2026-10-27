import Image from "next/image";
import { HISTORY_TEXT, STATS } from "@/constants/history-data";
import StatsBoard from "@/components/motion/StatsBoard";

// Fotos del collage: cada una con su sombra de color, su etiqueta y el giro de la cinta que la sostiene
const COLLAGE = [
  {
    src: "/images/gallery/2026/bombo-y-polleras.webp",
    alt: "Un bailarín mayor con bombo baila entre bailarinas con polleras de volados",
    label: "Bombo y polleras",
    sombra: "var(--color-amarillo)",
    className: "left-0 top-[6%] w-[58%] aspect-[4/5] -rotate-3 z-10",
    pos: "object-[50%_50%]",
    cinta: "-6deg",
  },
  {
    src: "/images/gallery/2026/pareja-de-baile.webp",
    alt: "Pareja vestida de negro bailando en el escenario del Encuentro",
    label: "En pareja",
    sombra: "var(--color-magenta)",
    className: "right-0 top-0 w-[46%] aspect-square rotate-[5deg] z-20",
    pos: "object-[50%_55%]",
    cinta: "5deg",
  },
  {
    src: "/images/gallery/imagen-5.jpeg",
    alt: "Percusionistas tocando bombos legüeros en el escenario",
    label: "Bombos legüeros",
    sombra: "var(--color-turquesa)",
    className: "right-[4%] bottom-0 w-[54%] aspect-[4/3] -rotate-2 z-30",
    pos: "object-[45%_55%]",
    cinta: "-3deg",
  },
];

const STAT_COLORS = [
  "bg-bordo text-crema",
  "bg-turquesa text-tinta",
  "bg-amarillo text-tinta",
  "bg-magenta text-tinta",
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

      <div className="mt-14 grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-5 text-[1.1875rem] lg:col-span-5" data-reveal>
          <p className="text-[1.375rem] font-semibold leading-snug">{HISTORY_TEXT.body}</p>
          <p>{HISTORY_TEXT.mission}</p>
          <p>{HISTORY_TEXT.impact}</p>
        </div>

        <div className="relative h-[min(118vw,620px)] lg:col-span-7">
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
                  sizes="(max-width: 1024px) 60vw, 34vw"
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
