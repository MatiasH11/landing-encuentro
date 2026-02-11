"use client";

import { useState } from "react";
import { GALLERY_ITEMS } from "@/constants/gallery-data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Lightbox from "@/components/gallery/Lightbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const INITIAL_ITEMS_COUNT = 6;

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const hasContent = GALLERY_ITEMS.length > 0;
  const photos = GALLERY_ITEMS.filter((item) => item.type === "photo");

  const displayedItems = showAll ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, INITIAL_ITEMS_COUNT);
  const hasMore = GALLERY_ITEMS.length > INITIAL_ITEMS_COUNT;

  const openLightbox = (clickedItem: typeof GALLERY_ITEMS[0]) => {
    if (clickedItem.type === "photo") {
      const photoIndex = photos.findIndex(p => p.id === clickedItem.id);
      setLightboxIndex(photoIndex);
      setLightboxOpen(true);
    }
  };

  if (!hasContent) {
    return (
      <section id="galeria" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Galería
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Momentos inolvidables
          </h2>
          <p className="mt-12 text-muted-foreground">
            Próximamente fotos y videos de nuestras ediciones anteriores.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="galeria" className="relative overflow-hidden py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-bg to-white" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Galería
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Momentos inolvidables
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Imágenes y videos de nuestras ediciones anteriores
          </p>
        </motion.div>

        {/* Mixed gallery grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((item, index) => {
            return item.type === "photo" ? (
              <motion.button
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group relative overflow-hidden rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-tierra focus:ring-offset-2"
                aria-label={`Ver ${item.caption}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-end bg-gradient-to-t from-tierra-dark/90 via-tierra/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5">
                      <p className="text-sm font-semibold text-white drop-shadow-lg">{item.caption}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key={item.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-border/30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              >
                <div className="relative aspect-video">
                  <iframe
                    src={item.videoUrl}
                    title={item.caption}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-slate">{item.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {hasMore && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-tierra/30 px-8 text-tierra hover:bg-tierra/5 hover:border-tierra"
            >
              {showAll ? "Ver menos" : "Ver más contenido"}
              {showAll ? (
                <ChevronUp className="ml-2 h-5 w-5" />
              ) : (
                <ChevronDown className="ml-2 h-5 w-5" />
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {photos.length > 0 && (
        <Lightbox
          photos={photos}
          open={lightboxOpen}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
