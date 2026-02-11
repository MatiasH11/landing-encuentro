import type { GalleryItem } from "@/types";

interface VideoGridProps {
  videos: GalleryItem[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {videos.map((video) => (
        <div key={video.id} className="overflow-hidden rounded-lg">
          <div className="relative aspect-video">
            <iframe
              src={video.videoUrl}
              title={video.caption}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-lg"
            />
          </div>
          <p className="mt-2 text-sm text-warm-gray">{video.caption}</p>
        </div>
      ))}
    </div>
  );
}
