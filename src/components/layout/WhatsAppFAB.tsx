"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACTS } from "@/constants/event-data";

export default function WhatsAppFAB() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleToggle = () => {
    setOpen((v) => !v);
    setShowBubble(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">

      {/* Mensaje flotante que aparece solo */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative mr-1 flex items-center gap-3 rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-2xl ring-1 ring-black/5"
          >
            <span className="text-sm font-semibold text-foreground">
              ¿Tenés consultas? ¡Escribinos! 👋
            </span>
            <button
              onClick={() => setShowBubble(false)}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Cerrar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            {/* Triangulito apuntando al FAB */}
            <span className="absolute -bottom-[7px] right-5 h-3.5 w-3.5 rotate-45 rounded-br-sm bg-white ring-1 ring-black/5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tarjetas de contacto */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {CONTACTS.map((contact, i) => (
              <motion.a
                key={contact.name}
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.16 }}
                className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 transition-transform hover:scale-[1.03]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                  <FaWhatsapp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Escribir a</p>
                  <p className="whitespace-nowrap text-sm font-semibold text-foreground">
                    {contact.name}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop para cerrar al hacer click afuera */}
      {open && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Anillos de pulso + FAB principal */}
      <div className="relative">
        <motion.span
          className="absolute inset-0 rounded-full bg-whatsapp"
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
          aria-hidden
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-whatsapp"
          animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
          aria-hidden
        />

        <motion.button
          onClick={handleToggle}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-2xl hover:bg-whatsapp-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
          whileTap={{ scale: 0.88 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 20, delay: 0.6 }}
          aria-label={open ? "Cerrar opciones de WhatsApp" : "Contactar por WhatsApp"}
          aria-expanded={open}
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-7 w-7" /> : <FaWhatsapp className="h-7 w-7" />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
