"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS } from "@/constants/event-data";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">
        {/* Brand */}
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/images/branding/logo.png"
            alt="Encuentro Latinoamericano del Canto y las Danzas Folclóricas"
            width={627}
            height={320}
            className={`h-12 w-auto transition-all duration-300 md:h-14 ${!scrolled ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : ""
              }`}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${scrolled
                  ? "text-slate hover:bg-tierra/10 hover:text-tierra-dark"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full lg:hidden ${!scrolled ? "text-white hover:bg-white/10" : ""
            }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="border-t border-border/10 bg-white/95 px-4 pb-4 backdrop-blur-xl lg:hidden"
          aria-label="Navegación móvil"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate transition-colors hover:bg-tierra/10 hover:text-tierra-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
