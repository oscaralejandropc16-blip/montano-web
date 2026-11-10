"use client";

import React, { useEffect, useRef, useState } from "react";

interface Flake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  isCrystal: boolean;
}

export default function ChristmasSnow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Verificar preferencia guardada
    const saved = localStorage.getItem("montano_snow_enabled");
    if (saved !== null) {
      setEnabled(saved === "true");
    }

    // Escuchar cambios de toggle desde otros componentes
    const handleToggle = (e: CustomEvent<{ enabled: boolean }>) => {
      setEnabled(e.detail.enabled);
    };

    window.addEventListener("toggle-snow" as any, handleToggle);
    return () => window.removeEventListener("toggle-snow" as any, handleToggle);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Respetar prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Ajustar cantidad de copos según ancho de pantalla
    const flakeCount = Math.min(Math.floor(width / 18), 75);
    const flakes: Flake[] = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2,
        speed: Math.random() * 1.2 + 0.6,
        wind: Math.random() * 0.4 - 0.2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.35,
        isCrystal: Math.random() > 0.85,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Movimiento vertical y oscilación horizontal
        flake.y += flake.speed;
        flake.x += Math.sin(time * flake.swaySpeed + flake.swayOffset) * 0.8 + flake.wind;

        // Reinicio al salir de la pantalla
        if (flake.y > height + 10) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 10) flake.x = -10;
        if (flake.x < -10) flake.x = width + 10;

        ctx.beginPath();
        if (flake.isCrystal) {
          // Copo con forma de cristal destellante
          const sparkle = Math.abs(Math.sin(time * 2 + flake.swayOffset));
          ctx.arc(flake.x, flake.y, flake.radius * (0.8 + sparkle * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(flake.opacity + sparkle * 0.3, 1)})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.shadowBlur = 4;
        } else {
          // Copo suave estándar
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[48] w-full h-full"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
