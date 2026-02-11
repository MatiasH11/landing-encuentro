"use client";

import { useState } from "react";
import { GALLERY_ITEMS } from "@/constants/gallery-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import VideoGrid from "@/components/gallery/VideoGrid";
import Lightbox from "@/components/gallery/Lightbox";

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const photos = GALLERY_ITEMS.filter((item) => item.type === "photo");
  const videos = GALLERY_ITEMS.filter((item) => item.type === "video");
  const hasContent = GALLERY_ITEMS.length > 0;
  const hasPhotos = photos.length > 0;
  const hasVideos = videos.length > 0;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
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
    <section id="galeria" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-tierra">
            Galería
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Momentos inolvidables
          </h2>
          <p className="mt-4 text-muted-foreground">
            Imágenes de nuestras ediciones anteriores
          </p>
        </div>

        {hasPhotos && hasVideos ? (
          <Tabs defaultValue="fotos" className="mt-12">
            <TabsList className="mx-auto flex w-fit rounded-full">
              <TabsTrigger value="fotos" className="rounded-full">Fotos</TabsTrigger>
              <TabsTrigger value="videos" className="rounded-full">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="fotos" className="mt-8">
              <PhotoGrid photos={photos} onPhotoClick={openLightbox} />
            </TabsContent>
            <TabsContent value="videos" className="mt-8">
              <VideoGrid videos={videos} />
            </TabsContent>
          </Tabs>
        ) : hasPhotos ? (
          <div className="mt-12">
            <PhotoGrid photos={photos} onPhotoClick={openLightbox} />
          </div>
        ) : (
          <div className="mt-12">
            <VideoGrid videos={videos} />
          </div>
        )}
      </div>

      {hasPhotos && (
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
