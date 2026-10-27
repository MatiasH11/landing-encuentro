"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
import { GALLERY_ITEMS } from "@/constants/gallery-data";

// El visor se descarga recién cuando alguien abre una foto
const Lightbox = dynamic(() => import("@/components/gallery/Lightbox"), { ssr: false });

const photos = GALLERY_ITEMS.filter((item) => item.type === "photo");
const video = GALLERY_ITEMS.find((item) => item.type === "video");
const videoId = video?.videoUrl?.split("/embed/")[1];

// Las seis que se muestran, en orden: una de apertura grande y cinco con tamaños distintos.
// Se eligieron para que el telón con el logo del evento aparezca poco; el resto se ve en el visor.
const DESTACADAS = [
  {
    id: "photo-2026-arcos",
    label: "Arcos de flores",
    span: "col-span-2 aspect-[4/3] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
    rot: "",
    pos: "object-[50%_45%]",
  },
  { id: "photo-2026-bombo", label: "Bombo y polleras", span: "aspect-square lg:col-span-5 lg:aspect-auto", rot: "-rotate-1", pos: "object-[45%_45%]" },
  { id: "photo-001", label: "Ballet en escena", span: "aspect-square lg:col-span-5 lg:aspect-auto", rot: "rotate-[0.6deg]", pos: "object-[50%_60%]" },
  { id: "photo-002", label: "Danzas gauchas", span: "aspect-square lg:col-span-4 lg:aspect-auto", rot: "", pos: "object-[38%_55%]" },
  { id: "photo-005", label: "Bombos legüeros", span: "aspect-square lg:col-span-4 lg:aspect-auto", rot: "-rotate-[0.6deg]", pos: "object-[45%_60%]" },
  { id: "photo-004", label: "Polleras celestes", span: "col-span-2 aspect-[16/10] lg:col-span-4 lg:aspect-auto", rot: "rotate-[0.4deg]", pos: "object-[50%_62%]" },
];


export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);

  return (
    <section id="galeria" className="grano bg-tinta px-4 pb-24 pt-16 text-crema sm:px-7 sm:pb-32 sm:pt-20">
      {/* Título en un solo bloque, entero dentro del ancho; el acento es la etiqueta de "baila" */}
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <h2 className="display text-[clamp(2.75rem,6.4vw,6.25rem)]" data-reveal>
          <span className="block">
            Así se <span className="tag -rotate-2 bg-amarillo text-tinta">baila</span>
          </span>
          <span className="mt-2 block text-turquesa">en el Encuentro</span>
        </h2>
        <p className="max-w-[34ch] text-[1.0625rem] text-crema/85" data-reveal>
          Arcos de flores, bombos, chacareras y ballets de todas las edades. Fotos de las ediciones 2024 y 2026.
        </p>
      </div>

      {/* Mosaico: una foto de apertura grande y cinco más chicas, con un solo tratamiento de borde */}
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[15.5rem]">
        {DESTACADAS.map((d, i) => {
          const index = photos.findIndex((p) => p.id === d.id);
          const photo = photos[index];
          if (!photo) return null;
          return (
            <li key={d.id} className={`${d.span} ${d.rot}`} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => setIndex(index)}
                className="group relative block h-full w-full overflow-hidden rounded-[18px] transition-[rotate] duration-200 hover:rotate-0"
                aria-label={`Ampliar: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 92vw, 56vw" : "(max-width: 1024px) 46vw, 40vw"}
                  className={`object-cover ${d.pos} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                />
                <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-crema px-3 py-1 text-left text-[0.8125rem] font-extrabold text-tinta sm:text-[0.875rem]">
                  {d.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 flex justify-center">
        <button type="button" onClick={() => setIndex(0)} className="pill pill-linea text-crema">
          Ver las {photos.length} fotos
        </button>
      </p>

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
