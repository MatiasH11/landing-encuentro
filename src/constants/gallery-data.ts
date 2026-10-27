import type { GalleryItem } from "@/types";

// Gallery items from past editions.
// To add new photos/videos: add entries here and place files in public/images/gallery/
// Las de 2026 van en public/images/gallery/2026/ como WebP de 2400 px de ancho (los originales no se suben).
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "video-001",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/3Fgfw5Bnl_Y",
    caption: "Video destacado del Encuentro Latinoamericano",
    alt: "Video del festival folclórico",
    year: 2024,
    src: "", // Required by GalleryItem type based on src/types/index.ts
  },
  {
    id: "photo-2026-arcos",
    type: "photo",
    src: "/images/gallery/2026/arcos-de-flores.webp",
    alt: "Bailarinas con vestidos blancos y polleras de volados naranja, verde y amarillo levantan arcos de flores mientras bailan",
    caption: "Arcos de flores — Encuentro 2026",
    year: 2026,
  },
  {
    id: "photo-2026-bombo",
    type: "photo",
    src: "/images/gallery/2026/bombo-y-polleras.webp",
    alt: "Un bailarín mayor con boina y bombo baila rodeado de bailarinas con vestidos blancos y polleras de volados",
    caption: "Bombo y polleras — Encuentro 2026",
    year: 2026,
  },
  {
    id: "photo-2026-pareja",
    type: "photo",
    src: "/images/gallery/2026/pareja-de-baile.webp",
    alt: "Pareja vestida de negro baila en el escenario frente a los banners coloridos del Encuentro Latinoamericano",
    caption: "Pareja en escena — Encuentro 2026",
    year: 2026,
  },
  {
    id: "photo-2026-saludo",
    type: "photo",
    src: "/images/gallery/2026/saludo-final-paso-de-la-patria.webp",
    alt: "Un ballet de bailarinas de negro saluda tomado de la mano en el escenario de Paso de la Patria, con la bandera argentina al frente",
    caption: "Saludo final — Paso de la Patria 2026",
    year: 2026,
  },
  {
    id: "photo-2026-reconocimiento",
    type: "photo",
    src: "/images/gallery/2026/reconocimiento-en-escena.webp",
    alt: "Un organizador abraza a integrantes de una delegación andina mientras reciben su certificado en el escenario",
    caption: "Reconocimiento — Encuentro 2026",
    year: 2026,
  },
  {
    id: "photo-001",
    type: "photo",
    src: "/images/gallery/imagen-1.jpeg",
    alt: "Delegación de ballet folclórico con trajes rojos bailando en el escenario del Encuentro Latinoamericano",
    caption: "Ballet folclórico en escena — Encuentro Latinoamericano",
    year: 2024,
  },
  {
    id: "photo-002",
    type: "photo",
    src: "/images/gallery/imagen-2.jpeg",
    alt: "Parejas de distintas edades bailando danzas folclóricas con vestimenta tradicional gaucha",
    caption: "Danzas tradicionales gauchas — Encuentro Latinoamericano",
    year: 2024,
  },
  {
    id: "photo-003",
    type: "photo",
    src: "/images/gallery/imagen-3.jpeg",
    alt: "Ballet con vestidos celestes y blancos actuando ante el público con banners del Encuentro Latinoamericano de fondo",
    caption: "Ballet celeste y blanco ante el público — Encuentro Latinoamericano",
    year: 2024,
  },
  {
    id: "photo-004",
    type: "photo",
    src: "/images/gallery/imagen-4.jpeg",
    alt: "Grupo de mujeres con faldas celestes bailando folclore en el escenario del Encuentro",
    caption: "Folclore femenino en escena — Encuentro Latinoamericano",
    year: 2024,
  },
  {
    id: "photo-005",
    type: "photo",
    src: "/images/gallery/imagen-5.jpeg",
    alt: "Grupo de percusionistas tocando bombos legüeros en el escenario del Encuentro Latinoamericano con el público aplaudiendo",
    caption: "Percusión folclórica — bombos legüeros en vivo",
    year: 2024,
  },
  {
    id: "photo-006",
    type: "photo",
    src: "/images/gallery/imagen-6.jpeg",
    alt: "Parejas bailando chacarera con trajes coloridos y faldas floreadas ante el público",
    caption: "Chacarera en pareja — Encuentro Latinoamericano",
    year: 2024,
  },
  {
    id: "photo-007",
    type: "photo",
    src: "/images/gallery/imagen-7.jpeg",
    alt: "Niños bailando danzas folclóricas con vestimenta tradicional en el Encuentro Latinoamericano",
    caption: "Los más pequeños también bailan — Encuentro Latinoamericano",
    year: 2024,
  },
];

