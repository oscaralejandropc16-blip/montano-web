"use client";

export default function HalloweenAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      
      {/* Telaraña Esquina Superior Izquierda */}
      <div className="absolute top-0 left-0 w-44 h-44 opacity-40 transition-opacity hover:opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400/40 fill-none stroke-current" strokeWidth="0.8">
          <path d="M0,0 L100,0 M0,0 L90,40 M0,0 L70,70 M0,0 L40,90 M0,0 L0,100" />
          <path d="M20,0 Q18,8 14,14 Q8,18 0,20" />
          <path d="M40,0 Q36,16 28,28 Q16,36 0,40" />
          <path d="M60,0 Q54,24 42,42 Q24,54 0,60" />
          <path d="M80,0 Q72,32 56,56 Q32,72 0,80" />
          <path d="M100,0 Q90,40 70,70 Q40,90 0,100" />
        </svg>
      </div>

      {/* Telaraña Esquina Superior Derecha con Araña Colgante */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-45">
        <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400/35 fill-none stroke-current" strokeWidth="0.8">
          <path d="M100,0 L0,0 M100,0 L10,40 M100,0 L30,70 M100,0 L60,90 M100,0 L100,100" />
          <path d="M80,0 Q82,8 86,14 Q92,18 100,20" />
          <path d="M60,0 Q64,16 72,28 Q84,36 100,40" />
          <path d="M40,0 Q46,24 58,42 Q76,54 100,60" />
          <path d="M20,0 Q28,32 44,56 Q68,72 100,80" />
        </svg>
        
        {/* Araña meciéndose */}
        <div className="absolute top-12 right-20 animate-spider flex flex-col items-center">
          <div className="w-[1px] h-14 bg-gradient-to-b from-purple-300/40 to-orange-400"></div>
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-orange-400 fill-current drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="6" r="2.5" />
            <path d="M8 10 C4 6 2 12 0 10 M8 12 C3 11 2 15 0 16 M8 14 C4 18 2 17 0 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M16 10 C20 6 22 12 24 10 M16 12 C21 11 22 15 24 16 M16 14 C20 18 22 17 24 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Murciélagos animados cruzando la pantalla */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Murciélago 1 */}
        <div 
          className="absolute top-[18%] left-[-100px] w-10 h-7 text-orange-500/80 drop-shadow-[0_0_10px_rgba(255,106,0,0.6)]"
          style={{ animation: 'batFlyHorizontal 18s linear infinite 1s' }}
        >
          <svg viewBox="0 0 64 36" fill="currentColor" className="w-full h-full" style={{ animation: 'batWingFlap 0.3s ease-in-out infinite alternate' }}>
            <path d="M32 14c-4-4-10-8-18-6 4 6 4 12 0 16 7-1 12 3 16 8 1-3 2-4 2-4s1 1 2 4c4-5 9-9 16-8-4-4-4-10 0-16-8-2-14 2-18 6z" />
          </svg>
        </div>

        {/* Murciélago 2 (más rápido y alto) */}
        <div 
          className="absolute top-[32%] left-[-100px] w-7 h-5 text-purple-400/70 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]"
          style={{ animation: 'batFlyHorizontal 24s linear infinite 8s' }}
        >
          <svg viewBox="0 0 64 36" fill="currentColor" className="w-full h-full" style={{ animation: 'batWingFlap 0.22s ease-in-out infinite alternate' }}>
            <path d="M32 14c-4-4-10-8-18-6 4 6 4 12 0 16 7-1 12 3 16 8 1-3 2-4 2-4s1 1 2 4c4-5 9-9 16-8-4-4-4-10 0-16-8-2-14 2-18 6z" />
          </svg>
        </div>

        {/* Murciélago 3 (inferior) */}
        <div 
          className="absolute top-[68%] left-[-100px] w-9 h-6 text-orange-400/60 drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]"
          style={{ animation: 'batFlyHorizontal 21s linear infinite 14s' }}
        >
          <svg viewBox="0 0 64 36" fill="currentColor" className="w-full h-full" style={{ animation: 'batWingFlap 0.28s ease-in-out infinite alternate' }}>
            <path d="M32 14c-4-4-10-8-18-6 4 6 4 12 0 16 7-1 12 3 16 8 1-3 2-4 2-4s1 1 2 4c4-5 9-9 16-8-4-4-4-10 0-16-8-2-14 2-18 6z" />
          </svg>
        </div>
      </div>

      {/* Partículas luminosas de calabaza flotando hacia arriba */}
      <div className="absolute inset-0">
        <div className="absolute bottom-10 left-[15%] w-2 h-2 rounded-full bg-orange-500/50 blur-[1px] animate-pulse"></div>
        <div className="absolute bottom-24 left-[35%] w-2.5 h-2.5 rounded-full bg-purple-500/40 blur-[1px] animate-pulse delay-200"></div>
        <div className="absolute bottom-32 right-[25%] w-2 h-2 rounded-full bg-amber-400/50 blur-[1px] animate-pulse delay-100"></div>
        <div className="absolute bottom-16 right-[10%] w-3 h-3 rounded-full bg-orange-600/40 blur-[1.5px] animate-pulse delay-300"></div>
      </div>

      {/* Niebla inferior sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-950/20 via-orange-950/10 to-transparent animate-mist"></div>

    </div>
  );
}
