"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { subscribeNewsletter } from "@/lib/actions";

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

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) return;
    setSubmitting(true);
    const res = await subscribeNewsletter(email);
    setSubmitting(false);
    if (res.success) {
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      
      {/* Huge Animated Watermark Background */}
      <div className="absolute top-1/3 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 opacity-40">
        <span className="text-[14vw] font-black tracking-tighter whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent leading-none">
          MONTANO ANTILIA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Premium Newsletter Callout */}
        <div className="relative mb-24 group/newsletter">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover/newsletter:opacity-50 transition-opacity duration-1000"></div>
          
          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover/newsletter:opacity-100 opacity-50 transition-opacity duration-700"></div>
            
            <div className="max-w-xl relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">Boletín VIP</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">
                {mergedTexts.newsletterTitle}
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light">
                {mergedTexts.newsletterDesc}
              </p>
            </div>
            
            <div className="w-full lg:w-auto relative z-10 flex flex-col sm:flex-row gap-4">
              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-8 py-5 rounded-2xl flex items-center justify-center gap-3 w-full lg:w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-inner">
                  <CheckCircle2 className="w-6 h-6" /> 
                  <span className="font-bold tracking-wide">¡Suscripción exitosa!</span>
                </div>
              ) : (
                <>
                  <div className="relative w-full lg:w-80 group/input">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500"></div>
                    <input 
                      type="email" 
                      placeholder={mergedTexts.emailPlaceholder} 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative w-full bg-white/[0.03] border border-white/10 text-white px-6 py-5 rounded-2xl focus:outline-none focus:bg-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 shadow-inner placeholder:text-gray-600"
                    />
                  </div>
                  <button 
                    onClick={handleSubscribe}
                    disabled={submitting || !email}
                    className="group relative overflow-hidden bg-white text-black px-10 py-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 transition-all duration-500 hover:text-white hover:shadow-[0_0_30px_rgba(var(--primary-color-rgb),0.3)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:text-black"
                  >
                    {!submitting && (
                      <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full -z-10"></div>
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {submitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          {mergedTexts.subscribeBtn} 
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 relative z-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-10">
            <div className="h-20 mb-10 relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img src="/api/logo" alt="Montano Antilia" className="h-full w-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-10 font-light">
              {mergedTexts.aboutText}
            </p>
            
            {/* Premium Social Icons */}
            <div className="flex items-center gap-5">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="group relative w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white transition-all duration-500 overflow-hidden hover:scale-110 hover:shadow-[0_0_30px_rgba(225,48,108,0.3)] hover:border-pink-500/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FD1D1D] to-[#E1306C] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-hover:text-pink-400 group-hover:rotate-12 transition-all duration-500 relative z-10"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="group relative w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white transition-all duration-500 overflow-hidden hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-white hover:border-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 group-hover:text-black group-hover:-rotate-12 transition-all duration-500 relative z-10"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-white font-extrabold tracking-[0.2em] uppercase text-[10px] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span>
              {mergedTexts.quickLinksTitle}
            </h4>
            <ul className="space-y-5">
              {[
                { label: navTexts.home, href: "/#inicio" },
                { label: navTexts.catalog, href: "/productos" },
                { label: navTexts.about, href: "/about" },
                { label: navTexts.contact, href: "/#contacto" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group relative inline-flex text-gray-400 hover:text-white transition-colors text-sm font-medium py-1">
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-4"></span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-extrabold tracking-[0.2em] uppercase text-[10px] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-primary"></span>
              {mergedTexts.contactTitle}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-5 group cursor-pointer p-4 -ml-4 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.2)] transition-all duration-300">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors pt-3">{contactInfo.mapAddress}</span>
              </li>
              <li className="flex items-center gap-5 group cursor-pointer p-4 -ml-4 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/30 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.2)] transition-all duration-300">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#25D366] transition-colors" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{contactInfo.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-5 group cursor-pointer p-4 -ml-4 rounded-2xl hover:bg-white/[0.02] transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 mt-8 relative z-10">
          <p className="text-gray-600 text-[10px] tracking-[0.2em] uppercase text-center md:text-left font-bold">
            {mergedTexts.footer}
          </p>
          <div className="flex gap-6">
            <span className="text-gray-600 hover:text-white transition-colors text-[10px] cursor-pointer uppercase tracking-[0.2em] font-bold">Privacidad</span>
            <span className="text-gray-600 hover:text-white transition-colors text-[10px] cursor-pointer uppercase tracking-[0.2em] font-bold">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
