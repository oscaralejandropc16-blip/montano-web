"use client";

import React from "react";

interface SantaHatProps {
  className?: string;
  size?: number;
}

export default function ChristmasSantaHat({ className = "", size = 28 }: SantaHatProps) {
  return (
    <div
      className={`inline-block select-none pointer-events-none transition-transform duration-300 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Sombreado rojo intenso navideño */}
          <linearGradient id="hatRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="45%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          {/* Brillo suave de nieve/pompom */}
          <linearGradient id="fluffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <filter id="hatShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Cuerpo del gorro (curvado hacia la derecha) */}
        <path
          d="M 18 72 C 22 45, 48 20, 80 32 C 86 35, 90 44, 86 52 C 82 58, 76 62, 70 65 C 55 58, 42 66, 18 72 Z"
          fill="url(#hatRedGrad)"
          filter="url(#hatShadow)"
        />

        {/* Doblez y pliegue del gorro */}
        <path
          d="M 52 42 C 65 38, 78 40, 84 50 C 76 46, 64 45, 52 42 Z"
          fill="#7F1D1D"
          opacity="0.4"
        />

        {/* Borde afelpado blanco (peluche inferior) */}
        <path
          d="M 12 70 C 12 65, 18 63, 24 64 C 30 63, 36 63, 42 64 C 48 63, 54 64, 60 65 C 66 66, 72 68, 75 72 C 73 78, 65 80, 58 79 C 50 80, 42 80, 34 79 C 26 80, 18 79, 14 77 C 11 75, 11 71, 12 70 Z"
          fill="url(#fluffGrad)"
          stroke="#CBD5E1"
          strokeWidth="1"
          filter="url(#hatShadow)"
        />

        {/* Pom-pom blanco en la punta */}
        <circle
          cx="88"
          cy="52"
          r="10"
          fill="url(#fluffGrad)"
          stroke="#CBD5E1"
          strokeWidth="1"
          filter="url(#hatShadow)"
        />
        {/* Destellos de nieve en el pom-pom */}
        <circle cx="86" cy="49" r="2.5" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
}
