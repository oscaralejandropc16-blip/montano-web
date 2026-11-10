"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface SocialBannerProps {
  instagramUrl?: string;
  tiktokUrl?: string;
  title?: string;
  subtitle?: string;
}

interface BokehParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  alphaSpeed: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(239, 68, 68, ",   // Rojo primario
  "rgba(244, 63, 94, ",   // Rosa coral festivo
  "rgba(16, 185, 129, ",  // Verde esmeralda
  "rgba(255, 255, 255, ",  // Blanco diamante
  "rgba(225, 48, 108, ",  // Rosa Instagram
];

export default function SocialBanner({
  instagramUrl = "https://www.instagram.com/montanoantilia.ca/",
  tiktokUrl = "https://www.tiktok.com/@montanoantilia.ca",
  title = "¡Síguenos en Redes Sociales!",
  subtitle = "Descubre recetas, novedades de temporada, lanzamientos y el auténtico sabor venezolano.",
}: SocialBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width && entry.contentRect.height) {
          width = canvas.width = Math.floor(entry.contentRect.width);
          height = canvas.height = Math.floor(entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(container);

    // Generar partículas bokeh que flotan suavemente hacia arriba
    const particles: BokehParticle[] = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.5 + 1.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.5 + 0.25),
      alpha: Math.random() * 0.6 + 0.1,
      maxAlpha: Math.random() * 0.6 + 0.25,
      alphaSpeed: Math.random() * 0.01 + 0.005,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Si sale por arriba, reaparece abajo
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#060A12] via-[#0E1526] to-[#081510] text-white p-8 sm:p-12 lg:p-14 border border-white/15 shadow-2xl group"
      style={{
        boxShadow:
          "0 25px 65px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Canvas animado de bokeh y partículas flotantes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Orbes de luz ambiental con movimiento fluido */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-primary/25 rounded-full blur-[110px] pointer-events-none animate-orb-1" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[110px] pointer-events-none animate-orb-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none animate-orb-3" />

      {/* Red sutil de líneas decorativas en el fondo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Contenido en primer plano */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Columna de Texto */}
        <div className="text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs">
              Comunidad Digital Montano Antilia
            </span>
          </div>

          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-[1.15]">
            {title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Tarjetas de Botones de Redes Sociales */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
          
          {/* Botón Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/insta relative w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-pink-500/50 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-pink-500/20"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shadow-md group-hover/insta:rotate-6 transition-transform duration-300 shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            
            <div className="text-left">
              <span className="block font-bold text-white text-sm tracking-wide group-hover/insta:text-pink-300 transition-colors">
                Instagram
              </span>
              <span className="block text-[11px] text-slate-400 font-medium">
                @montanoantilia.ca
              </span>
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/insta:text-pink-300 group-hover/insta:translate-x-0.5 group-hover/insta:-translate-y-0.5 transition-all ml-2" />
          </a>

          {/* Botón TikTok */}
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/tiktok relative w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-slate-300/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-white/10"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center text-white shadow-md group-hover/tiktok:-rotate-6 transition-transform duration-300 shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
            
            <div className="text-left">
              <span className="block font-bold text-white text-sm tracking-wide group-hover/tiktok:text-slate-100 transition-colors">
                TikTok
              </span>
              <span className="block text-[11px] text-slate-400 font-medium">
                @montanoantilia.ca
              </span>
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/tiktok:text-white group-hover/tiktok:translate-x-0.5 group-hover/tiktok:-translate-y-0.5 transition-all ml-2" />
          </a>

        </div>

      </div>
    </div>
  );
}
