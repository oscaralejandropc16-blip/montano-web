"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Globe, ChevronDown } from "lucide-react";
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
    <div className="min-h-screen bg-[#08040f] text-[#F8FAFC] font-sans overflow-hidden selection:bg-orange-500 selection:text-black">
      
      {/* NAVEGACIÓN HALLOWEEN */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-[#10061f]/90 backdrop-blur-xl py-3 shadow-2xl border-b border-orange-500/30" : "bg-black/40 backdrop-blur-md py-5 border-b border-purple-950/40"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-9' : 'h-11'}`}>
              <img src="/api/logo" alt="Montano Antilia Logo" className="h-full w-auto object-contain brightness-110 drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]" />
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="transition-colors font-bold tracking-widest text-xs uppercase text-slate-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">{t.nav.home}</Link>
            <Link href="/productos" className="transition-colors font-bold tracking-widest text-xs uppercase text-slate-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]">{t.nav.catalog}</Link>
            <Link href="/about" className="font-extrabold transition-colors tracking-widest text-xs uppercase border-b-2 border-orange-500 pb-1 text-orange-400 drop-shadow-[0_0_8px_rgba(255,106,0,0.6)]">{t.nav.about}</Link>
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
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">{t.aboutPage.back}</span>
          </Link>
        </div>
      </nav>

      <main>
        {/* HERO HEADER ACERCA DE - BANNER HALLOWEEN */}
        <section className="relative pt-44 pb-20 px-6 bg-[#07030c] text-white text-center overflow-hidden flex items-center justify-center min-h-[45vh]">
          {/* Imagen de fondo con overlay elegante */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#08040f] via-black/70 to-black/90 z-10"></div>
            <div 
              className="w-full h-full object-cover scale-105 opacity-40 bg-center bg-cover filter contrast-125"
              style={{ backgroundImage: `url('${settings.about_hero_img || "/placeholder-hero.jpg"}')` }}
            ></div>
          </div>

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/20 rounded-full blur-[140px] pointer-events-none z-10"></div>

          <div className={`relative z-20 px-6 max-w-4xl mx-auto flex flex-col items-center transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 bg-[#180c2c]/90 backdrop-blur-md border border-orange-500/40 text-orange-300 px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-[0_0_20px_rgba(255,106,0,0.3)]">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              <span>HISTORIA DE LEYENDA</span>
            </div>
            <h1 className="heading font-extrabold text-5xl md:text-7xl text-white mb-6 tracking-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              {t.aboutPage.heroTitle}
            </h1>
            <p className="text-xl text-slate-300 font-normal max-w-2xl drop-shadow-md">
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
                <div className="relative z-10 w-full aspect-[4/5] bg-[#140824] rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center text-orange-400 group-hover:shadow-[0_0_35px_rgba(255,106,0,0.3)] transition-all duration-500">
                  {settings.about_page_img ? (
                    <img src={settings.about_page_img} alt="Plato de Embutidos" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110" />
                  ) : (
                    <span className="font-bold text-lg text-orange-400/80">Tradición Montano Antilia</span>
                  )}
                  
                  <div className="absolute bottom-6 left-6 z-20 bg-[#160a26]/95 backdrop-blur-md px-6 py-3 rounded-2xl border border-orange-500/40 shadow-lg">
                    <p className="text-orange-400 font-bold text-xs tracking-widest uppercase">
                      {t.aboutPage.tag}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Textos */}
            <div className={`w-full lg:w-7/12 transition-all duration-1000 delay-500 transform ${loaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              
              <div className="mb-8">
                <h2 className="heading text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                  {t.aboutPage.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">{t.aboutPage.title2}</span>
                </h2>
              </div>

              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-normal">
                <p>
                  {t.aboutPage.p1.split("Montano Antilia C.A.")[0]}<strong className="text-orange-400 font-bold">Montano Antilia C.A.</strong>{t.aboutPage.p1.split("Montano Antilia C.A.")[1] || t.aboutPage.p1}
                </p>
                <p>
                  {t.aboutPage.p2}
                </p>
                <p>
                  {t.aboutPage.p3}
                </p>
              </div>

              {/* Lista de Valores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="flex items-center gap-3 bg-[#150926] p-4.5 rounded-2xl border border-purple-900/50 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-bold text-white text-sm">{t.aboutPage.val1}</span>
                </div>
                <div className="flex items-center gap-3 bg-[#150926] p-4.5 rounded-2xl border border-purple-900/50 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-bold text-white text-sm">{t.aboutPage.val2}</span>
                </div>
                <div className="flex items-center gap-3 bg-[#150926] p-4.5 rounded-2xl border border-purple-900/50 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-bold text-white text-sm">{t.aboutPage.val3}</span>
                </div>
                <div className="flex items-center gap-3 bg-[#150926] p-4.5 rounded-2xl border border-purple-900/50 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <span className="font-bold text-white text-sm">{t.aboutPage.val4}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE ESTADÍSTICAS HALLOWEEN */}
        <section className="py-16 bg-[#0c0516] text-white relative overflow-hidden border-y border-purple-950/60">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-purple-900/40">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-orange-400 mb-2 drop-shadow-[0_0_12px_rgba(255,106,0,0.6)]">
                  <AnimatedCounter end={30} prefix="+" />
                </span>
                <span className="text-xs tracking-widest uppercase text-slate-400 font-bold">{t.aboutPage.stat1}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-orange-400 mb-2 drop-shadow-[0_0_12px_rgba(255,106,0,0.6)]">
                  <AnimatedCounter end={100} suffix="%" />
                </span>
                <span className="text-xs tracking-widest uppercase text-slate-400 font-bold">{t.aboutPage.stat2}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-orange-400 mb-2 drop-shadow-[0_0_12px_rgba(255,106,0,0.6)]">
                  <AnimatedCounter end={50} prefix="+" />
                </span>
                <span className="text-xs tracking-widest uppercase text-slate-400 font-bold">{t.aboutPage.stat3}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-orange-400 mb-2 drop-shadow-[0_0_12px_rgba(255,106,0,0.6)]">
                  <AnimatedCounter end={1} />
                </span>
                <span className="text-xs tracking-widest uppercase text-slate-400 font-bold">{t.aboutPage.stat4}</span>
              </div>
            </div>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN HALLOWEEN */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Tarjeta Misión */}
            <div className="bg-gradient-to-b from-[#180c2c] to-[#10061e] p-10 md:p-12 rounded-[2.5rem] border border-orange-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(255,106,0,0.2)] transition-shadow relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="heading text-3xl font-extrabold text-white mb-6 flex items-center gap-4">
                  <span className="bg-gradient-to-r from-orange-600 to-amber-600 text-black w-12 h-12 flex items-center justify-center rounded-2xl text-xl font-black shadow-lg">M</span>
                  {t.aboutPage.missionTitle}
                </h3>
                <p className="text-slate-300 leading-relaxed font-normal text-base md:text-lg">
                  {t.aboutPage.missionDesc}
                </p>
              </div>
            </div>
            
            {/* Tarjeta Visión */}
            <div className="bg-gradient-to-b from-[#180c2c] to-[#10061e] p-10 md:p-12 rounded-[2.5rem] border border-purple-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-shadow relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="heading text-3xl font-extrabold text-white mb-6 flex items-center gap-4">
                  <span className="bg-[#10051e] border border-purple-500/50 text-purple-300 w-12 h-12 flex items-center justify-center rounded-2xl text-xl font-black shadow-lg">V</span>
                  {t.aboutPage.visionTitle}
                </h3>
                <p className="text-slate-300 leading-relaxed font-normal text-base md:text-lg">
                  {t.aboutPage.visionDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION (CTA) FINAL */}
        <section className="py-20 px-6 bg-[#0a0414] border-t border-purple-950/60 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading text-4xl font-extrabold text-white mb-6 flex items-center justify-center gap-3">
              <span>{t.aboutPage.ctaTitle}</span>
            </h2>
            <p className="text-slate-300 mb-10 text-lg font-normal">
              {t.aboutPage.ctaDesc}
            </p>
            <Link href="/productos" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-black px-10 py-4.5 rounded-full text-xs font-black tracking-[0.2em] shadow-[0_0_25px_rgba(255,106,0,0.5)] hover:shadow-[0_0_40px_rgba(255,106,0,0.8)] transition-all uppercase hover:-translate-y-1">
              <span>{t.aboutPage.ctaBtn}</span>
            </Link>
          </div>
        </section>
      </main>

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

