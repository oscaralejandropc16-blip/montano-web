"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, ChevronDown, Check } from "lucide-react";
import Footer from "@/components/Footer";
import { getOptimizedUrl } from "@/lib/optimizeUrl";
import { translations, Language } from "@/lib/translations";

const defaultCategories = ["Todos", "Jamones", "Ahumados", "Fiambres", "Especialidades"];

const translateProductData = (text: string, lang: Language) => {
  if (!text || lang === 'es') return text;
  const dict: Record<string, Record<string, string>> = {
    "Jamón Cocido": { en: "Cooked Ham", it: "Prosciutto Cotto", pt: "Presunto Cozido", fr: "Jambon Cuit", de: "Kochschinken" },
    "Jamones": { en: "Hams", it: "Prosciutti", pt: "Presuntos", fr: "Jambons", de: "Schinken" },
    "Ahumados": { en: "Smoked", it: "Affumicati", pt: "Defumados", fr: "Fumés", de: "Geräuchert" },
    "Fiambres": { en: "Cold Cuts", it: "Salumi", pt: "Frios", fr: "Charcuterie", de: "Aufschnitt" },
    "Especialidades": { en: "Specialties", it: "Specialità", pt: "Especialidades", fr: "Spécialités", de: "Spezialitäten" },
    "Chorizos": { en: "Chorizos", it: "Chorizo", pt: "Chouriços", fr: "Chorizos", de: "Chorizos" },
    "Mortadelas": { en: "Mortadellas", it: "Mortadella", pt: "Mortadelas", fr: "Mortadelles", de: "Mortadella" },
    "Pepperoni": { en: "Pepperoni", it: "Pepperoni", pt: "Pepperoni", fr: "Pepperoni", de: "Pepperoni" },
    "Salchichas": { en: "Sausages", it: "Salsicce", pt: "Salsichas", fr: "Saucisses", de: "Würstchen" }
  };
  return dict[text]?.[lang] || text;
};

export default function CatalogClient({ catalog, dbCategories, dbBrands = [] }: { catalog: any[], dbCategories?: any[], dbBrands?: any[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState<Language>("es");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Categorías dinámicas (en español de la base de datos)
  const dynamicCategories = ["Todos", ...Array.from(new Set([...(dbCategories?.map(c => c.name) || []), ...catalog.map(p => p.category)]))];
  const displayCategories = dynamicCategories.length > 1 ? dynamicCategories : defaultCategories;

  useEffect(() => {
    const savedLang = localStorage.getItem('montano_lang') as Language;
    if (savedLang && ['es', 'en', 'it', 'pt', 'fr', 'de'].includes(savedLang)) {
      setLang(savedLang);
    }
    setLoaded(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY > 20) setLangMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (l: Language) => {
    setLang(l);
    localStorage.setItem('montano_lang', l);
    setLangMenuOpen(false);
  };

  const normalize = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

  const t = translations[lang];

  const filteredProducts = catalog.filter(p => {
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    const prodNameTrans = translateProductData(p.name, lang);
    const matchSearch = normalize(prodNameTrans).includes(normalize(searchQuery)) || normalize(p.name).includes(normalize(searchQuery));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-foreground font-sans selection:bg-primary selection:text-white">
      
      {/* NAVEGACIÓN MODERNA */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border-b border-white/5" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-10' : 'h-14'}`}>
              <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-2xl" />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.home}</Link>
            <Link href="/productos" className="text-white font-bold transition-colors tracking-widest text-xs uppercase drop-shadow-md border-b-2 border-primary pb-1">{t.nav.catalog}</Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.about}</Link>
            <a href="/#contacto" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.contact}</a>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl py-2 px-1 flex flex-col gap-1 w-32 animate-in fade-in slide-in-from-top-2 z-50">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${lang === l ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                    >
                      {l} {lang === l && <Check className="w-3 h-3 ml-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link href="/" className="lg:hidden flex items-center gap-2 text-white hover:text-primary transition-colors group">
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/10">
              <ArrowLeft className="w-3 h-3" />
            </div>
          </Link>
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
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">{t.catalogPage.badge}</span>
            <div className="h-[1px] w-8 bg-primary"></div>
          </div>
          <h1 className="heading text-4xl sm:text-5xl md:text-8xl font-extrabold mb-6 tracking-tighter drop-shadow-2xl">
            {t.catalogPage.title} <span className="font-light italic text-white/80">{t.catalogPage.subtitle}</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {t.catalogPage.desc}
          </p>
        </div>
      </section>

      {/* BARRA DE FILTROS FLOTANTE */}
      <section className="relative z-30 bg-white border-b border-gray-200/50 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categorías (Píldoras Elegantes) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 flex-1 w-full">
            <Filter className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 hidden md:block" />
            {displayCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-[0_5px_15px_rgba(213,43,42,0.4)] transform md:scale-105' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-primary/50 hover:text-primary'
                }`}
              >
                {cat === "Todos" ? t.catalogPage.all : translateProductData(cat, lang)}
              </button>
            ))}
          </div>

          {/* Buscador Minimalista */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t.catalogPage.search}
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
            <h3 className="text-2xl font-bold text-black mb-2">{t.catalogPage.emptyTitle}</h3>
            <p className="text-gray-500 font-light">{t.catalogPage.emptyDesc}</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}} className="mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline">
              {t.catalogPage.clearBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {filteredProducts.map((prod, idx) => {
              const brandObj = dbBrands.find(b => b.name === prod.brand);
              return (
                <Link 
                  href={`/productos/${prod.id}`}
                  key={prod.id} 
                  className={`group cursor-pointer transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                <div className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 h-full flex flex-col relative">
                  
                  <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <span className="bg-white/95 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg text-black border border-gray-100">
                      {translateProductData(prod.category, lang)}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 pointer-events-none">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg leading-none">+</span>
                    </div>
                  </div>

                  <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-2xl overflow-hidden relative mb-5 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    {prod.image_url ? (
                      <img src={getOptimizedUrl(prod.image_url, 400)} alt={prod.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <span className="text-gray-300 font-extrabold text-lg tracking-widest z-10 transition-transform duration-500 group-hover:scale-110">[FOTO {prod.id}]</span>
                    )}
                  </div>

                  <div className="px-3 pb-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-primary text-[10px] font-extrabold tracking-[0.2em] uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {translateProductData(prod.tag, lang)}
                      </p>
                      {brandObj && brandObj.logo_url && (
                        <div className="h-8 w-20 flex items-center justify-end">
                          <img src={getOptimizedUrl(brandObj.logo_url, 200)} alt={brandObj.name} className="h-full w-full object-contain object-right drop-shadow-sm transition-transform group-hover:scale-105" loading="lazy" />
                        </div>
                      )}
                    </div>
                    <h3 className="heading font-bold text-xl text-black leading-tight group-hover:text-primary transition-colors">
                      {translateProductData(prod.name, lang)}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
          </div>
        )}
      </section>

      {/* FOOTER PREMIUM REUSABLE */}
      <Footer />
    </div>
  );
}
