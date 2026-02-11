import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EVENT_NAME, EVENT_TAGLINE, STATS } from "@/constants/history-data";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/gallery/imagen-1.jpeg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={85}
      />

      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-tierra-deep/70 via-tierra-deep/50 to-tierra-deep/85" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Title */}
        <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {EVENT_NAME}
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-lg font-light tracking-wide text-celeste-light md:text-xl">
          {EVENT_TAGLINE}
        </p>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-tierra-light md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-tierra px-8 text-base font-medium text-white hover:bg-tierra-light"
          >
            <a href="#ediciones">Próximas Ediciones 2026</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="rounded-full border border-white/20 px-8 text-base font-medium text-white hover:bg-white/10"
          >
            <a href="#galeria">Ver Galería</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#historia"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/40 transition-colors hover:text-white/80"
          aria-label="Scroll hacia abajo"
        >
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
