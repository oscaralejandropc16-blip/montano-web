"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Mail, Phone, ChevronDown, Check, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import { getOptimizedUrl } from "@/lib/optimizeUrl";

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

// --- DICCIONARIO DE TRADUCCIONES ---
const translations = {
  es: {
    nav: { home: "Inicio", products: "Productos", about: "Acerca de", contact: "Contacto", lang: "🇪🇸 Español" },
    hero: { title: "Montano Antilia", subtitle: '"El sabor que conquista"', btn: "Explora Nuestro Catálogo" },
    products: { title: "Nuestros Productos", btn: "Explora Nuestros Productos", items: ["Jamón Cocido 500gr", "Jamón Cocido 3,8 Kgs", "Jamón Cocido 6 Kgs"], shape1: "cilindro", shape2: "bloque rectangular", shape3: "forma tradicional" },
    social: { title: "¡Síguenos en Redes Sociales!", sub: "Descubre recetas, novedades y mucho más." },
    about: { title: "Nosotros", text1: "Somos una empresa familiar con sólida trayectoria en la ", text2: "elaboración de embutidos y productos alimenticios de alta calidad", text3: ". Fundada por el empresario Álvaro Cozzo T., nuestra misión es ofrecer alimentos que destaquen por su ", text4: "sabor auténtico, calidad superior y amplia variedad", text5: ", llevando a cada mesa el verdadero sabor que conquista.", btn: "Saber Más" },
    contact: { title: "Atención y Ventas", name: "Nombre completo", email: "Correo electrónico", msg: "Mensaje", send: "Enviar Mensaje", map: "Visítanos en nuestra sede" },
    footer: "Derechos de autor © 2026 Montano Antilia. Todos los derechos reservados."
  },
  en: {
    nav: { home: "Home", products: "Products", about: "About Us", contact: "Contact", lang: "🇺🇸 English" },
    hero: { title: "Montano Antilia", subtitle: '"The flavor that conquers"', btn: "Explore Our Catalog" },
    products: { title: "Our Products", btn: "Explore Our Products", items: ["Cooked Ham 500g", "Cooked Ham 3.8 Kg", "Cooked Ham 6 Kg"], shape1: "cylinder", shape2: "rectangular block", shape3: "traditional shape" },
    social: { title: "Follow us on Social Media!", sub: "Discover recipes, news and much more." },
    about: { title: "About Us", text1: "We are a family business with a solid track record in the ", text2: "production of high quality cold cuts and food products", text3: ". Founded by entrepreneur Álvaro Cozzo T., our mission is to offer foods that stand out for their ", text4: "authentic flavor, superior quality and wide variety", text5: ", bringing to every table the true flavor that conquers.", btn: "Learn More" },
    contact: { title: "Sales & Support", name: "Full Name", email: "Email Address", msg: "Message", send: "Send Message", map: "Visit our headquarters" },
    footer: "Copyright © 2026 Montano Antilia. All rights reserved."
  },
  it: {
    nav: { home: "Inizio", products: "Prodotti", about: "Chi Siamo", contact: "Contatto", lang: "🇮🇹 Italiano" },
    hero: { title: "Montano Antilia", subtitle: '"Il sapore che conquista"', btn: "Esplora il Nostro Catalogo" },
    products: { title: "I Nostri Prodotti", btn: "Esplora i Nostri Prodotti", items: ["Prosciutto Cotto 500g", "Prosciutto Cotto 3,8 Kg", "Prosciutto Cotto 6 Kg"], shape1: "cilindro", shape2: "blocco rettangolare", shape3: "forma tradizionale" },
    social: { title: "Seguici sui Social Media!", sub: "Scopri ricette, novità e molto altro." },
    about: { title: "Chi Siamo", text1: "Siamo un'azienda familiare con una solida esperienza nella ", text2: "produzione di salumi e prodotti alimentari di alta qualità", text3: ". Fondata dall'imprenditore Álvaro Cozzo T., la nostra missione è offrire cibi che si distinguono per il loro ", text4: "sapore autentico, qualità superiore e grande varietà", text5: ", portando su ogni tavola il vero sapore che conquista.", btn: "Scopri di Più" },
    contact: { title: "Assistenza e Vendite", name: "Nome completo", email: "Indirizzo Email", msg: "Messaggio", send: "Invia Messaggio", map: "Vieni a trovarci" },
    footer: "Copyright © 2026 Montano Antilia. Tutti i diritti riservati."
  }
};

type Language = "es" | "en" | "it";

