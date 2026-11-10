"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  flicker: boolean;
  history: Array<{ x: number; y: number }>;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
}

// Paleta festiva sin amarillos: Rojos Montano, Verdes Bosque/Esmeralda y Blanco Estelar
const FIREWORK_COLORS = [
  "#EF4444", // Rojo intenso
  "#DC2626", // Rojo primario Montano
  "#F87171", // Rosa coral festivo
  "#10B981", // Verde esmeralda
  "#059669", // Verde bosque
  "#34D399", // Verde menta brillante
  "#FFFFFF", // Blanco diamante
  "#F1F5F9", // Blanco plateado
  "#F43F5E", // Rubí brillante
];

export default function FireworksBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let cssWidth = container.clientWidth;
    let cssHeight = container.clientHeight;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    const setupDimensions = () => {
      cssWidth = container.clientWidth;
      cssHeight = container.clientHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupDimensions();

    const resizeObserver = new ResizeObserver(() => {
      setupDimensions();
    });
    resizeObserver.observe(container);

    // Fondo de estrellas parpadeantes sutiles
    const stars: Star[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.008,
    }));

    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];

    const createExplosion = (x: number, y: number, colorOverride?: string) => {
      const baseColor =
        colorOverride ||
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      const count = 45 + Math.floor(Math.random() * 30);
      const isChrysanthemum = Math.random() > 0.4;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isChrysanthemum
          ? Math.random() * 4.2 + 1.2
          : Math.random() * 3.0 + 0.8;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color:
            Math.random() > 0.3
              ? baseColor
              : FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
          alpha: 1,
          decay: Math.random() * 0.016 + 0.012,
          size: Math.random() * 2.2 + 1.0,
          flicker: Math.random() > 0.4,
          history: [],
        });
      }
    };

    const launchRocket = (startX?: number, targetCustomY?: number) => {
      const x =
        startX !== undefined
          ? startX
          : Math.random() * (cssWidth * 0.85) + cssWidth * 0.075;
      const targetY =
        targetCustomY !== undefined
          ? targetCustomY
          : Math.random() * (cssHeight * 0.5) + cssHeight * 0.15;

      const color =
        FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      rockets.push({
        x,
        y: cssHeight + 5,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 3.5 + 6.0),
        targetY,
        color,
        trail: [],
      });
    };

    // Lanzamiento por clic o toque del usuario
    const handlePointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Crear explosión inmediata en el punto de contacto
      createExplosion(clickX, clickY);

      // Lanzar también un cohete hacia arriba para acompañar
      setTimeout(() => {
        launchRocket(
          Math.max(20, Math.min(cssWidth - 20, clickX + (Math.random() - 0.5) * 80)),
          Math.max(30, clickY - 40)
        );
      }, 120);

      setClickCount((c) => c + 1);
    };

    container.addEventListener("pointerdown", handlePointerDown);

    let tick = 0;

    const loop = () => {
      tick++;

      // Lanzamiento automático secuencial y elegante
      if (tick % 45 === 0) {
        launchRocket();
      }
      if (tick % 110 === 0) {
        // Salva doble ocasional
        launchRocket();
        setTimeout(() => launchRocket(), 180);
      }

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Dibujar estrellas titilantes nocturnas
      for (const s of stars) {
        s.alpha += s.speed;
        if (s.alpha > 0.9 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, s.alpha)})`;
        ctx.fill();
      }

      // Actualizar cohetes
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Guardar estela
        r.trail.unshift({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 8) r.trail.pop();

        // Dibujar estela de chispas del cohete
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          pt.alpha *= 0.75;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(0.8, 2.0 - t * 0.2), 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = pt.alpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Cabeza del cohete
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Explosión al llegar al ápice
        if (r.y <= r.targetY || r.vy >= -1) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Actualizar y dibujar chispas de la explosión
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];

        // Guardar última posición para pequeña cola de luz
        p.history.unshift({ x: p.x, y: p.y });
        if (p.history.length > 4) p.history.pop();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.055; // Gravedad suave
        p.vx *= 0.982; // Fricción atmosférica
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const currentAlpha =
          p.flicker && Math.random() > 0.4
            ? Math.max(0, p.alpha * 0.45)
            : p.alpha;

        // Estela corta
        if (p.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.7;
          ctx.globalAlpha = currentAlpha * 0.4;
          ctx.stroke();
        }

        // Núcleo brillante
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };

    // Lanzamientos iniciales de bienvenida
    setTimeout(() => launchRocket(cssWidth * 0.25, cssHeight * 0.35), 200);
    setTimeout(() => launchRocket(cssWidth * 0.75, cssHeight * 0.3), 500);
    setTimeout(() => launchRocket(cssWidth * 0.5, cssHeight * 0.25), 900);

    loop();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("pointerdown", handlePointerDown);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mb-16 rounded-[2.5rem] bg-gradient-to-br from-[#060A12] via-[#0C1222] to-[#06150E] p-8 sm:p-14 text-white border border-white/15 shadow-2xl overflow-hidden cursor-crosshair select-none group"
      style={{
        boxShadow:
          "0 30px 70px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      }}
      title="Haz clic en cualquier lugar para lanzar más fuegos artificiales"
    >
      {/* Canvas interactivo de fuegos artificiales */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ mixBlendMode: "screen" }}
        aria-hidden="true"
      />

      {/* Resplandores ambientales nocturnos de fondo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Contenido en primer plano */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div className="max-w-2xl">
          {/* Indicador elegante sin formato de cápsula */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-red-400 drop-shadow">
              Montano Antilia • Celebración de Fin de Año
            </span>
          </div>

          <h3 className="heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-red-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Felices Fiestas y Próspero Año Nuevo
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            De parte de toda la gran familia de <strong>Montano Antilia</strong>, extendemos nuestros más cálidos deseos. Que la paz, la salud, la prosperidad y el inconfundible sabor de nuestras tradiciones reúnan a cada familia venezolana en estas fechas inolvidables.
          </p>

          {/* Micro indicación interactiva discreta */}
          <p className="text-[11px] text-slate-400/80 font-medium tracking-wide mt-3 flex items-center justify-center lg:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Toca o haz clic sobre este recuadro para encender más fuegos artificiales</span>
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="/#navidad"
            className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            <span>Ver Recetas Navideñas</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/productos"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <span>Ver Catálogo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
