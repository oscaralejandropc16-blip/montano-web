"use client";

import { useState, useRef, MouseEvent } from "react";
import { ZoomIn } from "lucide-react";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-white cursor-crosshair group"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain transition-transform duration-150 ease-out pointer-events-none" 
        style={{
          transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
          transformOrigin: `${position.x}% ${position.y}%`
        }}
      />
      {!isZoomed && (
        <div className="absolute top-4 right-4 bg-white/80 p-2.5 rounded-full shadow-sm text-gray-400 pointer-events-none backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
