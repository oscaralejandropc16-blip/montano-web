"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, ChevronDown, Check, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import { getOptimizedUrl } from "@/lib/optimizeUrl";
import { translations, Language } from "@/lib/translations";

const defaultCategories = ["Todos", "Jamones", "Ahumados", "Fiambres", "Especialidades"];

const translateProductData = (text: string, lang: Language) => {
  if (!text || lang === 'es') return text;
  
  // Exact matches for categories and common strings
  const dict: Record<string, Record<string, string>> = {
    "Jamones": { en: "Hams", it: "Prosciutti", pt: "Presuntos", fr: "Jambons", de: "Schinken" },
    "Ahumados": { en: "Smoked", it: "Affumicati", pt: "Defumados", fr: "Fumés", de: "Geräuchert" },
    "Fiambres": { en: "Cold Cuts", it: "Salumi", pt: "Frios", fr: "Charcuterie", de: "Aufschnitt" },
    "Especialidades": { en: "Specialties", it: "Specialità", pt: "Especialidades", fr: "Spécialités", de: "Spezialitäten" },
    "Chorizos": { en: "Chorizos", it: "Chorizo", pt: "Chouriços", fr: "Chorizos", de: "Chorizos" },
    "Mortadelas": { en: "Mortadellas", it: "Mortadella", pt: "Mortadelas", fr: "Mortadelles", de: "Mortadella" },
    "Pepperoni": { en: "Pepperoni", it: "Pepperoni", pt: "Pepperoni", fr: "Pepperoni", de: "Pepperoni" },
    "Salchichas": { en: "Sausages", it: "Salsicce", pt: "Salsichas", fr: "Saucisses", de: "Würstchen" },
    // Exact product names from DB
    "Chorizo Cocidos Parrillero Con Ajo Economico": {
      en: "Economy BBQ Garlic Cooked Chorizo",
      it: "Chorizo Cotto da Griglia all'Aglio Economico",
      pt: "Chouriço Cozido para Churrasco com Alho Econômico",
      fr: "Chorizo Cuit Barbecue à l'Ail Économique",
      de: "Economy Grill-Kochchorizo mit Knoblauch"
    },
    "Salchicha Cocida Tipo Polaca": {
      en: "Polish Style Cooked Sausage",
      it: "Salsiccia Cotta Stile Polacco",
      pt: "Salsicha Cozida Tipo Polonesa",
      fr: "Saucisse Cuite Style Polonais",
      de: "Gekochte Wurst nach Polnischer Art"
    },
    "Salchicha cocida de pollo": {
      en: "Cooked Chicken Sausage",
      it: "Salsiccia Cotta di Pollo",
      pt: "Salsicha Cozida de Frango",
      fr: "Saucisse Cuite de Poulet",
      de: "Gekochte Hähnchenwurst"
    },
    "Mortadela Especial de Pollo": {
      en: "Special Chicken Mortadella",
      it: "Mortadella Speciale di Pollo",
      pt: "Mortadela Especial de Frango",
      fr: "Mortadelle Spéciale de Poulet",
      de: "Spezielle Hähnchen-Mortadella"
    },
    "Jamón Ahumado Tipo Visking": {
      en: "Visking Style Smoked Ham",
      it: "Prosciutto Affumicato Stile Visking",
      pt: "Presunto Defumado Tipo Visking",
      fr: "Jambon Fumé Style Visking",
      de: "Geräucherter Schinken Visking Art"
    },
    "Jamón Cocido Superior": {
      en: "Superior Cooked Ham",
      it: "Prosciutto Cotto Superiore",
      pt: "Presunto Cozido Superior",
      fr: "Jambon Cuit Supérieur",
      de: "Superior Kochschinken"
    }
  };

  if (dict[text] && dict[text][lang]) return dict[text][lang];

  // Fallback: Keyword replacement for unknown products
  const keywords = [
    { es: /Chorizo/gi, en: "Chorizo", it: "Chorizo", pt: "Chouriço", fr: "Chorizo", de: "Chorizo" },
    { es: /Salchicha[s]?/gi, en: "Sausage", it: "Salsiccia", pt: "Salsicha", fr: "Saucisse", de: "Wurst" },
    { es: /Mortadela[s]?/gi, en: "Mortadella", it: "Mortadella", pt: "Mortadela", fr: "Mortadelle", de: "Mortadella" },
    { es: /Jam[oó]n Ahumado/gi, en: "Smoked Ham", it: "Prosciutto Affumicato", pt: "Presunto Defumado", fr: "Jambon Fumé", de: "Geräucherter Schinken" },
    { es: /Jam[oó]n Cocido/gi, en: "Cooked Ham", it: "Prosciutto Cotto", pt: "Presunto Cozido", fr: "Jambon Cuit", de: "Kochschinken" },
    { es: /Jam[oó]n/gi, en: "Ham", it: "Prosciutto", pt: "Presunto", fr: "Jambon", de: "Schinken" },
    { es: /Cocido[s]?|Cocida[s]?/gi, en: "Cooked", it: "Cotto", pt: "Cozido", fr: "Cuit", de: "Gekocht" },
    { es: /Parrillero[s]?/gi, en: "BBQ", it: "da Griglia", pt: "para Churrasco", fr: "pour Barbecue", de: "Grill" },
    { es: /Con Ajo/gi, en: "with Garlic", it: "all'Aglio", pt: "com Alho", fr: "à l'Ail", de: "mit Knoblauch" },
    { es: /Econ[oó]mico/gi, en: "Economy", it: "Economico", pt: "Econômico", fr: "Économique", de: "Economy" },
    { es: /Tipo Polaca/gi, en: "Polish Style", it: "Stile Polacco", pt: "Tipo Polonesa", fr: "Style Polonais", de: "Polnische Art" },
    { es: /de pollo|de Pollo/gi, en: "Chicken", it: "di Pollo", pt: "de Frango", fr: "de Poulet", de: "Hähnchen" },
    { es: /Especial/gi, en: "Special", it: "Speciale", pt: "Especial", fr: "Spécial", de: "Spezial" },
    { es: /Tipo Visking/gi, en: "Visking Style", it: "Stile Visking", pt: "Tipo Visking", fr: "Style Visking", de: "Visking Art" },
    { es: /Superior/gi, en: "Superior", it: "Superiore", pt: "Superior", fr: "Supérieur", de: "Superior" }
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-white">
      
      {/* NAVEGACIÓN MODERNA */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-10' : 'h-14'}`}>
              <img src="/api/logo" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-2xl" />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.home}</Link>
            <Link href="/productos" className="text-white font-bold transition-colors tracking-widest text-xs uppercase drop-shadow-md border-b-2 border-primary pb-1">{t.nav.catalog}</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.about}</Link>
            <a href="/#contacto" className="text-gray-400 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.contact}</a>
            
            {/* Language Selector */}
            <div className="relative border-l border-white/10 pl-6 ml-2">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-gray-400 hover:text-white flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors group"
              >
                <Globe className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                {t.nav.lang.split(" ")[1]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-4 bg-[#111] backdrop-blur-xl border border-white/5 rounded-2xl py-2 w-36 flex flex-col shadow-2xl animate-in fade-in slide-in-from-top-2 z-50">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-primary bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                      {translations[l].nav.lang}
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

      {/* HEADER DEL CATÁLOGO - ESTILO PREMIUM */}
      <section className="relative pt-48 pb-24 px-6 bg-black text-white text-center overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="absolute inset-0 z-0">
           <div className={`absolute inset-0 transition-transform duration-[20s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`} style={{ backgroundImage: "url('/placeholder-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 40%' }}></div>
           <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-100"></div>
        </div>
        
        <div className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs animate-pulse">{t.catalogPage.badge}</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <h1 className="heading text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-2xl">
            {t.catalogPage.title} <span className="font-light italic text-white/50">{t.catalogPage.subtitle}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
            {t.catalogPage.desc}
          </p>
          
          {settings.catalog_pdf_url && (
            <a 
              href={settings.catalog_pdf_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group"
            >
              <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Descargar Catálogo PDF
            </a>
          )}
        </div>
      </section>

      {/* BARRA DE FILTROS FLOTANTE GLASSMORPHISM */}
      <section className="sticky top-[72px] lg:top-[88px] z-30 transition-all duration-300">
        {/* Background that blurs the scrolling items below it */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border-b border-white/5"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Categorías (Píldoras Elegantes Dark) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 flex-1 w-full">
            <Filter className="w-4 h-4 text-primary mr-2 flex-shrink-0 hidden md:block" />
            {displayCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.4)] transform md:scale-105 border border-primary' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-primary/50 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat === "Todos" ? t.catalogPage.all : translateProductData(cat, lang)}
              </button>
            ))}
          </div>

          {/* Buscador Premium Dark */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors z-10" />
            <input 
              type="text" 
              placeholder={t.catalogPage.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-[#0A0A0A] border border-white/10 rounded-full py-3.5 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600 shadow-inner"
            />
          </div>

        </div>
      </section>

      {/* GRID DE PRODUCTOS PREMIUM SAAS */}
      <section className="py-24 px-6 max-w-7xl mx-auto min-h-[50vh] relative z-10">
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center">
            <div className="w-24 h-24 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{t.catalogPage.emptyTitle}</h3>
            <p className="text-gray-400 font-light text-lg mb-8">{t.catalogPage.emptyDesc}</p>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Todos");}} className="group relative overflow-hidden bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary">
              <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"></div>
              <span className="relative z-10">{t.catalogPage.clearBtn}</span>
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
                  className={`group/card cursor-pointer transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} relative h-[450px]`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {/* Glowing background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/10 rounded-[2rem] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative h-full w-full bg-[#0A0A0A] rounded-[2rem] p-4 border border-white/5 shadow-xl flex flex-col overflow-hidden transition-all duration-500 group-hover/card:border-white/20 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover/card:opacity-90 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Badge Category Flotante */}
                    <div className="absolute top-6 left-6 z-20 pointer-events-none">
                      <span className="bg-white/10 backdrop-blur-md text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white border border-white/10">
                        {translateProductData(prod.category, lang)}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 z-20 opacity-0 group-hover/card:opacity-100 transition-all duration-500 transform scale-50 group-hover/card:scale-100 pointer-events-none">
                      <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        <ArrowLeft className="w-4 h-4 rotate-135" />
                      </div>
                    </div>

                    {/* Contenedor Imagen */}
                    <div className="w-full h-3/5 relative mb-4 flex items-center justify-center z-0 mt-4">
                      {/* Inner glow under image */}
                      <div className="absolute inset-0 bg-white/5 rounded-full blur-[40px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                      
                      {prod.image_url ? (
                        <img src={getOptimizedUrl(prod.image_url, 400)} alt={prod.name} className="w-full h-full object-contain transition-all duration-[800ms] group-hover/card:scale-110 group-hover/card:-translate-y-2 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" loading="lazy" />
                      ) : (
                        <span className="text-gray-600 font-extrabold text-xs tracking-widest uppercase z-10">Sin Imagen</span>
                      )}
                    </div>

                    {/* Info Product */}
                    <div className="relative z-20 mt-auto flex-1 flex flex-col justify-end pb-2 px-2">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-primary text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 bg-primary/10 px-2 py-1 rounded border border-primary/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                          {translateProductData(prod.tag, lang)}
                        </p>
                        {brandObj && brandObj.logo_url && (
                          <div className="h-6 w-16 flex items-center justify-end opacity-70 group-hover/card:opacity-100 transition-opacity">
                            <img src={getOptimizedUrl(brandObj.logo_url, 200)} alt={brandObj.name} className="h-full w-full object-contain object-right drop-shadow-md" loading="lazy" />
                          </div>
                        )}
                      </div>
                      <h3 className="heading font-bold text-xl text-white leading-tight tracking-tight group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-gray-400 transition-all duration-300">
                        {translateProductData(prod.name, lang)}
                      </h3>
                      
                      {/* Animated Line */}
                      <div className="w-8 h-[2px] bg-white/20 mt-4 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-primary group-hover/card:w-full transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER PREMIUM REUSABLE */}
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
  );
}
