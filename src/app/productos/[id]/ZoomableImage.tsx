"use client";

import { useState } from "react";
import { ZoomIn, X } from "lucide-react";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 p-4 w-full h-full flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl">
          <div className="bg-white/90 text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn className="w-4 h-4" /> Ampliar
          </div>
        </div>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-zoom-out" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="relative z-10 max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl bg-white p-4" 
            />
          </div>
        </div>
      )}
    </>
  );
}
