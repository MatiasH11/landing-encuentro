"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaPlay } from "react-icons/fa";
import { GALLERY_ITEMS } from "@/constants/gallery-data";
import Pila, { type Hoja } from "@/components/gallery/Pila";
import type { GalleryItem } from "@/types";

// El visor se descarga recién cuando alguien abre una foto
const Lightbox = dynamic(() => import("@/components/gallery/Lightbox"), { ssr: false });

// Las que abren la pila, en orden y con su encuadre; después siguen las demás en el orden de gallery-data.
// Se eligieron para que el telón con el logo del evento aparezca poco.
const PRIMERAS: Record<string, string> = {
  "photo-2026-arcos": "object-[50%_45%]",
  "photo-2026-bombo": "object-[45%_45%]",
  "photo-001": "object-[50%_60%]",
  "photo-002": "object-[38%_55%]",
  "photo-005": "object-[45%_60%]",
  "photo-004": "object-[50%_62%]",
};
const todas = GALLERY_ITEMS.filter((item) => item.type === "photo");
const photos = [
  ...Object.keys(PRIMERAS).flatMap((id) => todas.filter((p) => p.id === id)),
  ...todas.filter((p) => !(p.id in PRIMERAS)),
];
const hojasDeFotos: Hoja[] = photos.map((p) => ({
  id: p.id,
  src: p.src,
  alt: p.alt,
  // "Arcos de flores — Encuentro 2026" → "Arcos de flores"
  etiqueta: p.caption.split(" — ")[0],
  encuadre: PRIMERAS[p.id],
}));

// En el orden de gallery-data: el primero arranca arriba de la pila
const videos = GALLERY_ITEMS.filter((item) => item.type === "video" && item.videoUrl);
const youtubeId = (v: GalleryItem) => v.videoUrl?.split("/embed/")[1];
const hojasDeVideos: Hoja[] = videos.map((v) => ({
  id: v.id,
  src: `https://i.ytimg.com/vi/${youtubeId(v)}/maxresdefault.jpg`,
  alt: "",
  etiqueta: v.caption,
}));

const PESTANAS = [
  { id: "fotos", label: "Fotos", cantidad: photos.length },
  { id: "videos", label: "Videos", cantidad: videos.length },
] as const;
type Pestana = (typeof PESTANAS)[number]["id"];

/**
 * Galería en una sola mesa de altura fija: pestañas Fotos y Videos, cada una una pila de hojas que se pasan
 * (Pila). Tocar una foto la abre en el visor; tocar un video lo reproduce en la misma hoja.
 * Sumar fotos o videos no alarga la página.
 */
export default function GallerySection() {
  const [pestana, setPestana] = useState<Pestana>("fotos");
  const [index, setIndex] = useState(-1);
  const [videoArriba, setVideoArriba] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = videos[videoArriba];

  const elegirPestana = (p: Pestana) => {
    setPestana(p);
    // Al salir de Videos se corta lo que estuviera sonando
    if (p !== "videos") setPlaying(false);
  };

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
          Arcos de flores, bombos, chacareras y ballets de todas las edades. Fotos y videos de las ediciones 2024 y
          2026.
        </p>
      </div>

      <div className="mt-10 sm:mt-12" data-reveal>
        <div
          role="tablist"
          aria-label="Fotos o videos"
          className="flex justify-center gap-2"
          onKeyDown={(e) => {
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            const otra = pestana === "fotos" ? "videos" : "fotos";
            elegirPestana(otra);
            document.getElementById(`pestana-${otra}`)?.focus();
          }}
        >
          {PESTANAS.map((p) => {
            const activa = p.id === pestana;
            return (
              <button
                key={p.id}
                id={`pestana-${p.id}`}
                type="button"
                role="tab"
                aria-selected={activa}
                aria-controls={`panel-${p.id}`}
                tabIndex={activa ? 0 : -1}
                onClick={() => elegirPestana(p.id)}
                className={`pill min-h-12 text-[1rem] ${activa ? "" : "pill-linea text-crema"}`}
              >
                {p.label}
                <span
                  className={`tabular rounded-full px-2 text-[0.8125rem] ${activa ? "bg-tinta text-amarillo" : "bg-crema/15"}`}
                >
                  {p.cantidad}
                </span>
              </button>
            );
          })}
        </div>

        {/* Los dos paneles ocupan la misma celda: la mesa toma la altura del más alto y no salta al cambiar */}
        <div className="mt-10 grid">
          <div
            id="panel-fotos"
            role="tabpanel"
            aria-labelledby="pestana-fotos"
            inert={pestana !== "fotos"}
            className={`[grid-area:1/1] transition-opacity duration-300 ${pestana === "fotos" ? "" : "invisible opacity-0"}`}
          >
            <Pila
              hojas={hojasDeFotos}
              nombre="Fotos del Encuentro"
              aspecto="aspect-square sm:aspect-[3/2]"
              accion="Ver en grande"
              onTocar={setIndex}
              ayuda="Deslizá la foto de arriba para pasarla, o tocala para verla en grande"
            />
          </div>

          {video && (
            <div
              id="panel-videos"
              role="tabpanel"
              aria-labelledby="pestana-videos"
              inert={pestana !== "videos"}
              className={`[grid-area:1/1] self-start transition-opacity duration-300 ${pestana === "videos" ? "" : "invisible opacity-0"}`}
            >
              <Pila
                hojas={hojasDeVideos}
                nombre="Videos del Encuentro"
                aspecto="aspect-video"
                accion="Ver el video"
                onTocar={() => setPlaying(true)}
                onCambio={(i) => {
                  setVideoArriba(i);
                  setPlaying(false);
                }}
                sello={
                  <span className="grid size-16 place-items-center rounded-full bg-amarillo text-tinta shadow-[0_5px_0_var(--color-tinta)] sm:size-20">
                    <FaPlay className="size-6 translate-x-0.5 sm:size-7" aria-hidden />
                  </span>
                }
                contenidoArriba={
                  playing ? (
                    <iframe
                      key={video.id}
                      src={`${video.videoUrl}?autoplay=1`}
                      title={video.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : undefined
                }
                ayuda="Deslizá para pasar de video, o tocalo para verlo acá"
              />
            </div>
          )}
        </div>
      </div>

      {index >= 0 && <Lightbox photos={photos} open index={index} onClose={() => setIndex(-1)} />}
    </section>
  );
}
