"use client";

import YARLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryItem } from "@/types";

interface LightboxProps {
  photos: GalleryItem[];
  open: boolean;
  index: number;
  onClose: () => void;
}

export default function Lightbox({ photos, open, index, onClose }: LightboxProps) {
  const slides = photos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    title: photo.caption,
  }));

  return (
    <YARLightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
    />
  );
}
