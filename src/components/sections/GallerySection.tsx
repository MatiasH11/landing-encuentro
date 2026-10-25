"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { GALLERY_ITEMS } from "@/constants/gallery-data";
import dynamic from "next/dynamic";

// El visor se descarga recién cuando alguien abre una foto
const Lightbox = dynamic(() => import("@/components/gallery/Lightbox"), { ssr: false });

const photos = GALLERY_ITEMS.filter((item) => item.type === "photo");
const video = GALLERY_ITEMS.find((item) => item.type === "video");
const videoId = video?.videoUrl?.split("/embed/")[1];

// Dos copias sueltas a los costados del título
const PRINTS = [
  { id: "photo-006", className: "-rotate-[6deg] sm:left-[4%] sm:top-[20%] sm:-rotate-[8deg]" },
  { id: "photo-004", className: "rotate-[5deg] -ml-[12vw] mt-[10vw] sm:right-[4%] sm:bottom-[12%] sm:m-0 sm:rotate-[6deg]" },
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);

  const open = (id: string) => setIndex(photos.findIndex((p) => p.id === id));

  return (
    <section id="galeria" className="bg-night text-night-ink">
      {/* Fotos sueltas sobre el título */}
      <div className="relative overflow-clip px-4 pb-20 pt-20 sm:grid sm:min-h-svh sm:place-items-center sm:px-7">
        <h2 className="display text-[24vw] leading-[0.85] sm:text-center sm:text-display" data-reveal>
          <span className="block">Bailan</span>
          <span className="block">todos</span>
        </h2>

        <div className="mt-10 flex justify-center sm:contents">
        {PRINTS.map((print, i) => {
          const photo = photos.find((p) => p.id === print.id);
          if (!photo) return null;
          return (
            <button
              key={print.id}
              type="button"
              onClick={() => open(print.id)}
              aria-label={`Ampliar: ${photo.caption}`}
              className={`group relative aspect-[3/4] w-[44vw] shrink-0 transition-[rotate] duration-200 ease-out hover:z-20 hover:rotate-0 focus-visible:z-20 focus-visible:rotate-0 sm:absolute sm:w-[22vw] ${print.className}`}
              data-reveal
              style={{ "--i": i + 1 } as React.CSSProperties}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 52vw, 24vw"
                className="object-cover"
              />
            </button>
          );
        })}
        </div>

        <p className="mt-10 max-w-[36ch] text-small text-night-muted sm:absolute sm:bottom-6 sm:left-7 sm:mt-0">
          Chicos, parejas, abuelos y ballets enteros, en el mismo escenario.
        </p>
      </div>

      {/* Todas las fotos y el video, en una fila que se desliza */}
      <div className="pb-20 sm:pb-36">
        <h3 className="px-4 text-lead font-semibold sm:px-7">
          Fotos y video de ediciones anteriores
          <span className="font-normal text-night-muted"> · {photos.length + (video ? 1 : 0)}</span>
        </h3>
        <ul className="mt-8 grid grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-7 lg:grid-cols-4">
          {video && videoId && (
            <li className="relative col-span-2 aspect-[3/2] overflow-clip bg-ink lg:row-span-2 lg:aspect-auto">
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
                    sizes="(max-width: 1024px) 92vw, 48vw"
                    className="object-cover opacity-80"
                  />
                  <span className="button absolute bottom-4 left-4 min-h-11 text-small">
                    <FaPlay className="h-3 w-3" aria-hidden />
                    Ver el video
                  </span>
                </button>
              )}
            </li>
          )}
          {photos.map((photo, i) => {
            // La última foto ocupa dos columnas para cerrar la grilla sin huecos
            const last = i === photos.length - 1 && photos.length % 2 === 1;
            return (
              <li key={photo.id} className={last ? "col-span-2" : undefined}>
                <button
                  type="button"
                  onClick={() => open(photo.id)}
                  className={`group relative block w-full overflow-clip ${last ? "aspect-[3/1]" : "aspect-[3/2]"}`}
                  aria-label={`Ampliar: ${photo.caption}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={last ? "(max-width: 1024px) 92vw, 48vw" : "(max-width: 1024px) 46vw, 24vw"}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {index >= 0 && <Lightbox photos={photos} open index={index} onClose={() => setIndex(-1)} />}
    </section>
  );
}
