"use client";

import { useState } from "react";
import Image, { getImageProps } from "next/image";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
import { GALLERY_ITEMS } from "@/constants/gallery-data";

// El visor se descarga recién cuando alguien abre una foto
const Lightbox = dynamic(() => import("@/components/gallery/Lightbox"), { ssr: false });

const photos = GALLERY_ITEMS.filter((item) => item.type === "photo");
const video = GALLERY_ITEMS.find((item) => item.type === "video");
const videoId = video?.videoUrl?.split("/embed/")[1];

// La foto que se ve adentro de las letras de BAILA, optimizada por next/image
const letrasSrc = getImageProps({
  src: "/images/gallery/imagen-1.jpeg",
  alt: "",
  width: 960,
  height: 640,
  quality: 70,
}).props.src;

// Lugar de cada foto en el collage (desktop) y su color de sombra
const LAYOUT = [
  { span: "col-span-2 row-span-2 lg:col-span-5", rot: "-rotate-1", sombra: "var(--color-turquesa)" },
  { span: "lg:col-span-4", rot: "rotate-[1.5deg]", sombra: "var(--color-amarillo)" },
  { span: "lg:col-span-3 lg:row-span-2", rot: "rotate-2", sombra: "var(--color-magenta)" },
  { span: "lg:col-span-4", rot: "-rotate-[1.5deg]", sombra: "var(--color-rojo)" },
  { span: "lg:col-span-4 lg:row-span-2", rot: "rotate-1", sombra: "var(--color-amarillo)" },
  { span: "lg:col-span-4 lg:row-span-2", rot: "-rotate-2", sombra: "var(--color-turquesa)" },
  { span: "lg:col-span-4 lg:row-span-2", rot: "rotate-[1.5deg]", sombra: "var(--color-magenta)" },
];

// Etiqueta corta para el sticker: la leyenda sin el "— Encuentro Latinoamericano"
const short = (caption: string) => caption.split(" — ")[0];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);

  return (
    <section id="galeria" className="grano overflow-hidden bg-tinta px-4 py-24 text-crema sm:px-7 sm:py-32">
      <h2 className="display" data-reveal>
        <span className="block text-[clamp(2.5rem,5vw,4.5rem)] text-amarillo">Así se</span>
        <span
          className="paneo -my-[0.04em] block bg-clip-text text-[clamp(7rem,27vw,26rem)] leading-[0.85] text-transparent [-webkit-background-clip:text]"
          style={{
            backgroundImage: `url(${letrasSrc})`,
            backgroundPosition: "50% 55%",
            backgroundSize: "120% auto",
          }}
        >
          baila
        </span>
        <span className="block text-right text-[clamp(2.5rem,5vw,4.5rem)] text-turquesa">en el Encuentro</span>
      </h2>

      {/* Collage de todas las fotos */}
      <ul className="mt-16 grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:gap-6 lg:grid-cols-12">
        {photos.map((photo, i) => {
          const l = LAYOUT[i % LAYOUT.length];
          return (
            <li key={photo.id} className={`${l.span} ${l.rot}`} data-reveal style={{ "--i": i % 4 } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="copia group block h-full w-full transition-[rotate] duration-200 hover:rotate-0"
                style={{ "--sombra": l.sombra } as React.CSSProperties}
                aria-label={`Ampliar: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-crema px-3 py-1 text-left text-[0.8125rem] font-extrabold text-tinta sm:text-[0.875rem]">
                  {short(photo.caption)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* El video, enmarcado como un aftermovie */}
      {video && videoId && (
        <div className="mx-auto mt-24 max-w-5xl rounded-[28px] bg-rojo p-4 sm:p-8" data-reveal>
          <h3 className="display mb-5 text-center text-[clamp(2.25rem,5vw,4rem)] text-crema">
            Mirá el Encuentro
          </h3>
          <div className="relative aspect-video overflow-hidden rounded-[16px] bg-tinta">
            {playing ? (
              <iframe
                src={`${video.videoUrl}?autoplay=1`}
                title={video.caption}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0"
                aria-label={`Ver el video: ${video.caption}`}
              >
                <Image
                  src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 92vw, 64rem"
                  className="object-cover opacity-85 transition-opacity group-hover:opacity-100"
                />
                <span className="pill absolute left-1/2 top-1/2 min-h-16 -translate-x-1/2 -translate-y-1/2 text-[1.0625rem]">
                  <FaPlay className="h-4 w-4" aria-hidden />
                  Ver el video
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {index >= 0 && <Lightbox photos={photos} open index={index} onClose={() => setIndex(-1)} />}
    </section>
  );
}
