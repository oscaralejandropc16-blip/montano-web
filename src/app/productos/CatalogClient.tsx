"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, ChevronDown, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import { getOptimizedUrl } from "@/lib/optimizeUrl";
import { translations, Language } from "@/lib/translations";

const defaultCategories = ["Todos", "Jamones", "Ahumados", "Fiambres", "Especialidades"];

const translateProductData = (text: string, lang: Language) => {
  if (!text || lang === 'es') return text;
  
  const dict: Record<string, Record<string, string>> = {
    "Jamones": { en: "Hams", it: "Prosciutti", pt: "Presuntos", fr: "Jambons", de: "Schinken" },
    "Ahumados": { en: "Smoked", it: "Affumicati", pt: "Defumados", fr: "Fumés", de: "Geräuchert" },
    "Fiambres": { en: "Cold Cuts", it: "Salumi", pt: "Frios", fr: "Charcuterie", de: "Aufschnitt" },
    "Especialidades": { en: "Specialties", it: "Specialità", pt: "Especialidades", fr: "Spécialités", de: "Spezialitäten" },
    "Chorizos": { en: "Chorizos", it: "Chorizo", pt: "Chouriços", fr: "Chorizos", de: "Chorizos" },
    "Mortadelas": { en: "Mortadellas", it: "Mortadella", pt: "Mortadelas", fr: "Mortadelles", de: "Mortadella" },
    "Pepperoni": { en: "Pepperoni", it: "Pepperoni", pt: "Pepperoni", fr: "Pepperoni", de: "Pepperoni" },
    "Salchichas": { en: "Sausages", it: "Salsicce", pt: "Salsichas", fr: "Saucisses", de: "Würstchen" },
  };

  if (dict[text] && dict[text][lang]) return dict[text][lang];

  const keywords = [
    { es: /Chorizo/gi, en: "Chorizo", it: "Chorizo", pt: "Chouriço", fr: "Chorizo", de: "Chorizo" },
    { es: /Salchicha[s]?/gi, en: "Sausage", it: "Salsiccia", pt: "Salsicha", fr: "Saucisse", de: "Wurst" },
    { es: /Mortadela[s]?/gi, en: "Mortadella", it: "Mortadella", pt: "Mortadela", fr: "Mortadelle", de: "Mortadella" },
    { es: /Jam[oó]n Ahumado/gi, en: "Smoked Ham", it: "Prosciutto Affumicato", pt: "Presunto Defumado", fr: "Jambon Fumé", de: "Geräucherter Schinken" },
    { es: /Jam[oó]n Cocido/gi, en: "Cooked Ham", it: "Prosciutto Cotto", pt: "Presunto Cozido", fr: "Jambon Cuit", de: "Kochschinken" },
    { es: /Jam[oó]n/gi, en: "Ham", it: "Prosciutto", pt: "Presunto", fr: "Jambon", de: "Schinken" },
    { es: /Cocido[s]?|Cocida[s]?/gi, en: "Cooked", it: "Cotto", pt: "Cozido", fr: "Cuit", de: "Gekocht" },
    { es: /Parrillero[s]?/gi, en: "BBQ", it: "da Griglia", pt: "para Churrasco", fr: "pour Barbecue", de: "Grill" },
  ];

  let translated = text;
  for (const kw of keywords) {
    translated = translated.replace(kw.es, kw[lang]);
  }
  return translated;
};

