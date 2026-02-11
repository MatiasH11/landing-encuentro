"use client";

import Image from "next/image";
import type { GalleryItem } from "@/types";

interface PhotoGridProps {
  photos: GalleryItem[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onPhotoClick(index)}
          className="group relative mb-4 block w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-tierra focus:ring-offset-2"
          aria-label={`Ver ${photo.caption}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={600}
            height={400}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="p-4">
              <p className="text-sm font-medium text-white">{photo.caption}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
