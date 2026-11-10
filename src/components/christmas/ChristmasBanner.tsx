"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, Snowflake } from "lucide-react";
import ChristmasFairyLights from "./ChristmasFairyLights";

interface ChristmasBannerProps {
  onOpenGreeting?: () => void;
  lang?: string;
}

export default function ChristmasBanner({ onOpenGreeting }: ChristmasBannerProps) {
  const [visible, setVisible] = useState(true);
  const [snowActive, setSnowActive] = useState(true);

  useEffect(() => {
    const bannerDismissed = sessionStorage.getItem("montano_christmas_banner_dismissed");
    if (bannerDismissed === "true") {
      setVisible(false);
    }

    const savedSnow = localStorage.getItem("montano_snow_enabled");
    if (savedSnow !== null) {
      setSnowActive(savedSnow === "true");
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("montano_christmas_banner_dismissed", "true");
  };

  const handleToggleSnow = () => {
    const nextState = !snowActive;
    setSnowActive(nextState);
    localStorage.setItem("montano_snow_enabled", String(nextState));
    window.dispatchEvent(
      new CustomEvent("toggle-snow", { detail: { enabled: nextState } })
    );
  };

  if (!visible) return null;

  return (
    <div className="relative z-50 w-full overflow-hidden bg-gradient-to-r from-[#7F1D1D] via-[#14532D] to-[#991B1B] text-white shadow-md border-b border-amber-300/30">
      {/* Guirnalda de luces navideñas */}
      <ChristmasFairyLights count={28} className="absolute top-0 left-0 right-0" />

      {/* Brillo ambiental dorado de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium relative z-10">
        
        {/* Mensaje Principal con Animación de Destello */}
        <div className="flex items-center gap-2 flex-1 justify-center md:justify-start overflow-hidden">
          <span className="hidden sm:inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-bold text-amber-300 tracking-wide uppercase text-[11px] sm:text-xs">
              🎄 ¡Temporada Navideña!
            </span>
            <span className="hidden md:inline text-white/90">
              — El auténtico sabor de nuestras tradiciones para tu cena de Navidad y Fin de Año.
            </span>
            <span className="inline md:hidden text-white/90 truncate">
              — Tradición y sabor en tu mesa.
            </span>
          </div>
          <a
            href="#navidad"
            className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-amber-300 hover:text-white underline underline-offset-4 transition-colors ml-2"
          >
            Ver Especiales 🎅
          </a>
        </div>

        {/* Acciones: Control de Nieve y Cerrar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Botón Toggle de Nieve */}
          <button
            onClick={handleToggleSnow}
            title={snowActive ? "Pausar animación de nieve" : "Activar animación de nieve"}
            aria-label="Toggle nieve"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-300 border ${
              snowActive
                ? "bg-white/20 hover:bg-white/30 border-white/40 text-white shadow-sm"
                : "bg-black/30 hover:bg-black/40 border-white/20 text-white/70"
            }`}
          >
            <Snowflake className={`w-3.5 h-3.5 ${snowActive ? "animate-spin" : "opacity-60"}`} style={{ animationDuration: "8s" }} />
            <span className="hidden sm:inline">Nieve</span>
            <span className={`w-1.5 h-1.5 rounded-full ${snowActive ? "bg-emerald-400 animate-ping" : "bg-slate-400"}`} />
          </button>

          {/* Botón Saludo Navideño (si está disponible) */}
          {onOpenGreeting && (
            <button
              onClick={onOpenGreeting}
              className="hidden sm:inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase hover:bg-amber-300 transition-colors shadow-sm"
            >
              🎁 Mensaje
            </button>
          )}

          {/* Botón de cerrar */}
          <button
            onClick={handleDismiss}
            aria-label="Cerrar aviso navideño"
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
