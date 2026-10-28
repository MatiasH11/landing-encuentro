"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { GALLERY_ITEMS } from "@/constants/gallery-data";
import type { GalleryItem } from "@/types";

// El visor se descarga recién cuando alguien abre una foto
const Lightbox = dynamic(() => import("@/components/gallery/Lightbox"), { ssr: false });

const photos = GALLERY_ITEMS.filter((item) => item.type === "photo");
// En el orden de gallery-data: el primero arranca como principal
const videos = GALLERY_ITEMS.filter((item) => item.type === "video" && item.videoUrl);
const youtubeId = (v: GalleryItem) => v.videoUrl?.split("/embed/")[1];

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


// Color de la capa de duotono de cada foto, en orden
const DUO = ["bg-bordo", "bg-turquesa", "bg-amarillo"];

const sinCambios = () => () => {};

export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [videoActivo, setVideoActivo] = useState(0);
  const video = videos[videoActivo];
  const reproductor = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ id: string; index: number } | null>(null);
  const reduce = useReducedMotion();
  // El portal se monta recién en el navegador, después de hidratar
  const enCliente = useSyncExternalStore(
    sinCambios,
    () => true,
    () => false
  );

  const abrir = (id: string, i: number) => {
    // Con movimiento reducido se abre el visor directo, sin agrandar la foto
    if (reduce) return setIndex(i);
    setZoom({ id, index: i });
  };

  // Un video de "Más videos" pasa al reproductor y arranca; en el teléfono el reproductor queda arriba, fuera de
  // pantalla, así que se lo trae a la vista
  const elegirVideo = (i: number) => {
    setVideoActivo(i);
    setPlaying(true);
    reproductor.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  // Cuando el visor ya está abierto, la foto agrandada se retira (queda detrás del visor).
  // Si la animación no llega a avisar que terminó, el visor se abre igual.
  useEffect(() => {
    if (!zoom) return;
    if (index >= 0) {
      const t = setTimeout(() => setZoom(null), 350);
      return () => clearTimeout(t);
    }
    const respaldo = setTimeout(() => setIndex(zoom.index), 900);
    return () => clearTimeout(respaldo);
  }, [zoom, index]);

  return (
    <section id="galeria" className="grano px-4 pb-24 pt-12 text-crema sm:px-7 sm:pb-32 sm:pt-16">
      {/* Título en un solo bloque, entero dentro del ancho; el acento es la etiqueta de "baila" */}
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <h2 className="display tinta text-[clamp(2.75rem,6.4vw,6.25rem)]">
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
      {/* Las fotos van en duotono con los colores del sitio y pasan a color al pasar el mouse (desktop)
          o al entrar en pantalla (teléfono) */}
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[15.5rem]">
        {DESTACADAS.map((d, i) => {
          const index = photos.findIndex((p) => p.id === d.id);
          const photo = photos[index];
          if (!photo) return null;
          return (
            <li key={d.id} className={`${d.span} ${d.rot}`} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => abrir(d.id, index)}
                className="group relative block h-full w-full overflow-hidden rounded-[18px] transition-[rotate] duration-200 hover:rotate-0"
                aria-label={`Ampliar: ${photo.caption}`}
              >
                <m.div layoutId={`foto-${d.id}`} className="absolute inset-0">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 1024px) 92vw, 56vw" : "(max-width: 1024px) 46vw, 40vw"}
                    className={`object-cover ${d.pos} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                  />
                </m.div>
                <span aria-hidden className={`duo ${DUO[i % DUO.length]}`} />
                <span className="absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-crema px-3 py-1 text-left text-[0.8125rem] font-extrabold text-tinta sm:text-[0.875rem]">
                  {d.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* La foto tocada se agranda desde su lugar hasta el centro y ahí se abre el visor */}
      {enCliente &&
        createPortal(
          <AnimatePresence>
            {zoom && (
              <m.div
                key="zoom"
                className="fixed inset-0 z-[70] grid place-items-center bg-tinta/85 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <m.div
                  layoutId={`foto-${zoom.id}`}
                  className="relative aspect-[3/2] w-[min(92vw,calc(82vh*1.5))] overflow-hidden rounded-[18px]"
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  onLayoutAnimationComplete={() => setIndex(zoom.index)}
                >
                  <Image src={photos[zoom.index].src} alt="" fill sizes="92vw" className="object-cover" />
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <p className="mt-8 flex justify-center">
        <button type="button" onClick={() => setIndex(0)} className="pill pill-linea text-crema">
          Ver las {photos.length} fotos
        </button>
      </p>

      {/* Los videos, enmarcados como un aftermovie: uno grande y abajo los demás para elegir */}
      {video && (
        <div className="mx-auto mt-24 max-w-5xl rounded-[28px] bg-rojo p-4 sm:p-8" data-reveal>
          <h3 className="display mb-5 text-center text-[clamp(2.25rem,5vw,4rem)] text-crema">
            Mirá el Encuentro
          </h3>
          <div ref={reproductor} className="relative aspect-video overflow-hidden rounded-[16px] bg-tinta">
            {playing ? (
              <iframe
                key={video.id}
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
                  src={`https://i.ytimg.com/vi/${youtubeId(video)}/maxresdefault.jpg`}
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
          <p className="mt-3 font-extrabold text-tinta">{video.caption}</p>

          {videos.length > 1 && (
            <>
              <h4 className="display mt-8 text-[1.75rem] text-crema">Más videos</h4>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:gap-5">
                {videos.map((v, i) =>
                  i === videoActivo ? null : (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => elegirVideo(i)}
                        className="group block w-full text-left"
                        aria-label={`Ver el video: ${v.caption}`}
                      >
                        <span className="relative block aspect-video overflow-hidden rounded-[12px] bg-tinta">
                          {/* mqdefault es 16:9 (la hqdefault trae franjas negras) */}
                          <Image
                            src={`https://i.ytimg.com/vi/${youtubeId(v)}/mqdefault.jpg`}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 45vw, 30rem"
                            className="object-cover opacity-85 transition-opacity group-hover:opacity-100"
                          />
                          <span className="absolute inset-0 grid place-items-center">
                            <span className="grid size-11 place-items-center rounded-full bg-amarillo text-tinta shadow-[0_4px_0_var(--color-tinta)] sm:size-14">
                              <FaPlay className="size-3.5 translate-x-px sm:size-4" aria-hidden />
                            </span>
                          </span>
                        </span>
                        <span className="mt-2 block text-[0.9375rem] font-extrabold leading-snug text-tinta">
                          {v.caption}
                        </span>
                      </button>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
      )}

      {index >= 0 && <Lightbox photos={photos} open index={index} onClose={() => setIndex(-1)} />}
    </section>
  );
}
