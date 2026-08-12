"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, ChevronDown, Check, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import { getOptimizedUrl } from "@/lib/optimizeUrl";
import { saveContactMessage, registerVisit } from "@/lib/actions";
import { translations, Language } from "@/lib/translations";

// --- DATOS DE CONTACTO ---
const contactInfo = {
  whatsappRaw: "584243249097",
  whatsappDisplay: "+58 424-3249097",
  email: "admonmontanoantilia@gmail.com",
  mapAddress: "314 Av. Bolívar, Oeste 2103, Carabobo",
  mapLink: "https://maps.app.goo.gl/rc7EWhCkYtGJkcB9A",
  instagram: "https://www.instagram.com/montanoantilia.ca/",
  tiktok: "https://www.tiktok.com/@montanoantilia.ca"
};

export default function HomeClient({ settings, featuredProducts = [] }: { settings: Record<string, string>, featuredProducts?: any[] }) {
  const heroVideoUrl = settings.hero_video_url || "/hero-video.mp4";
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("es");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Estado para el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado para el formulario de contacto
  const [contactForm, setContactForm] = useState({ name: '', email: '', whatsapp: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLanguageChange = (l: Language) => {
    setLang(l);
    localStorage.setItem('montano_lang', l);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('montano_lang') as Language;
    if (savedLang && ['es', 'en', 'it', 'pt', 'fr', 'de'].includes(savedLang)) {
      setLang(savedLang);
    }
    setLoaded(true);

    if (!sessionStorage.getItem('has_visited')) {
      sessionStorage.setItem('has_visited', 'true');
      registerVisit();
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY > 50) {
        setMobileMenuOpen(false);
        setLangMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    
    setIsSubmitting(true);
    try {
      await saveContactMessage({
        nombre: contactForm.name,
        email: contactForm.email || 'No proporcionado',
        mensaje: contactForm.message,
        whatsapp: contactForm.whatsapp || ''
      });
      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', whatsapp: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = translations[lang];

  // Si no hay productos de base de datos, usamos los defaults
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts.slice(0, 3) 
    : [
        { name: t.products.items[0], tag: t.products.shape1, image_url: null, id: 1 },
        { name: t.products.items[1], tag: t.products.shape2, image_url: null, id: 2 },
        { name: t.products.items[2], tag: t.products.shape3, image_url: null, id: 3 }
      ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-primary selection:text-white overflow-hidden font-sans">
      
      {/* Botón WhatsApp Flotante */}
      <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {/* NAVEGACIÓN - Glassmorphism Flotante Claro */}
      <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-700 flex justify-center px-4 ${isScrolled ? 'translate-y-0' : 'translate-y-0'}`}>
        <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3.5 ${isScrolled ? "w-full max-w-5xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-900/5" : "w-full max-w-7xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm"}`}>
          
          <Link href="/" className="flex items-center group relative z-50">
            <img src="/api/logo" alt="Montano Antilia Logo" className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-8' : 'h-10'}`} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-slate-700 hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">{t.nav.home}</a>
            <Link href="/productos" className="text-slate-700 hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">{t.nav.catalog}</Link>
            <Link href="/about" className="text-slate-700 hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">{t.nav.about}</Link>
            <a href="#contacto" className="text-slate-700 hover:text-primary transition-colors text-[11px] font-bold uppercase tracking-[0.2em]">{t.nav.contact}</a>
            
            <div className="relative border-l border-slate-200 pl-6 ml-2">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-slate-800 hover:text-primary flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors group">
                <Globe className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                {t.nav.lang.split(" ")[1]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full mt-4 right-0 w-36 bg-white backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col py-2 border border-slate-200 animate-fade-in-up">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button key={l} onClick={() => { setLang(l); setLangMenuOpen(false); }} className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-primary font-bold bg-slate-50' : 'text-slate-600 hover:text-primary hover:bg-slate-50'}`}>
                      {translations[l].nav.lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="lg:hidden text-slate-900 relative z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-slate-900 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-900 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-slate-900 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Menú Móvil Fullscreen */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-2xl z-40 transition-all duration-700 flex flex-col justify-center px-10 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-left">
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.home}</a>
          <Link href="/productos" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.catalog}</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.about}</Link>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.contact}</a>
          
          <div className="h-px w-full bg-slate-200 my-4"></div>
          <div className="flex gap-4 flex-wrap">
            {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
              <button key={l} onClick={() => handleLanguageChange(l)} className={`text-sm font-bold uppercase ${lang === l ? 'text-primary' : 'text-slate-400'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION - Claro, Elegante e Iluminado */}
        <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/20">
          <div className="absolute inset-0 z-0 opacity-15">
            <video key={heroVideoUrl} src={heroVideoUrl} poster={heroVideoUrl.includes('cloudinary') ? heroVideoUrl.replace(/\.[^/.]+$/, ".jpg") : "/placeholder-hero.jpg"} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-[#FAFAFA]"></div>
          </div>

          <div className="relative z-10 px-6 w-full max-w-5xl mx-auto flex flex-col items-center mt-16">
            <div className={`inline-flex items-center gap-2 bg-red-50 border border-red-100 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-8 shadow-sm transition-all duration-1000 delay-100 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {t.hero.badge}
            </div>

            <h1 className={`heading font-extrabold text-6xl md:text-8xl lg:text-[9.5rem] text-slate-900 tracking-tighter leading-none mb-6 transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              MONTANO
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-primary">ANTILIA</span>
            </h1>

            <p className={`text-xl md:text-3xl text-slate-600 font-medium italic mb-12 max-w-2xl transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t.hero.subtitle}
            </p>

            <div className={`transition-all duration-1000 delay-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link href="/productos" className="group relative inline-flex items-center justify-center bg-primary text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase overflow-hidden shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:bg-red-700">
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.btn}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-slate-400">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-slate-400 to-transparent"></div>
          </div>
        </section>

        {/* SECCIÓN PRODUCTOS - Pantalla Clara y Fresca */}
        <section id="productos" className="py-28 relative z-10 overflow-hidden bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">{t.hero.badge}</span>
                </div>
                <h2 className="heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  {t.products.title}
                </h2>
                <p className="text-slate-600 text-lg font-normal leading-relaxed">
                  {t.products.desc}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {settings.catalog_pdf_url && (
                  <a 
                    href={settings.catalog_pdf_url.includes('cloudinary') ? settings.catalog_pdf_url.replace('/upload/', '/upload/fl_attachment/') : settings.catalog_pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-slate-100 border border-slate-200 text-slate-800 px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-slate-200 flex items-center gap-2 whitespace-nowrap shadow-sm"
                  >
                    <svg className="w-4 h-4 text-primary transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>Descargar PDF</span>
                  </a>
                )}
                <Link href="/productos" className="group relative overflow-hidden bg-primary text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-red-700 shadow-md shadow-primary/20">
                  <span className="relative z-10 flex items-center gap-2">
                    {t.products.viewAll}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Grid de Productos Claros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((prod, idx) => (
                <div key={idx} className="relative group/card h-[480px]">
                  <Link href={`/productos/${prod.id}`} className="relative block h-full w-full rounded-[2.5rem] overflow-hidden bg-white border border-slate-200/80 flex flex-col group-hover/card:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-2xl hover:border-primary/30">
                    
                    {/* Badge de Categoría/Forma */}
                    <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                      {prod.tag && (
                        <span className="bg-slate-900 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm">
                          {prod.tag}
                        </span>
                      )}
                    </div>
                    
                    {/* Imagen de Producto en Fondo Blanco */}
                    <div className="relative w-full h-[62%] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-8 z-0">
                      {prod.image_url ? (
                        <img src={getOptimizedUrl(prod.image_url, 800)} alt={prod.name} className="w-full h-full object-contain transition-all duration-[600ms] group-hover/card:scale-110 drop-shadow-md" loading="lazy" />
                      ) : (
                        <div className="w-36 h-36 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs tracking-widest uppercase">Sin Foto</div>
                      )}
                    </div>

                    {/* Información del Producto */}
                    <div className="relative z-20 mt-auto p-8 bg-white border-t border-slate-100 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="heading font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight leading-tight group-hover/card:text-primary transition-colors duration-300">
                          {prod.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Ver detalle</span>
                        <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NOSOTROS - Fondo Limpio e Histórico */}
        <section id="nosotros" className="py-28 md:py-36 relative bg-[#F8FAFC] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Columna de Texto */}
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -left-10 -top-24 text-[12rem] md:text-[16rem] font-black text-slate-200/50 select-none leading-none tracking-tighter pointer-events-none">EST.</div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-8 h-[2px] bg-primary"></div>
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Nuestra Historia</span>
                  </div>
                  
                  <h2 className="heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                    {t.about.title}
                  </h2>
                  
                  <div className="space-y-6 text-slate-600 text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-xl relative">
                    <div className="absolute -left-6 top-2 bottom-2 w-[3px] bg-gradient-to-b from-primary via-primary/30 to-transparent rounded-full"></div>
                    <p className="pl-2">
                      {t.about.text1}<strong className="text-slate-900 font-bold">{t.about.text2}</strong>{t.about.text3}
                    </p>
                    <p className="pl-2">
                      <strong className="text-slate-900 font-bold">{t.about.text4}</strong>{t.about.text5}
                    </p>
                  </div>
                  
                  <Link href="/about" className="group relative inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:bg-primary shadow-md">
                    <span>{t.about.btn}</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>

              {/* Columna de Imagen */}
              <div className="order-1 lg:order-2 relative mx-auto lg:mx-0 max-w-md lg:max-w-none w-full group/img">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-slate-200 bg-white">
                  {settings.about_img ? (
                    <img src={getOptimizedUrl(settings.about_img, 800)} alt="Montano Antilia" className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover/img:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs tracking-widest uppercase">Foto de Fábrica</div>
                  )}
                </div>
                
                {/* Medalla Giratoria de Calidad */}
                <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 w-36 h-36 md:w-44 md:h-44 z-20">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
                      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                        <defs>
                          <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                        </defs>
                        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(15,23,42,0.15)" strokeWidth="1" />
                        <text fontSize="14" fill="#0F172A" fontWeight="800" letterSpacing="2" className="uppercase font-sans">
                          <textPath href="#circlePath" startOffset="0%" textLength="490">
                            • {t.about.badge} • {t.about.badge} • {t.about.badge}
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    <div className="absolute inset-8 rounded-full bg-white border border-slate-200 shadow-xl flex flex-col items-center justify-center text-center">
                      <span className="text-primary font-black text-3xl md:text-4xl heading leading-none">+30</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* GALERÍA SOCIAL / COMUNIDAD */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-50 border border-slate-200/80 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Comunidad</span>
                </div>
                <h2 className="heading text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {t.social.title}
                </h2>
                <p className="text-slate-600 text-base md:text-lg font-normal max-w-md">
                  {t.social.sub}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-pink-500 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#E1306C] flex items-center justify-center text-white shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <span className="font-bold text-slate-900 text-sm tracking-wide">Instagram</span>
                </a>
                
                <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                  </div>
                  <span className="font-bold text-slate-900 text-sm tracking-wide">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Grid de Imágenes de Galería */}
          <div className="grid grid-cols-2 lg:grid-cols-4 w-full border-t border-slate-100">
            {[1, 2, 3, 4].map(i => {
              const img = settings[`gallery_img_${i}`];
              return (
                <div key={i} className="aspect-square bg-slate-100 relative group overflow-hidden border-r border-b border-slate-200/50">
                  {img ? (
                    img.match(/\.(mp4|webm|mov)$/i) ? (
                      <video src={img} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <img src={getOptimizedUrl(img, 600)} alt={`Galería ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACTO - Formulario y Tarjetas Claras */}
        <section id="contacto" className="py-28 relative bg-[#F8FAFC] border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              
              {/* Columna Izquierda: Información */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-primary"></div>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">{t.contact.badge}</span>
                </div>
                <h2 className="heading text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">
                  {t.contact.title}
                </h2>
                <p className="text-slate-600 font-normal leading-relaxed mb-12 text-lg">
                  {t.contact.desc}
                </p>

                <div className="space-y-4">
                  {/* Tarjetas de Información */}
                  <a href={`mailto:${contactInfo.email}`} className="group flex items-center gap-6 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-primary/40 hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.contact.emailLabel}</p>
                      <p className="text-slate-900 font-bold group-hover:text-primary transition-colors break-all">{contactInfo.email}</p>
                    </div>
                  </a>
                  
                  <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#25D366]/50 hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.contact.waLabel}</p>
                      <p className="text-slate-900 font-bold group-hover:text-[#25D366] transition-colors">{contactInfo.whatsappDisplay}</p>
                    </div>
                  </a>

                  <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-400 hover:shadow-md transition-all duration-300">
                    <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.contact.mapLabel}</p>
                      <p className="text-slate-900 font-bold group-hover:text-slate-700 transition-colors" dangerouslySetInnerHTML={{ __html: t.contact.mapAddress }}></p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Formulario */}
              <div className="w-full lg:w-7/12">
                <div className="bg-white p-8 md:p-12 lg:p-14 rounded-[2.5rem] border border-slate-200/80 shadow-xl relative overflow-hidden">
                  <h3 className="heading text-3xl font-extrabold text-slate-900 mb-8">{t.contact.formTitle}</h3>
                  
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.contact.name}</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm" 
                        placeholder={t.contact.namePlaceholder} 
                      />
                    </div>
                    
                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.contact.email}</label>
                      <input 
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm" 
                        placeholder={t.contact.emailPlaceholder} 
                      />
                    </div>

                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">WhatsApp (Opcional)</label>
                      <input 
                        type="text" 
                        value={contactForm.whatsapp}
                        onChange={(e) => setContactForm({...contactForm, whatsapp: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition-all duration-300 text-sm" 
                        placeholder="Ej: +58 412 1234567" 
                      />
                    </div>
                    
                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t.contact.msg}</label>
                      <textarea 
                        rows={4} 
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-sm" 
                        placeholder={t.contact.msgPlaceholder}
                      ></textarea>
                    </div>
                    
                    <button type="submit" disabled={isSubmitting || submitSuccess} className={`w-full relative overflow-hidden ${submitSuccess ? 'bg-emerald-600 text-white' : 'bg-primary text-white hover:bg-red-700'} px-8 py-5 rounded-2xl text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 mt-6 group flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20`}>
                      <span className="relative z-10 flex items-center gap-3">
                        {submitSuccess ? (
                          <>
                            ENVIADO <Check className="w-5 h-5" />
                          </>
                        ) : isSubmitting ? (
                          "ENVIANDO..."
                        ) : (
                          <>
                            {t.contact.send}
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </>
                        )}
                      </span>
                    </button>
                    {submitSuccess && (
                      <div className="mt-4 p-5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="font-medium">{t.contact.successMsg}</p>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <div className="border-t border-slate-200 bg-white">
        <Footer 
          texts={{
            aboutText: t.about.text1 + t.about.text2 + t.about.text3 + t.about.text4 + t.about.text5,
            quickLinksTitle: t.footer.quickLinks,
            contactTitle: t.footer.contactTitle,
            nav: t.nav,
            footer: t.footer.copy,
            newsletterTitle: t.footer.newsletterTitle,
            newsletterDesc: t.footer.newsletterDesc,
            emailPlaceholder: t.footer.emailPlaceholder,
            subscribeBtn: t.footer.subscribeBtn
          }}
          contactInfo={contactInfo}
        />
      </div>
    </div>
  );
}
