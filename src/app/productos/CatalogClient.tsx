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
    <div className="min-h-screen bg-white text-foreground font-sans selection:bg-primary selection:text-white">
      
      {/* NAVEGACIÓN MODERNA */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-black/5" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 text-black hover:text-primary transition-colors group">
            <div className="bg-black/5 backdrop-blur-md p-2.5 rounded-full group-hover:-translate-x-1 transition-transform border border-black/5">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-[0.2em] text-xs uppercase hidden sm:block">Volver al Inicio</span>
          </Link>
          <div className={`transition-all duration-500 relative ${isScrolled ? 'h-10' : 'h-14'}`}>
            <img src="/logo.png" alt="Montano Antilia Logo" className={`h-full w-auto object-contain transition-all ${isScrolled ? 'filter invert' : 'filter invert'}`} />
          </div>
          <div className="w-20"></div> {/* Spacer */}
        </div>
      </nav>

      {/* HEADER MINIMALISTA */}
      <section className="pt-40 pb-16 px-6 text-center bg-white border-b border-gray-100">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-black">
            Nuestro Catálogo
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Explora nuestra selecta línea de productos, elaborados con la más alta calidad y tradición.
          </p>
        </div>
      </section>

      {/* BARRA DE FILTROS MINIMALISTA */}
      <section className="sticky top-[72px] sm:top-[80px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categorías (Texto Simple) */}
          <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar mask-edges">
            {displayCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as string)}
                className={`whitespace-nowrap pb-2 text-sm font-bold transition-all duration-300 relative ${
                  activeCategory === cat 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>
                )}
              </button>
            ))}
          </div>

          {/* Buscador Simplificado */}
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-transparent rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-0 focus:bg-gray-100 transition-all text-black"
            />
          </div>

        </div>
      </section>

      {/* GRID DE PRODUCTOS WOOCOMMERCE STYLE */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-[50vh]">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Sin resultados</h3>
            <p className="text-gray-500 font-light">No encontramos productos que coincidan con tu búsqueda.</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}} className="mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((prod, idx) => (
              <Link 
                href={`/productos/${prod.id}`}
                key={prod.id} 
                className={`group cursor-pointer transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="flex flex-col h-full bg-white">
                  
                  {/* Imagen del Producto - Limpia y sin fondo oscuro */}
                  <div className="w-full aspect-square relative mb-4 flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.name} className="w-full h-full object-contain mix-blend-multiply" />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <span className="text-gray-300 font-bold text-sm tracking-widest">[FOTO]</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido Inferior (Alineado a la Izquierda) */}
                  <div className="text-left">
                    <p className="text-gray-400 text-xs font-normal mb-1">{prod.category}</p>
                    <h3 className="font-bold text-lg text-black leading-tight group-hover:text-primary transition-colors">
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
