import Image from "next/image";
import { HISTORY_TEXT, STATS } from "@/constants/history-data";

// Fotos del collage: cada una con su sombra de color y su etiqueta
const COLLAGE = [
  {
    src: "/images/gallery/2026/bombo-y-polleras.webp",
    alt: "Un bailarín mayor con bombo baila entre bailarinas con polleras de volados",
    label: "Bombo y polleras",
    sombra: "var(--color-amarillo)",
    className: "left-0 top-[6%] w-[58%] aspect-[4/5] -rotate-3 z-10",
    pos: "object-[50%_50%]",
    f: "0s",
  },
  {
    src: "/images/gallery/2026/pareja-de-baile.webp",
    alt: "Pareja vestida de negro bailando en el escenario del Encuentro",
    label: "En pareja",
    sombra: "var(--color-magenta)",
    className: "right-0 top-0 w-[46%] aspect-square rotate-[5deg] z-20",
    pos: "object-[50%_55%]",
    f: "1.2s",
  },
  {
    src: "/images/gallery/imagen-5.jpeg",
    alt: "Percusionistas tocando bombos legüeros en el escenario",
    label: "Bombos legüeros",
    sombra: "var(--color-turquesa)",
    className: "right-[4%] bottom-0 w-[54%] aspect-[4/3] -rotate-2 z-30",
    pos: "object-[45%_55%]",
    f: "0.6s",
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
    <section id="historia" className="px-4 pb-20 pt-24 sm:px-7 sm:pb-24 sm:pt-32">
      <h2 className="display text-[clamp(3.5rem,10vw,10rem)]" data-reveal>
        <span className="block text-bordo">19 ediciones</span>
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
            <figure
              key={photo.src}
              className={`absolute ${photo.className}`}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
            >
              <div
                className="copia flota h-full w-full"
                style={{ "--sombra": photo.sombra, "--f": photo.f } as React.CSSProperties}
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

      {/* Cifras en bloques de color */}
      <dl className="mt-24 grid grid-cols-2 gap-3 sm:mt-32 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-h-44 flex-col justify-between rounded-[22px] p-5 sm:min-h-56 sm:p-7 ${STAT_COLORS[i % STAT_COLORS.length]}`}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
          >
            <dt className="order-2 text-[1rem] font-semibold leading-tight sm:text-[1.125rem]">
              {stat.label}
            </dt>
            <dd className="display order-1 text-[clamp(3.5rem,7vw,6.5rem)]">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
