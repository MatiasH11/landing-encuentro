import Image from "next/image";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { EVENT_TAGLINE } from "@/constants/history-data";
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="mb-6 md:mb-10">
          <Image
            src="/images/branding/logo.png"
            alt="Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
            width={627}
            height={320}
            className="h-auto w-72 drop-shadow-2xl sm:w-96 md:w-[440px] lg:w-[520px] xl:w-[580px]"
            priority
          />
        </div>

        {/* Tagline - Simplified */}
        <p className="mb-10 text-xl font-light tracking-wide text-white drop-shadow-lg md:mb-14 md:text-3xl lg:text-4xl">
          {EVENT_TAGLINE}
        </p>

        {/* Countdown */}
        <CountdownTimer />

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-tierra px-10 py-6 text-base font-semibold text-white shadow-lg hover:bg-tierra-light hover:shadow-xl"
          >
            <a href="#ediciones">Próximas Ediciones 2026</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-white/30 bg-white/10 px-10 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20"
          >
            <a href="#galeria">Ver Galería</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#historia"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float text-white/70 transition-colors hover:text-white"
          aria-label="Scroll hacia abajo"
        >
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
