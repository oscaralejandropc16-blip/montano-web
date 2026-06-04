"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

interface FooterProps {
  texts?: {
    aboutText?: string;
    quickLinksTitle?: string;
    contactTitle?: string;
    nav?: { home: string, catalog: string, about: string, contact: string };
    footer?: string;
    newsletterTitle?: string;
    newsletterDesc?: string;
    emailPlaceholder?: string;
    subscribeBtn?: string;
  };
  contactInfo?: {
    instagram: string;
    tiktok: string;
    mapAddress: string;
    whatsappDisplay: string;
    email: string;
  };
}

const defaultContact = {
  instagram: "https://www.instagram.com/montanoantilia.ca/",
  tiktok: "https://www.tiktok.com/@montanoantilia.ca",
  mapAddress: "314 Av. Bolívar, Oeste 2103, Carabobo",
  whatsappDisplay: "+58 424-3699740",
  email: "admonmontanoantilia@gmail.com"
};

const defaultTexts = {
  aboutText: "Tradición y calidad superior en cada producto. Llevando a tu mesa el verdadero sabor que conquista desde hace años.",
  quickLinksTitle: "Navegación",
  contactTitle: "Contacto Directo",
  nav: { home: "Inicio", catalog: "Catálogo", about: "Acerca de", contact: "Contacto" },
  footer: "Derechos de autor © 2026 Montano Antilia. Todos los derechos reservados.",
  newsletterTitle: "Únete a nuestra familia",
  newsletterDesc: "Recibe nuestras últimas novedades y promociones exclusivas directamente en tu correo.",
  emailPlaceholder: "Tu correo electrónico",
  subscribeBtn: "Suscribirse"
};

export default function Footer({ texts = defaultTexts, contactInfo = defaultContact }: FooterProps) {
  const mergedTexts = { ...defaultTexts, ...texts };
  const navTexts = mergedTexts.nav || defaultTexts.nav;

  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Glow Effect Top */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
      
      {/* Huge Watermark Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.02] z-0">
        <span className="text-[12vw] font-black tracking-tighter whitespace-nowrap text-white leading-none">MONTANO ANTILIA</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Newsletter Callout */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary/30 transition-colors duration-500">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{mergedTexts.newsletterTitle}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {mergedTexts.newsletterDesc}
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder={mergedTexts.emailPlaceholder} 
              className="bg-black/50 border border-white/10 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-primary/50 transition-colors w-full md:w-72"
            />
            <button 
              onClick={() => alert("¡Gracias por suscribirte!")}
              className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {mergedTexts.subscribeBtn} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="h-16 mb-8 relative group cursor-pointer">
              {/* Glow Behind Logo */}
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img src="/logo.png" alt="Montano Antilia" className="h-full w-auto object-contain relative z-10 drop-shadow-2xl" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              {mergedTexts.aboutText}
            </p>
            
            {/* Social Icons with Hover Animations */}
            <div className="flex items-center gap-4">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-black hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-lg group">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links (Span 3) */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-white font-extrabold tracking-[0.2em] uppercase text-xs mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {mergedTexts.quickLinksTitle}
            </h4>
            <ul className="space-y-4">
              {[
                { label: navTexts.home, href: "/#inicio" },
                { label: navTexts.catalog, href: "/productos" },
                { label: navTexts.about, href: "/about" },
                { label: navTexts.contact, href: "/#contacto" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative inline-flex text-gray-400 hover:text-white transition-colors text-sm font-medium py-1">
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Span 4) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-extrabold tracking-[0.2em] uppercase text-xs mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              {mergedTexts.contactTitle}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors pt-2">{contactInfo.mapAddress}</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{contactInfo.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 mt-16">
          <p className="text-gray-600 text-xs tracking-wider uppercase text-center md:text-left font-medium">
            {mergedTexts.footer}
          </p>
          <div className="flex gap-4">
            <span className="text-gray-600 hover:text-white transition-colors text-xs cursor-pointer uppercase tracking-wider font-bold">Privacidad</span>
            <span className="text-gray-600 hover:text-white transition-colors text-xs cursor-pointer uppercase tracking-wider font-bold">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