export default function HomeClient({ settings, featuredProducts = [] }: { settings: Record<string, string>, featuredProducts?: any[] }) {
  const heroVideoUrl = settings.hero_video_url || "/hero-video.mp4";
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<Language>("es");
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Estado para el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estado para el formulario de contacto
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    setLoaded(true);
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    
    // Formatear mensaje para WhatsApp
    const text = `*¡Hola Montano Antilia!*%0A%0ATengo una consulta desde la página web:%0A%0A👤 *Nombre:* ${contactForm.name}%0A📧 *Correo:* ${contactForm.email || 'No proporcionado'}%0A💬 *Mensaje:* ${contactForm.message}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(`https://wa.me/${contactInfo.whatsappRaw}?text=${text}`, '_blank');
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
    <div className="min-h-screen bg-white text-foreground overflow-hidden">
      {/* Botón WhatsApp Flotante */}
      <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="whatsapp-btn hover:scale-110 transition-transform hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>

      {/* Navegación - Con blur moderno */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-lg py-3 shadow-2xl shadow-black/20" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className={`transition-all duration-500 relative ${isScrolled ? 'h-12' : 'h-16'}`}>
              <img src="/logo.png" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-md" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.home}</a>
            <Link href="/productos" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.products}</Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.about}</Link>
            <a href="#contacto" className="text-white/90 hover:text-white transition-colors font-medium tracking-widest text-xs uppercase drop-shadow-md">{t.nav.contact}</a>
            
            <div className="flex items-center gap-4 border-l border-white/20 pl-4 ml-2 relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-white font-bold flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all text-xs tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 hover:border-white/30 shadow-sm backdrop-blur-sm group"
              >
                <Globe className="w-3.5 h-3.5 text-white/70 group-hover:text-primary transition-colors" />
                <span>{t.nav.lang.split(" ")[1]}</span> 
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full mt-4 right-0 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col py-2 border border-gray-100/50 animate-fade-in-up origin-top-right">
                  <button onClick={() => { setLang("es"); setLangMenuOpen(false); }} className={`px-5 py-3 text-sm text-left transition-colors flex items-center gap-3 ${lang === 'es' ? 'font-bold text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>
                    <span className="text-lg">🇪🇸</span> Español
                  </button>
                  <button onClick={() => { setLang("en"); setLangMenuOpen(false); }} className={`px-5 py-3 text-sm text-left transition-colors flex items-center gap-3 ${lang === 'en' ? 'font-bold text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>
                    <span className="text-lg">🇺🇸</span> English
                  </button>
                  <button onClick={() => { setLang("it"); setLangMenuOpen(false); }} className={`px-5 py-3 text-sm text-left transition-colors flex items-center gap-3 ${lang === 'it' ? 'font-bold text-primary bg-primary/5' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>
                    <span className="text-lg">🇮🇹</span> Italiano
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Menú Hamburguesa para Móvil */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Dropdown Menú Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-fade-in-down">
            <div className="flex flex-col px-6 py-6 gap-6">
              <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-white text-sm font-bold tracking-widest uppercase">{t.nav.home}</a>
              <Link href="/productos" onClick={() => setMobileMenuOpen(false)} className="text-white text-sm font-bold tracking-widest uppercase">{t.nav.products}</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-white text-sm font-bold tracking-widest uppercase">{t.nav.about}</Link>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-white text-sm font-bold tracking-widest uppercase">{t.nav.contact}</a>
              
              <div className="h-px w-full bg-white/10 my-2"></div>
              
              <div className="flex flex-col gap-4">
                <span className="text-white/50 text-xs tracking-widest uppercase">Idioma</span>
                <button onClick={() => { setLang("es"); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold ${lang === 'es' ? 'text-primary' : 'text-white'}`}>🇪🇸 Español</button>
                <button onClick={() => { setLang("en"); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold ${lang === 'en' ? 'text-primary' : 'text-white'}`}>🇺🇸 English</button>
                <button onClick={() => { setLang("it"); setMobileMenuOpen(false); }} className={`text-left text-sm font-bold ${lang === 'it' ? 'text-primary' : 'text-white'}`}>🇮🇹 Italiano</button>
              </div>


            </div>
          </div>
        )}
      </nav>

      <main>
        {/* HERO SECTION - Efecto Ken Burns y Textos Cinematográficos */}
        <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden bg-black">
          {/* Animación Ken Burns (zoom suave) del fondo */}
          <div className={`absolute inset-0 transition-transform duration-[20s] ease-out ${loaded ? 'scale-100' : 'scale-110'}`}>
             {/* Overlay oscuro uniforme para legibilidad clara del texto */}
             <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none"></div>
             
             {/* Video de Fondo */}
             <video 
               key={heroVideoUrl}
               src={heroVideoUrl}
               autoPlay 
               loop 
               muted 
               playsInline 
               className="absolute inset-0 w-full h-full object-cover z-0"
             />
          </div>

          <div className="relative z-30 px-6 max-w-5xl mx-auto flex flex-col items-center mt-16">
            <h1 className={`heading font-extrabold text-4xl sm:text-6xl md:text-8xl text-white mb-2 tracking-tighter drop-shadow-2xl transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t.hero.title}
            </h1>
            <p className={`text-xl sm:text-2xl md:text-4xl text-white/90 font-light italic mb-12 tracking-wider drop-shadow-lg transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {t.hero.subtitle}
            </p>
            <div className={`transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link href="/productos" className="relative group inline-flex items-center justify-center bg-primary text-white px-10 py-4 rounded text-sm font-bold tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(213,43,42,0.6)] uppercase">
                <span className="relative z-10">{t.hero.btn}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN PRODUCTOS - Tarjetas Flotantes Modenas */}
        <section id="productos" className="py-32 px-6 max-w-7xl mx-auto relative">
          {/* Decoración geométrica sutil */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-20">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Alta Charcutería</span>
              <h2 className="heading text-4xl md:text-5xl font-extrabold text-black">{t.products.title}</h2>
            </div>
            <Link href="/productos" className="mt-6 md:mt-0 bg-black text-white px-8 py-3 rounded text-sm font-bold tracking-widest hover:bg-primary transition-colors uppercase shadow-lg hover:shadow-primary/30">
              {t.products.btn}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {displayProducts.map((prod, idx) => (
              <Link href={`/productos/${prod.id}`} key={idx} className="group cursor-pointer block">
                <div className="w-full aspect-[4/5] mb-8 bg-gray-50 flex items-center justify-center p-6 rounded-2xl border border-gray-100 group-hover:border-primary/20 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-black/5 transition-all duration-500 relative overflow-hidden transform group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col items-center w-full h-full">
                    {prod.image_url ? (
                      <img src={getOptimizedUrl(prod.image_url, 400)} alt={prod.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <span className="text-gray-300 text-sm mb-2 font-bold">[Foto de producto {idx+1}]</span>
                    )}
                    {!prod.image_url && <span className="text-xs text-gray-400">{prod.tag}</span>}
                  </div>
                </div>
                <h3 className="heading font-bold text-2xl text-center text-black group-hover:text-primary transition-colors tracking-tight">{prod.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* REDES SOCIALES */}
        <section className="py-24 px-6 bg-gray-50/50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="heading text-3xl font-bold text-black mb-4">{t.social.title}</h2>
            <p className="text-gray-500 mb-10">{t.social.sub}</p>
            
            <div className="flex items-center justify-center gap-6 mb-16">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#FD1D1D] to-[#E1306C] text-white px-8 py-3 rounded-full font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(225,48,108,0.3)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                TikTok
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => {
                const img = settings[`gallery_img_${i}`];
                return (
                  <div key={i} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden relative group">
                    {img ? (
                      img.match(/\.(mp4|webm|mov)$/i) ? (
                        <video src={img} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <img src={getOptimizedUrl(img, 600)} alt={`Galería ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      )
                    ) : (
                      <span className="relative z-10 font-bold">[Medio Galería {i}]</span>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* NOSOTROS - Diseño Asimétrico Wow */}
        <section id="nosotros" className="py-32 px-6 bg-white overflow-hidden relative">
          {/* Elementos de fondo decorativos */}
          <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              
              {/* Columna Izquierda: Imagen Grande */}
              <div className="w-full lg:w-1/2 relative">
                {/* Cuadro de acento detrás */}
                <div className="absolute -inset-6 bg-primary/5 rounded-[2rem] transform -rotate-3 z-0 transition-transform duration-700 hover:rotate-0"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full z-0 opacity-10 blur-2xl"></div>
                
                {/* Imagen Principal */}
                <div className="relative z-10 w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center text-gray-400 font-medium group ring-1 ring-black/5">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                  {settings.about_img ? (
                    <img src={getOptimizedUrl(settings.about_img, 800)} alt="Acerca de Montano Antilia" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <span>[Foto de la fábrica o familia]</span>
                  )}
                </div>
                
                {/* Tarjeta flotante superpuesta */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-extrabold text-2xl">
                    +30
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black uppercase tracking-widest">Años de</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Experiencia</p>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Texto */}
              <div className="w-full lg:w-1/2 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[2px] w-12 bg-primary"></div>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Nuestra Historia</span>
                </div>
                <h2 className="heading text-5xl md:text-6xl font-extrabold text-black mb-8 leading-tight">
                  {t.about.title}
                </h2>
                <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed mb-12">
                  <p>
                    {t.about.text1}<strong className="text-black font-semibold">{t.about.text2}</strong>{t.about.text3}
                  </p>
                  <p>
                    <strong className="text-black font-semibold">{t.about.text4}</strong>{t.about.text5}
                  </p>
                </div>
                <Link href="/about" className="group inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-lg text-sm font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-primary/40 hover:-translate-y-1">
                  {t.about.btn}
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACTO - BENTO GRID DE LUJO */}
        <section id="contacto" className="py-32 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Contacto</span>
              <h2 className="heading text-5xl font-extrabold text-black">{t.contact.title}</h2>
            </div>

            <div className="flex flex-col lg:flex-row rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] bg-white ring-1 ring-gray-100">
              
              {/* Mitad Izquierda: Info + Mapa de Fondo */}
              <div className="w-full lg:w-5/12 relative bg-[#0A0A0A] p-10 md:p-16 flex flex-col justify-between overflow-hidden">
                {/* Mapa de fondo oscuro y con opacidad baja */}
                <div className="absolute inset-0 z-0">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(1.2) opacity(0.2)' }} 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                    allowFullScreen
                    className="pointer-events-none scale-150"
                  ></iframe>
                  {/* Gradiente extra para asegurar legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
                </div>

                <div className="relative z-10 mb-20">
                  <h3 className="text-3xl font-extrabold text-white mb-4">Información de Contacto</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Llena el formulario o contáctanos directamente a través de nuestros canales oficiales.
                  </p>
                </div>

                <div className="relative z-10 space-y-10">
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Correo Electrónico</p>
                      <p className="text-white font-medium">{contactInfo.email}</p>
                    </div>
                  </a>
                  
                  <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">WhatsApp Ventas</p>
                      <p className="text-white font-medium">{contactInfo.whatsappDisplay}</p>
                    </div>
                  </a>

                  <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Sede Principal</p>
                      <p className="text-white font-medium">Av. Bolívar Oeste N° 314, Carabobo</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Mitad Derecha: Formulario Limpio */}
              <div className="w-full lg:w-7/12 p-10 md:p-16 lg:p-20 bg-white relative">
                <h3 className="heading text-3xl font-extrabold text-black mb-12">Envíanos un mensaje</h3>
                
                <form className="space-y-12" onSubmit={handleContactSubmit}>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="peer w-full border-0 border-b-2 border-gray-100 bg-transparent py-2 text-black focus:outline-none focus:border-primary focus:ring-0 placeholder-transparent transition-colors" 
                      placeholder="Nombre" 
                    />
                    <label htmlFor="name" className="absolute left-0 -top-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-primary">Tu Nombre *</label>
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="peer w-full border-0 border-b-2 border-gray-100 bg-transparent py-2 text-black focus:outline-none focus:border-primary focus:ring-0 placeholder-transparent transition-colors" 
                      placeholder="Email" 
                    />
                    <label htmlFor="email" className="absolute left-0 -top-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-primary">Tu Correo Electrónico</label>
                  </div>
                  
                  <div className="relative">
                    <textarea 
                      id="message" 
                      rows={3} 
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="peer w-full border-0 border-b-2 border-gray-100 bg-transparent py-2 text-black focus:outline-none focus:border-primary focus:ring-0 placeholder-transparent transition-colors resize-none" 
                      placeholder="Mensaje"
                    ></textarea>
                    <label htmlFor="message" className="absolute left-0 -top-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-primary">Tu Mensaje *</label>
                  </div>
                  
                  <button type="submit" className="w-full bg-black text-white px-8 py-5 rounded-xl text-sm font-bold tracking-[0.2em] uppercase hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-primary/30 mt-12 group flex justify-center items-center gap-3">
                    {t.contact.send}
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER PREMIUM REUSABLE */}
      <Footer 
        texts={{
          aboutText: t.about.text1 + t.about.text2 + t.about.text3 + t.about.text4 + t.about.text5,
          quickLinksTitle: "Enlaces Rápidos",
          contactTitle: "Contacto Directo",
          nav: t.nav,
          footer: t.footer
        }}
        contactInfo={contactInfo}
      />
    </div>
  );
}
