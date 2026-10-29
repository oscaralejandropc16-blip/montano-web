"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, ChevronDown, Globe, Ghost } from "lucide-react";
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
    <div className="min-h-screen bg-[#08040f] text-[#F8FAFC] font-sans selection:bg-orange-500 selection:text-black">
      
      {/* NAVEGACIÓN HALLOWEEN */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-[#10061f]/90 backdrop-blur-xl py-3 shadow-2xl border-b border-orange-500/30" : "bg-black/40 backdrop-blur-md py-5 border-b border-purple-950/40"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-9' : 'h-11'}`}>
              <img src="/api/logo" alt="Montano Antilia Logo" className="h-full w-auto object-contain brightness-110 drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]" />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="transition-colors font-bold tracking-widest text-xs uppercase text-slate-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">{t.nav.home}</Link>
            <Link href="/productos" className="font-extrabold transition-colors tracking-widest text-xs uppercase border-b-2 border-orange-500 pb-1 text-orange-400 drop-shadow-[0_0_8px_rgba(255,106,0,0.6)]">{t.nav.catalog}</Link>
            <Link href="/about" className="transition-colors font-bold tracking-widest text-xs uppercase text-slate-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">{t.nav.about}</Link>
            <a href="/#contacto" className="transition-colors font-bold tracking-widest text-xs uppercase text-slate-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">{t.nav.contact}</a>
            
            {/* Selector de Idioma */}
            <div className="relative border-l border-orange-500/30 pl-6 ml-2">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors group text-orange-400 hover:text-orange-300"
              >
                <Globe className="w-3.5 h-3.5 text-orange-500 group-hover:animate-pulse" />
                {t.nav.lang.split(" ")[1]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-4 bg-[#160a26] backdrop-blur-xl border border-orange-500/30 rounded-2xl py-2 w-36 flex flex-col shadow-2xl animate-fade-in-up z-50">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-orange-400 font-bold bg-orange-950/40' : 'text-slate-300 hover:text-orange-400 hover:bg-orange-950/20'}`}
                    >
                      {translations[l].nav.lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link href="/" className="lg:hidden flex items-center gap-2 text-orange-400 group">
            <div className="p-2 rounded-full border bg-[#180c2c] border-orange-500/30">
              <ArrowLeft className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </nav>

      {/* HEADER DEL CATÁLOGO - BANNER HALLOWEEN */}
      <section className="relative pt-48 pb-24 px-6 bg-[#07030c] text-white text-center overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Imagen de fondo gourmet con overlay oscuro */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#08040f] via-black/70 to-black/90 z-10"></div>
          <div 
            className="w-full h-full object-cover scale-105 opacity-40 bg-center bg-cover filter contrast-125"
            style={{ backgroundImage: `url('${settings.about_hero_img || "/placeholder-hero.jpg"}')` }}
          ></div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/20 rounded-full blur-[140px] pointer-events-none z-10"></div>
        
        <div className={`relative z-20 max-w-4xl mx-auto transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-3 bg-[#180c2c]/90 backdrop-blur-md border border-orange-500/40 text-orange-300 px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(255,106,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            <span>CATÁLOGO DE ULTRATUMBA</span>
          </div>
          
          <h1 className="heading text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
            {t.catalogPage.title} <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">{t.catalogPage.subtitle}</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
            {t.catalogPage.desc} Hechizos de sabor y charcutería fina elaborados con maestría para conquistar tu mesa.
          </p>
          
          {settings.catalog_pdf_url && (
            <a 
              href={settings.catalog_pdf_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-black hover:shadow-[0_0_30px_rgba(255,106,0,0.6)] px-9 py-4 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-xl group"
            >
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span>Descargar Catálogo PDF</span>
            </a>
          )}
        </div>
      </section>

      {/* BARRA DE FILTROS Y BÚSQUEDA HALLOWEEN */}
      <section className="relative z-30 transition-all duration-300 py-6 bg-[#0c0516] border-b border-purple-950/60 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Categorías */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 flex-1 w-full">
            <Filter className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0 hidden md:block" />
            {displayCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-extrabold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-black shadow-[0_0_20px_rgba(255,106,0,0.4)] border border-orange-400' 
                    : 'bg-[#180c2c] text-slate-300 border border-purple-900/50 hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-950/20'
                }`}
              >
                {cat === "Todos" ? t.catalogPage.all : translateProductData(cat, lang)}
              </button>
            ))}
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400/70 group-focus-within:text-orange-400 transition-colors z-10" />
            <input 
              type="text" 
              placeholder={t.catalogPage.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-[#150826] border border-purple-900/60 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:bg-[#1a0c2e] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-500"
            />
          </div>

        </div>
      </section>

      {/* GRID DE PRODUCTOS HALLOWEEN */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-[50vh]">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center">
            <div className="w-20 h-20 bg-[#160a26] rounded-full border border-orange-500/30 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(255,106,0,0.2)]">
              <Ghost className="w-9 h-9 text-orange-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">{t.catalogPage.emptyTitle}</h3>
            <p className="text-slate-400 font-normal text-base mb-6">{t.catalogPage.emptyDesc}</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}} className="bg-gradient-to-r from-orange-600 to-amber-500 text-black px-8 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all hover:shadow-[0_0_20px_rgba(255,106,0,0.5)]">
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
                  className={`group/card cursor-pointer transition-all duration-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative h-[450px]`}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                >
                  <div className="relative h-full w-full bg-gradient-to-b from-[#180c2c] to-[#10061e] rounded-[2rem] p-5 border border-purple-900/40 shadow-xl flex flex-col overflow-hidden transition-all duration-300 group-hover/card:border-orange-500/70 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_0_30px_rgba(255,106,0,0.3)]">
                    
                    {/* Badge Categoría */}
                    <div className="absolute top-5 left-5 z-20">
                      <span className="bg-orange-600 text-black text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(255,106,0,0.4)]">
                        {translateProductData(prod.category, lang)}
                      </span>
                    </div>

                    {/* Contenedor Imagen */}
                    <div className="w-full h-[58%] relative mb-2 flex items-center justify-center z-0 bg-[#21103a] rounded-2xl p-4 mt-8 border border-purple-950/60 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.15)_0%,transparent_70%)] pointer-events-none"></div>
                      {prod.image_url ? (
                        <img src={getOptimizedUrl(prod.image_url, 400)} alt={prod.name} className="w-full h-full object-contain transition-all duration-500 group-hover/card:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]" loading="lazy" />
                      ) : (
                        <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">Especial Halloween</span>
                      )}
                    </div>

                    {/* Info Producto */}
                    <div className="relative z-20 mt-auto flex-1 flex flex-col justify-between pt-2">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-orange-400 text-[9px] font-bold tracking-[0.2em] uppercase bg-orange-950/50 px-2 py-0.5 rounded border border-orange-500/30">
                            {translateProductData(prod.tag, lang)}
                          </p>
                          {brandObj && brandObj.logo_url && (
                            <div className="h-5 w-14 flex items-center justify-end opacity-80 brightness-110">
                              <img src={getOptimizedUrl(brandObj.logo_url, 200)} alt={brandObj.name} className="h-full w-full object-contain object-right" loading="lazy" />
                            </div>
                          )}
                        </div>
                        <h3 className="heading font-bold text-lg text-white leading-snug group-hover/card:text-orange-400 transition-colors">
                          {translateProductData(prod.name, lang)}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-purple-950/60 mt-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover/card:text-orange-400 transition-colors">Ver detalle</span>
                        <div className="w-8 h-8 rounded-full bg-[#180c2c] text-orange-400 border border-orange-500/30 flex items-center justify-center group-hover/card:bg-orange-500 group-hover/card:text-black transition-colors">
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
      <div className="border-t border-purple-950/60 bg-[#06020a]">
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

