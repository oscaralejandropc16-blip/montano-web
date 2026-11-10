"use client";

import React from "react";
import { X, Sparkles, Heart } from "lucide-react";
import ChristmasSantaHat from "./ChristmasSantaHat";

interface GreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappRaw?: string;
}

export default function ChristmasGreetingModal({
  isOpen,
  onClose,
  whatsappRaw = "584243249097",
}: GreetingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in-up">
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#14532D] via-[#0F3920] to-[#7F1D1D] text-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border-2 border-amber-300/60 overflow-hidden"
        style={{
          boxShadow: "0 25px 60px -15px rgba(220, 38, 38, 0.4), 0 0 40px rgba(245, 158, 11, 0.25)",
        }}
      >
        {/* Decoración ambiental de fondo */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar saludo"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado del Saludo */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-3xl bg-white/10 border border-amber-300/40 flex items-center justify-center shadow-inner relative">
              <span className="text-4xl">🎄</span>
              <div className="absolute -top-3 -right-3">
                <ChristmasSantaHat size={32} />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase mb-4 border border-amber-300/30">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
            Temporada Navideña Montano Antilia
          </div>

          <h3 className="heading text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            ¡Felices Fiestas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
              y Próspero Año Nuevo!
            </span>
          </h3>

          <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal mb-8 max-w-md">
            De parte de toda la familia <strong className="text-amber-300 font-bold">Montano Antilia</strong>, 
            queremos agradecerte por acompañarnos este año. Que la paz, la salud y la alegría de compartir 
            nuestras tradiciones culinarias colmen cada rincón de tu hogar en esta Navidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <a
              href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                "¡Hola Montano Antilia! 🎄 Les deseo Felices Fiestas y quisiera consultar disponibilidad de productos navideños para mi cena familiar ✨"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 px-6 rounded-2xl text-xs font-bold tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
            >
              <span>🎅 Pedidos Navideños</span>
            </a>
            <button
              onClick={onClose}
              className="bg-white/15 hover:bg-white/25 text-white py-4 px-6 rounded-2xl text-xs font-bold tracking-widest uppercase transition-colors border border-white/20"
            >
              Cerrar
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-white/60 text-xs font-medium">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>El Sabor que Conquista tu Navidad</span>
          </div>
        </div>
      </div>
    </div>
  );
}
