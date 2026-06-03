"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, X, Info, ChevronRight, MessageCircle } from "lucide-react";

const categories = ["Todos", "Jamones", "Ahumados", "Fiambres", "Especialidades"];

export default function CatalogClient({ catalog, dbCategories }: { catalog: any[], dbCategories?: any[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Estado para el Modal
  const [loaded, setLoaded] = useState(false);

  // Categorías dinámicas
  const dynamicCategories = ["Todos", ...Array.from(new Set([...(dbCategories?.map(c => c.name) || []), ...catalog.map(p => p.category)]))];
  const displayCategories = dynamicCategories.length > 1 ? dynamicCategories : categories;

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Evitar scroll en el body cuando el modal está abierto
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const filteredProducts = catalog.filter(p => {
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-foreground font-sans selection:bg-primary selection:text-white">
      
      {/* NAVEGACIÓN MODERNA */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-b border-white/5" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
            <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-full group-hover:-translate-x-1 transition-transform border border-white/10">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-[0.2em] text-xs uppercase">Volver al Inicio</span>
          </Link>
          <div className={`transition-all duration-500 relative ${isScrolled ? 'h-10' : 'h-14'}`}>
            <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-2xl" />
          </div>
        </div>
      </nav>

      {/* HEADER DEL CATÁLOGO - ESTILO PARALLAX PREMIUM */}
      <section className="relative pt-48 pb-24 px-6 bg-black text-white text-center overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Imagen de fondo con efecto zoom */}
        <div className="absolute inset-0 z-0">
           <div className={`absolute inset-0 transition-transform duration-[20s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`} style={{ backgroundImage: "url('/placeholder-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 40%' }}></div>
           <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] to-transparent opacity-10"></div>
        </div>
        
        <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">Colección 2026</span>
            <div className="h-[1px] w-8 bg-primary"></div>
          </div>
          <h1 className="heading text-5xl md:text-8xl font-extrabold mb-6 tracking-tighter drop-shadow-2xl">
            Catálogo <span className="font-light italic text-white/80">Premium</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra línea completa de embutidos elaborados bajo estrictos estándares de calidad y la tradición familiar que nos caracteriza.
          </p>
        </div>
      </section>

      {/* BARRA DE FILTROS FLOTANTE */}
      <section className="sticky top-[72px] sm:top-[80px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transform -translate-y-2">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categorías (Píldoras Elegantes) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar mask-edges">
            <Filter className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            {displayCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-[0_5px_15px_rgba(213,43,42,0.4)] transform scale-105' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Buscador Minimalista */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:bg-white"
            />
          </div>

        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="py-24 px-6 max-w-7xl mx-auto min-h-[50vh]">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Sin resultados</h3>
            <p className="text-gray-500 font-light">No encontramos productos que coincidan con tu búsqueda.</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}} className="mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filteredProducts.map((prod, idx) => (
              <Link 
                href={`/productos/${prod.id}`}
                key={prod.id} 
                className={`group cursor-pointer transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Tarjeta del Producto Rediseñada */}
                <div className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 h-full flex flex-col relative">
                  
                  {/* Etiqueta Flotante (Tag) */}
                  <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg text-black border border-gray-100">
                      {prod.category}
                    </span>
                  </div>

                  {/* Icono de + al hacer hover */}
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 pointer-events-none">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg leading-none">+</span>
                    </div>
                  </div>

                  {/* Imagen del Producto */}
                  <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-2xl overflow-hidden relative mb-5 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <span className="text-gray-300 font-extrabold text-lg tracking-widest z-10 transition-transform duration-500 group-hover:scale-110">[FOTO {prod.id}]</span>
                    )}
                  </div>

                  {/* Contenido Inferior */}
                  <div className="px-3 pb-4 flex-1 flex flex-col">
                    <p className="text-primary text-[10px] font-extrabold tracking-[0.2em] uppercase mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      {prod.tag}
                    </p>
                    <h3 className="heading font-bold text-xl text-black leading-tight group-hover:text-primary transition-colors">
                      {prod.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white/50 py-10 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="h-8 relative opacity-50 grayscale">
            <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain" />
          </div>
          <p className="text-xs tracking-wider uppercase">Copyright © 2026 Montano Antilia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
