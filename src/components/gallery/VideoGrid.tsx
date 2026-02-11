"use client";

import { motion } from "framer-motion";
import type { GalleryItem } from "@/types";

interface VideoGridProps {
  videos: GalleryItem[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className="group overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-border/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        >
          <div className="relative aspect-video overflow-hidden">
            <iframe
              src={video.videoUrl}
              title={video.caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="p-4">
            <p className="text-sm font-medium text-slate">{video.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
