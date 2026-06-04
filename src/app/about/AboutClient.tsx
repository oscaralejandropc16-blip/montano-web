"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Globe, ChevronDown, Check } from "lucide-react";
import Footer from "@/components/Footer";
import { translations, Language } from "@/lib/translations";

function AnimatedCounter({ end, prefix = "", suffix = "", duration = 2000 }: { end: number, prefix?: string, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * end));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function AboutClient({ settings }: { settings: Record<string, string> }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState<Language>("es");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

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

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white text-foreground overflow-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-lg py-3 shadow-lg border-b border-white/5" : "bg-black/50 backdrop-blur-sm py-4"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-10' : 'h-14'}`}>
              <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-2xl" />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.home}</Link>
            <Link href="/productos" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.catalog}</Link>
            <Link href="/about" className="text-white font-bold transition-colors tracking-widest text-xs uppercase drop-shadow-md border-b-2 border-primary pb-1">{t.nav.about}</Link>
            <a href="/#contacto" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.contact}</a>
            
            {/* Language Selector */}
            <div className="relative border-l border-white/10 pl-6 ml-2">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-white/90 hover:text-white flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors group"
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
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">{t.aboutPage.back}</span>
          </Link>
        </div>
      </nav>

      <main>
        {/* HERO HEADER ACERCA DE */}
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-black/60 z-10"></div>
             {/* Imagen de fondo dinámica para la cabecera */}
             <div 
                className="absolute inset-0 flex items-center justify-center text-white/10" 
                style={{ 
                  backgroundImage: `url('${settings.about_hero_img || "/placeholder-hero.jpg"}')`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center 30%' 
                }}>
             </div>
          </div>

          <div className={`relative z-20 px-6 max-w-4xl mx-auto flex flex-col items-center mt-10 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="heading font-extrabold text-5xl md:text-6xl text-white mb-4 tracking-tighter drop-shadow-2xl">
              {t.aboutPage.heroTitle}
            </h1>
            <div className="w-24 h-1 bg-primary rounded-full mb-6"></div>
            <p className="text-xl text-white/80 font-light tracking-wide">
              {t.aboutPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Columna Izquierda: Imagen */}
            <div className={`w-full lg:w-5/12 transition-all duration-1000 delay-300 transform ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="relative group">
                {/* Elemento decorativo detrás */}
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 z-0"></div>
                
                {/* Contenedor de la Imagen */}
                <div className="relative z-10 w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center text-gray-400 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  {settings.about_page_img ? (
                    <img src={settings.about_page_img} alt="Plato de Embutidos" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-lg">[Imagen: Plato de Embutidos]</span>
                  )}
                  
                  {/* Etiqueta flotante */}
                  <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-lg shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-black font-bold text-sm tracking-widest uppercase">{t.aboutPage.tag}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Textos */}
            <div className={`w-full lg:w-7/12 transition-all duration-1000 delay-500 transform ${loaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              
              <div className="mb-10 relative inline-block">
                <h2 className="heading text-4xl md:text-5xl font-extrabold text-black mb-2 relative z-10">
                  {t.aboutPage.title1} <br/><span className="text-primary">{t.aboutPage.title2}</span>
                </h2>
                {/* Subrayado elegante rojo estilo pincelada/marcador */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 z-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                <p>
                  {t.aboutPage.p1.split("Montano Antilia C.A.")[0]}<strong className="text-black font-semibold">Montano Antilia C.A.</strong>{t.aboutPage.p1.split("Montano Antilia C.A.")[1] || t.aboutPage.p1}
                </p>
                <p>
                  {t.aboutPage.p2}
                </p>
                <p>
                  {t.aboutPage.p3}
                </p>
              </div>

              {/* Lista de Valores (Agregado Moderno) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-black">{t.aboutPage.val1}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-black">{t.aboutPage.val2}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-black">{t.aboutPage.val3}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-black">{t.aboutPage.val4}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE ESTADÍSTICAS / HITOS */}
        <section className="py-16 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform -translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(213,43,42,0.8)] mb-2">
                  <AnimatedCounter end={30} prefix="+" />
                </span>
                <span className="text-sm tracking-widest uppercase text-white/70">{t.aboutPage.stat1}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(213,43,42,0.8)] mb-2">
                  <AnimatedCounter end={100} suffix="%" />
                </span>
                <span className="text-sm tracking-widest uppercase text-white/70">{t.aboutPage.stat2}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(213,43,42,0.8)] mb-2">
                  <AnimatedCounter end={50} prefix="+" />
                </span>
                <span className="text-sm tracking-widest uppercase text-white/70">{t.aboutPage.stat3}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(213,43,42,0.8)] mb-2">
                  <AnimatedCounter end={1} />
                </span>
                <span className="text-sm tracking-widest uppercase text-white/70">{t.aboutPage.stat4}</span>
              </div>
            </div>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Tarjeta Misión */}
            <div className="bg-gray-50 p-10 md:p-14 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <h3 className="heading text-3xl font-bold text-black mb-6 flex items-center gap-4">
                  <span className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full text-xl shadow-lg">M</span>
                  {t.aboutPage.missionTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {t.aboutPage.missionDesc}
                </p>
              </div>
            </div>
            
            {/* Tarjeta Visión */}
            <div className="bg-white p-10 md:p-14 rounded-2xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-shadow group relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-tr-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <h3 className="heading text-3xl font-bold text-black mb-6 flex items-center gap-4">
                  <span className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full text-xl shadow-lg">V</span>
                  {t.aboutPage.visionTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {t.aboutPage.visionDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION (CTA) FINAL */}
        <section className="py-20 px-6 bg-gray-100/50 border-t border-gray-100 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading text-4xl font-extrabold text-black mb-6">{t.aboutPage.ctaTitle}</h2>
            <p className="text-gray-600 mb-10 text-lg font-light">
              {t.aboutPage.ctaDesc}
            </p>
            <Link href="/productos" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded text-sm font-bold tracking-[0.2em] hover:bg-red-700 transition-all shadow-lg shadow-primary/30 uppercase hover:-translate-y-1">
              {t.aboutPage.ctaBtn}
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER MODERNIZADO */}
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