export default function CatalogClient({ catalog, dbCategories, dbBrands = [], settings = {} }: { catalog: any[], dbCategories?: any[], dbBrands?: any[], settings?: Record<string, string> }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState<Language>("es");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

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
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'montano_lang' && e.newValue) {
        setLang(e.newValue as Language);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
    };
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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-primary selection:text-white">
      
      {/* NAVEGACIÓN MODERNA */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-xl py-3 shadow-md border-b border-slate-200/80" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-9' : 'h-11'}`}>
              <img src="/api/logo" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-md" />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`transition-colors font-bold tracking-widest text-xs uppercase ${isScrolled ? 'text-slate-700 hover:text-primary' : 'text-white/90 hover:text-white drop-shadow-md'}`}>{t.nav.home}</Link>
            <Link href="/productos" className={`font-extrabold transition-colors tracking-widest text-xs uppercase border-b-2 border-primary pb-1 ${isScrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}>{t.nav.catalog}</Link>
            <Link href="/about" className={`transition-colors font-bold tracking-widest text-xs uppercase ${isScrolled ? 'text-slate-700 hover:text-primary' : 'text-white/90 hover:text-white drop-shadow-md'}`}>{t.nav.about}</Link>
            <a href="/#contacto" className={`transition-colors font-bold tracking-widest text-xs uppercase ${isScrolled ? 'text-slate-700 hover:text-primary' : 'text-white/90 hover:text-white drop-shadow-md'}`}>{t.nav.contact}</a>
            
            {/* Selector de Idioma */}
            <div className={`relative border-l pl-6 ml-2 ${isScrolled ? 'border-slate-200' : 'border-white/20'}`}>
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors group ${isScrolled ? 'text-slate-800 hover:text-primary' : 'text-white hover:text-white drop-shadow-md'}`}
              >
                <Globe className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                {t.nav.lang.split(" ")[1]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-4 bg-white backdrop-blur-xl border border-slate-200 rounded-2xl py-2 w-36 flex flex-col shadow-xl animate-fade-in-up z-50">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-primary font-bold bg-slate-50' : 'text-slate-600 hover:text-primary hover:bg-slate-50'}`}
                    >
                      {translations[l].nav.lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link href="/" className={`lg:hidden flex items-center gap-2 transition-colors group ${isScrolled ? 'text-slate-800 hover:text-primary' : 'text-white hover:text-primary'}`}>
            <div className={`p-2 rounded-full border ${isScrolled ? 'bg-slate-100 border-slate-200' : 'bg-white/10 border-white/20'}`}>
              <ArrowLeft className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </nav>

      {/* HEADER DEL CATÁLOGO - BANNER ÉPICO Y REFINADO */}
      <section className="relative pt-48 pb-24 px-6 bg-slate-950 text-white text-center overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Imagen de fondo gourmet con overlay oscuro */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-black/60 to-black/80 z-10"></div>
          <div 
            className="w-full h-full object-cover scale-105 opacity-60 bg-center bg-cover"
            style={{ backgroundImage: `url('${settings.about_hero_img || "/placeholder-hero.jpg"}')` }}
          ></div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/25 rounded-full blur-[140px] pointer-events-none z-10"></div>
        
        <div className={`relative z-20 max-w-4xl mx-auto transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {t.catalogPage.badge}
          </div>
          
          <h1 className="heading text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-2xl">
            {t.catalogPage.title} <span className="font-light italic text-white/70">{t.catalogPage.subtitle}</span>
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
            {t.catalogPage.desc}
          </p>
          
          {settings.catalog_pdf_url && (
            <a 
              href={settings.catalog_pdf_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white hover:bg-red-700 px-9 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-xl shadow-primary/30 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Descargar Catálogo PDF
            </a>
          )}
        </div>
      </section>

      {/* BARRA DE FILTROS Y BÚSQUEDA */}
      <section className="relative z-30 transition-all duration-300 py-6 bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categorías */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 flex-1 w-full">
            <Filter className="w-4 h-4 text-primary mr-2 flex-shrink-0 hidden md:block" />
            {displayCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-md shadow-primary/20 border border-primary' 
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-primary/50 hover:text-primary hover:bg-slate-100'
                }`}
              >
                {cat === "Todos" ? t.catalogPage.all : translateProductData(cat, lang)}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
            <input 
              type="text" 
              placeholder={t.catalogPage.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-12 pr-6 text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
            />
          </div>

        </div>
      </section>

      {/* GRID DE PRODUCTOS */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-[50vh]">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">{t.catalogPage.emptyTitle}</h3>
            <p className="text-slate-500 font-normal text-base mb-6">{t.catalogPage.emptyDesc}</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}} className="bg-primary text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all hover:bg-red-700 shadow-md">
              {t.catalogPage.clearBtn}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((prod, idx) => {
              const brandObj = dbBrands.find(b => b.name === prod.brand);
              return (
                <Link 
                  href={`/productos/${prod.id}`}
                  key={prod.id} 
                  className={`group/card cursor-pointer transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative h-[440px]`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <div className="relative h-full w-full bg-white rounded-[2rem] p-5 border border-slate-200/80 shadow-sm flex flex-col overflow-hidden transition-all duration-300 group-hover/card:border-primary/30 group-hover/card:-translate-y-2 group-hover/card:shadow-xl">
                    
                    {/* Badge Categoría */}
                    <div className="absolute top-5 left-5 z-20">
                      <span className="bg-slate-900 text-white text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm">
                        {translateProductData(prod.category, lang)}
                      </span>
                    </div>

                    {/* Contenedor Imagen */}
                    <div className="w-full h-[58%] relative mb-2 flex items-center justify-center z-0 bg-slate-50/80 rounded-2xl p-4 mt-8 border border-slate-100">
                      {prod.image_url ? (
                        <img src={getOptimizedUrl(prod.image_url, 400)} alt={prod.name} className="w-full h-full object-contain transition-all duration-500 group-hover/card:scale-105" loading="lazy" />
                      ) : (
                        <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">Sin Imagen</span>
                      )}
                    </div>

                    {/* Info Producto */}
                    <div className="relative z-20 mt-auto flex-1 flex flex-col justify-between pt-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-primary text-[9px] font-bold tracking-[0.2em] uppercase bg-red-50 px-2 py-0.5 rounded border border-red-100">
                            {translateProductData(prod.tag, lang)}
                          </p>
                          {brandObj && brandObj.logo_url && (
                            <div className="h-5 w-14 flex items-center justify-end opacity-80">
                              <img src={getOptimizedUrl(brandObj.logo_url, 200)} alt={brandObj.name} className="h-full w-full object-contain object-right" loading="lazy" />
                            </div>
                          )}
                        </div>
                        <h3 className="heading font-bold text-lg text-slate-900 leading-snug group-hover/card:text-primary transition-colors">
                          {translateProductData(prod.name, lang)}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover/card:text-primary transition-colors">Ver detalle</span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-colors">
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <div className="border-t border-slate-200 bg-white">
        <Footer texts={{
          aboutText: t.about.text1 + t.about.text2 + t.about.text3 + t.about.text4 + t.about.text5,
          quickLinksTitle: t.footer.quickLinks,
          contactTitle: t.footer.contactTitle,
          nav: t.nav,
          footer: t.footer.copy,
          newsletterTitle: t.footer.newsletterTitle,
          newsletterDesc: t.footer.newsletterDesc,
          emailPlaceholder: t.footer.emailPlaceholder,
          subscribeBtn: t.footer.subscribeBtn
        }} />
      </div>
    </div>
  );
}
