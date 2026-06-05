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
  whatsappRaw: "584243699740",
  whatsappDisplay: "+58 424-3699740",
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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white overflow-hidden font-sans">
      
      {/* Botón WhatsApp Flotante de Lujo */}
      <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {/* NAVEGACIÓN - Glassmorphism Flotante */}
      <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-700 flex justify-center px-4 ${isScrolled ? 'translate-y-0' : 'translate-y-0'}`}>
        <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3 ${isScrolled ? "w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl" : "w-full max-w-7xl bg-transparent"}`}>
          
          <Link href="/" className="flex items-center group relative z-50">
            <img src="/api/logo" alt="Montano Antilia Logo" className={`w-auto object-contain transition-all duration-500 drop-shadow-2xl ${isScrolled ? 'h-8' : 'h-10'}`} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.home}</a>
            <Link href="/productos" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.catalog}</Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.about}</Link>
            <a href="#contacto" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.contact}</a>
            
            <div className="relative border-l border-white/10 pl-6 ml-2">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-white/90 hover:text-white flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors group">
                <Globe className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                {t.nav.lang.split(" ")[1]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full mt-4 right-0 w-36 bg-[#111] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col py-2 border border-white/5 animate-fade-in-up">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button key={l} onClick={() => { setLang(l); setLangMenuOpen(false); }} className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-primary bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                      {translations[l].nav.lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="lg:hidden text-white relative z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Menú Móvil Fullscreen */}
      <div className={`fixed inset-0 bg-[#0A0A0A] z-40 transition-all duration-700 flex flex-col justify-center px-10 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-left">
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.home}</a>
          <Link href="/productos" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.catalog}</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.about}</Link>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.contact}</a>
          
          <div className="h-px w-full bg-white/10 my-4"></div>
          <div className="flex gap-4 flex-wrap">
            {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
              <button key={l} onClick={() => handleLanguageChange(l)} className={`text-sm font-bold uppercase ${lang === l ? 'text-primary' : 'text-gray-500'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <main>
        {/* HERO SECTION - Minimalista y Épico */}
        <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-black">
            <video key={heroVideoUrl} src={heroVideoUrl} poster={heroVideoUrl.includes('cloudinary') ? heroVideoUrl.replace(/\.[^/.]+$/, ".jpg") : "/placeholder-hero.jpg"} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]"></div>
            {/* Viñeta para centrar la vista */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
          </div>

          <div className="relative z-10 px-6 w-full max-w-5xl mx-auto flex flex-col items-center mt-12">
            <p className={`text-primary font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-6 transition-all duration-1000 delay-100 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t.hero.badge}
            </p>
            <h1 className={`heading font-extrabold text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tighter leading-none mb-6 drop-shadow-2xl transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              MONTANO
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">ANTILIA</span>
            </h1>
            <p className={`text-lg md:text-2xl text-gray-400 font-light italic mb-14 max-w-2xl transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t.hero.subtitle}
            </p>
            <div className={`transition-all duration-1000 delay-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link href="/productos" className="group relative inline-flex items-center justify-center bg-white text-black px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:scale-105">
                <span className="relative z-10">{t.hero.btn}</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">{t.hero.btn}</span>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* SECCIÓN PRODUCTOS - Premium SaaS Display */}
        <section id="productos" className="py-32 relative z-10 overflow-hidden">
          {/* Ambient light for the section */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 hidden md:block"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">{t.hero.badge}</span>
                </div>
                <h2 className="heading text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tighter">
                  {t.products.title}
                </h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {t.products.desc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {settings.catalog_pdf_url && (
                  <a 
                    href={settings.catalog_pdf_url.includes('cloudinary') ? settings.catalog_pdf_url.replace('/upload/', '/upload/fl_attachment/') : settings.catalog_pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 whitespace-nowrap"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span className="relative z-10">Descargar PDF</span>
                  </a>
                )}
                <Link href="/productos" className="group relative overflow-hidden bg-transparent border border-white/10 text-white px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:border-primary">
                  <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    {t.products.viewAll}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Premium Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((prod, idx) => (
                <div key={idx} className="relative group/card h-[500px]">
                  {/* Glowing background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                  
                  <Link href={`/productos/${prod.id}`} className="relative block h-full w-full rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col group-hover/card:border-white/20 group-hover/card:-translate-y-2 transition-all duration-500 shadow-xl group-hover/card:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    
                    {/* Inner top glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/5 rounded-full blur-[50px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Shadow overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover/card:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Product Image */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-12 z-0">
                      {prod.image_url ? (
                        <img src={getOptimizedUrl(prod.image_url, 800)} alt={prod.name} className="w-full h-full object-contain transition-all duration-[800ms] group-hover/card:scale-110 group-hover/card:-translate-y-4 drop-shadow-[0_30px_30px_rgba(0,0,0,0.8)]" loading="lazy" />
                      ) : (
                        <div className="w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 font-bold text-xs tracking-widest uppercase shadow-inner">Sin Foto</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="relative z-20 mt-auto p-10 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {prod.tag && (
                          <span className="bg-white/5 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10 shadow-inner">
                            {prod.tag}
                          </span>
                        )}
                        {prod.brand && (
                          <span className="bg-primary/10 backdrop-blur-md text-primary text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-color-rgb),0.2)]">
                            {prod.brand}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <h3 className="heading font-black text-3xl md:text-4xl text-white tracking-tight leading-none group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-white group-hover/card:to-gray-400 transition-all duration-300">
                          {prod.name}
                        </h3>
                        
                        {/* Animated arrow icon */}
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform scale-0 opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 transition-all duration-500 delay-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                        </div>
                      </div>
                      
                      {/* Interactive Line */}
                      <div className="w-12 h-1 bg-primary/30 mt-6 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-primary group-hover/card:w-full transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NOSOTROS - Premium SaaS About */}
        <section id="nosotros" className="py-32 md:py-40 relative bg-[#050505] overflow-hidden">
          {/* Subtle Ambient Backgrounds */}
          <div className="absolute top-1/2 left-0 w-full max-w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/3 -translate-y-1/2 pointer-events-none hidden md:block"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Text Column */}
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -left-10 -top-24 text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent select-none leading-none tracking-tighter pointer-events-none transition-transform duration-1000 group-hover:-translate-y-4">EST.</div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-8 h-[1px] bg-primary"></div>
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Nuestra Historia</span>
                  </div>
                  
                  <h2 className="heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-8 leading-[1.1] tracking-tight">
                    {t.about.title}
                  </h2>
                  
                  <div className="space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl relative">
                    <div className="absolute -left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-primary/20 to-transparent"></div>
                    <p className="pl-2">
                      {t.about.text1}<strong className="text-white font-medium">{t.about.text2}</strong>{t.about.text3}
                    </p>
                    <p className="pl-2">
                      <strong className="text-white font-medium">{t.about.text4}</strong>{t.about.text5}
                    </p>
                  </div>
                  
                  <Link href="/about" className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full"></div>
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{t.about.btn}</span>
                    <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 group-hover:text-white transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>

              {/* Image Column */}
              <div className="order-1 lg:order-2 relative mx-auto lg:mx-0 max-w-md lg:max-w-none w-full group/img">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-[40px] md:blur-[80px] rounded-full group-hover/img:opacity-70 transition-opacity duration-1000 opacity-40"></div>
                
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 z-10"></div>
                  {settings.about_img ? (
                    <img src={getOptimizedUrl(settings.about_img, 800)} alt="Montano Antilia" className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover/img:scale-110" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center text-gray-500 font-bold text-xs tracking-widest uppercase">Foto de Fábrica</div>
                  )}
                </div>
                
                {/* Premium Rotating Badge */}
                <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-36 h-36 md:w-44 md:h-44 z-20 group-hover/img:-translate-y-2 group-hover/img:translate-x-2 transition-transform duration-700">
                  <div className="relative w-full h-full">
                    {/* Spinning SVG Text/Border */}
                    <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
                      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                        <defs>
                          <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                        </defs>
                        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <text fontSize="14" fill="#FFFFFF" fontWeight="900" letterSpacing="2" className="uppercase font-sans opacity-90" style={{ fill: '#ffffff' }}>
                          <textPath href="#circlePath" startOffset="0%" textLength="490">
                            • {t.about.badge} • {t.about.badge} • {t.about.badge}
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    {/* Static Center Orb */}
                    <div className="absolute inset-8 rounded-full bg-[#050505] border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center">
                      <span className="text-primary font-black text-3xl md:text-4xl heading leading-none">+30</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* GALERÍA SOCIAL */}
        <section className="py-20 overflow-hidden bg-[#050505]">
          <div className="max-w-7xl mx-auto px-6 mb-16 relative">
            <div className="absolute -top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-[50px] pointer-events-none hidden md:block"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Comunidad</span>
                </div>
                <h2 className="heading text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">
                  {t.social.title}
                </h2>
                <p className="text-gray-400 text-base md:text-lg font-light max-w-md">
                  {t.social.sub}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-[0_0_30px_rgba(225,48,108,0.3)] hover:border-pink-500/50">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FD1D1D] to-[#E1306C] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#E1306C] flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                  <span className="font-bold text-white text-sm tracking-wide group-hover:text-pink-100 transition-colors">Instagram</span>
                </a>
                
                <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg group-hover:-rotate-12 transition-transform duration-500">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                  </div>
                  <span className="font-bold text-white group-hover:text-black text-sm tracking-wide transition-colors">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Grid de imágenes sin espacios estilo feed */}
          <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
            {[1, 2, 3, 4].map(i => {
              const img = settings[`gallery_img_${i}`];
              return (
                <div key={i} className="aspect-square bg-[#111] relative group overflow-hidden">
                  {/* Imagen sin el texto de "Ver Más" porque no tiene enlace */}
                  {img ? (
                    img.match(/\.(mp4|webm|mov)$/i) ? (
                      <video src={img} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <img src={getOptimizedUrl(img, 600)} alt={`Galería ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACTO - Premium SaaS Form */}
        <section id="contacto" className="py-32 relative bg-[#050505] overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none hidden md:block"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              
              {/* Left Column: Contact Info */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-primary"></div>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">{t.contact.badge}</span>
                </div>
                <h2 className="heading text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                  {t.contact.title}
                </h2>
                <p className="text-gray-400 font-light leading-relaxed mb-12 text-lg">
                  {t.contact.desc}
                </p>

                <div className="space-y-4">
                  {/* Contact Info Cards */}
                  <a href={`mailto:${contactInfo.email}`} className="group flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                    <div className="w-14 h-14 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.3)] transition-all duration-500">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t.contact.emailLabel}</p>
                      <p className="text-white font-medium group-hover:text-primary transition-colors break-all">{contactInfo.email}</p>
                    </div>
                  </a>
                  
                  <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#25D366]/30 transition-all duration-500">
                    <div className="w-14 h-14 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#25D366] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all duration-500">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t.contact.waLabel}</p>
                      <p className="text-white font-medium group-hover:text-[#25D366] transition-colors">{contactInfo.whatsappDisplay}</p>
                    </div>
                  </a>

                  <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-gray-500/30 transition-all duration-500">
                    <div className="w-14 h-14 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{t.contact.mapLabel}</p>
                      <p className="text-white font-medium group-hover:text-gray-200 transition-colors" dangerouslySetInnerHTML={{ __html: t.contact.mapAddress }}></p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="w-full lg:w-7/12">
                <div className="bg-[#0A0A0A]/80 backdrop-blur-2xl p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group/form">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 transition-opacity duration-700 opacity-50 group-focus-within/form:opacity-100 hidden md:block"></div>
                  
                  <h3 className="heading text-3xl font-bold text-white mb-10">{t.contact.formTitle}</h3>
                  
                  <form className="space-y-6" onSubmit={handleContactSubmit}>
                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-primary">{t.contact.name}</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:bg-white/[0.05] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-sm shadow-inner" 
                        placeholder={t.contact.namePlaceholder} 
                      />
                    </div>
                    
                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-primary">{t.contact.email}</label>
                      <input 
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:bg-white/[0.05] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-sm shadow-inner" 
                        placeholder={t.contact.emailPlaceholder} 
                      />
                    </div>

                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-[#25D366]">WhatsApp (Opcional)</label>
                      <input 
                        type="text" 
                        value={contactForm.whatsapp}
                        onChange={(e) => setContactForm({...contactForm, whatsapp: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:bg-white/[0.05] focus:border-[#25D366]/50 focus:ring-1 focus:ring-[#25D366]/50 transition-all duration-300 text-sm shadow-inner" 
                        placeholder="Ej: +58 412 1234567" 
                      />
                    </div>
                    
                    <div className="group/input relative">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 transition-colors group-focus-within/input:text-primary">{t.contact.msg}</label>
                      <textarea 
                        rows={4} 
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4.5 text-white focus:outline-none focus:bg-white/[0.05] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 resize-none text-sm shadow-inner" 
                        placeholder={t.contact.msgPlaceholder}
                      ></textarea>
                    </div>
                    
                    <button type="submit" disabled={isSubmitting || submitSuccess} className={`w-full relative overflow-hidden ${submitSuccess ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:text-white'} px-8 py-5 rounded-2xl text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 mt-6 group flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(var(--primary-color-rgb),0.3)] hover:-translate-y-1`}>
                      {!submitSuccess && (
                        <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                      )}
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
                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </>
                        )}
                      </span>
                    </button>
                    {submitSuccess && (
                      <div className="mt-4 p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-inner">
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
      <div className="border-t border-white/5 bg-[#0A0A0A]">
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
