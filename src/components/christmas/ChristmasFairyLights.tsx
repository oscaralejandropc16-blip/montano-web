"use client";

import React, { useMemo } from "react";

interface FairyLightsProps {
  className?: string;
  count?: number;
}

const BULB_COLORS = [
  { fill: "#EF4444", glow: "rgba(239, 68, 68, 0.7)", animationDelay: "0s" },
  { fill: "#F59E0B", glow: "rgba(245, 158, 11, 0.75)", animationDelay: "0.4s" },
  { fill: "#10B981", glow: "rgba(16, 185, 129, 0.7)", animationDelay: "0.8s" },
  { fill: "#3B82F6", glow: "rgba(59, 130, 246, 0.7)", animationDelay: "1.2s" },
  { fill: "#EC4899", glow: "rgba(236, 72, 153, 0.7)", animationDelay: "1.6s" },
  { fill: "#FCD34D", glow: "rgba(252, 211, 77, 0.8)", animationDelay: "0.6s" },
];

export default function ChristmasFairyLights({ className = "", count = 28 }: FairyLightsProps) {
  const bulbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const color = BULB_COLORS[i % BULB_COLORS.length];
      return {
        id: i,
        ...color,
        duration: `${1.4 + (i % 5) * 0.3}s`,
      };
    });
  }, [count]);

  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none relative z-30 ${className}`}
      aria-hidden="true"
    >
      <div className="flex justify-between items-start w-full px-2 sm:px-6 relative -top-1">
        {bulbs.map((bulb, i) => (
          <div
            key={bulb.id}
            className="flex flex-col items-center flex-1 max-w-[40px] min-w-[14px]"
            style={{
              animation: `holidayTwinkle ${bulb.duration} ease-in-out infinite alternate`,
              animationDelay: bulb.animationDelay,
            }}
          >
            {/* Cable curvado */}
            <div className="w-full h-2.5 border-b border-emerald-900/60 rounded-[50%]" />
            {/* Casquillo del bombillo */}
            <div className="w-1.5 h-1.5 bg-emerald-950 rounded-t-sm -mt-0.5" />
            {/* Bombillo con reflejo de cristal y resplandor */}
            <div
              className="w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-full relative transition-all duration-300 -mt-0.5"
              style={{
                backgroundColor: bulb.fill,
                boxShadow: `0 0 10px 2px ${bulb.glow}, 0 0 18px 4px ${bulb.glow}`,
              }}
            >
              {/* Reflejo de cristal */}
              <div className="absolute top-0.5 left-0.5 w-1 h-1.5 bg-white/70 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
