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
  mapAddress: "314 Av. Bolívar, Oeste 2103, Aragua",
  whatsappDisplay: "+58 424-3249097",
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
    <footer className="relative bg-[#06020a] pt-24 pb-12 overflow-hidden border-t border-purple-950/60 text-[#F8FAFC]">
      
      {/* Resplandor de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Newsletter Callout Halloween */}
        <div className="relative mb-20">
          <div className="relative bg-gradient-to-r from-[#160929] via-[#200d3a] to-[#120622] border border-orange-500/30 rounded-[2.5rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_0_45px_rgba(0,0,0,0.9)]">
            
            {/* Telaraña decorativa */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-30 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400 fill-none stroke-current" strokeWidth="1">
                <path d="M100,0 L0,0 M100,0 L20,40 M100,0 L40,70 M100,0 L70,90 M100,0 L100,100" />
                <path d="M80,0 Q84,10 90,20" />
                <path d="M60,0 Q68,20 80,40" />
                <path d="M40,0 Q52,30 70,60" />
              </svg>
            </div>

            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-orange-400 font-bold tracking-[0.2em] uppercase text-[10px]">Boletín de Noche de Brujas</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
                Únete a Nuestro Aquelarre Gourmet
              </h3>
              <p className="text-slate-300 text-base leading-relaxed font-normal">
                Recibe promociones espeluznantes, recetas de ultratumba y lanzamientos exclusivos directamente en tu bandeja.
              </p>
            </div>
            
            <div className="w-full lg:w-auto relative z-10 flex flex-col sm:flex-row gap-3">
              {success ? (
                <div className="bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 w-full lg:w-[380px] shadow-lg">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" /> 
                  <span className="font-bold text-sm tracking-wide">¡Hechizo completado! Suscripción exitosa</span>
                </div>
              ) : (
                <>
                  <div className="relative w-full lg:w-80">
                    <input 
                      type="email" 
                      placeholder={mergedTexts.emailPlaceholder} 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0c0516] border border-purple-900/60 text-white placeholder-slate-500 px-5 py-4 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-sm shadow-inner"
                    />
                  </div>
                  <button 
                    onClick={handleSubscribe}
                    disabled={submitting || !email}
                    className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-black px-8 py-4 rounded-2xl font-black tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,106,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        <span>{mergedTexts.subscribeBtn}</span> 
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-10">
            <div className="h-14 mb-6 flex items-center">
              <img src="/api/logo" alt="Montano Antilia" className="h-full w-auto object-contain brightness-110 drop-shadow-[0_0_12px_rgba(255,106,0,0.5)]" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 font-normal">
              {mergedTexts.aboutText} Llevando a tu mesa embutidos de calidad superior elaborados con tradición y un toque embrujado.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-[#140824] border border-pink-500/30 flex items-center justify-center text-pink-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-[#140824] border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-black hover:bg-purple-300 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-white font-extrabold tracking-[0.2em] uppercase text-[11px] mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-orange-500"></span>
              <span>{mergedTexts.quickLinksTitle}</span>
            </h4>
            <ul className="space-y-4">
              {[
                { label: navTexts.home, href: "/#inicio" },
                { label: navTexts.catalog, href: "/productos" },
                { label: navTexts.about, href: "/about" },
                { label: navTexts.contact, href: "/#contacto" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-400 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)] transition-all text-sm font-semibold inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-extrabold tracking-[0.2em] uppercase text-[11px] mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-orange-500"></span>
              <span>{mergedTexts.contactTitle}</span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#140824] border border-orange-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-slate-300 text-sm font-medium pt-1.5">{contactInfo.mapAddress}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#140824] border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-slate-300 text-sm font-medium">{contactInfo.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#140824] border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-slate-300 text-sm font-medium break-all">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-purple-950/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs tracking-wider uppercase text-center md:text-left font-semibold">
            {mergedTexts.footer} • Edición Especial Halloween
          </p>
        </div>
      </div>
    </footer>
  );
}
