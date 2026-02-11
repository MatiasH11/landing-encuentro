"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/types";

interface PhotoGridProps {
  photos: GalleryItem[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {photos.map((photo, index) => (
        <motion.button
          key={photo.id}
          onClick={() => onPhotoClick(index)}
          className="group relative mb-4 block w-full overflow-hidden rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-tierra focus:ring-offset-2"
          aria-label={`Ver ${photo.caption}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={600}
            height={400}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
              <p className="text-sm font-semibold text-white drop-shadow-lg">{photo.caption}</p>
            </div>
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}
