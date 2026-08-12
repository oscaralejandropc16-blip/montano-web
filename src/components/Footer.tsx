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
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Newsletter Callout */}
        <div className="relative mb-20">
          <div className="relative bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">Boletín VIP</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                {mergedTexts.newsletterTitle}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                {mergedTexts.newsletterDesc}
              </p>
            </div>
            
            <div className="w-full lg:w-auto relative z-10 flex flex-col sm:flex-row gap-3">
              {success ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-8 py-4 rounded-2xl flex items-center justify-center gap-3 w-full lg:w-[380px] shadow-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> 
                  <span className="font-bold text-sm tracking-wide">¡Suscripción exitosa!</span>
                </div>
              ) : (
                <>
                  <div className="relative w-full lg:w-80">
                    <input 
                      type="email" 
                      placeholder={mergedTexts.emailPlaceholder} 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 px-5 py-4 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm shadow-sm"
                    />
                  </div>
                  <button 
                    onClick={handleSubscribe}
                    disabled={submitting || !email}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-2 transition-all duration-300 hover:bg-red-700 shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {mergedTexts.subscribeBtn} 
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
            <div className="h-16 mb-6">
              <img src="/api/logo" alt="Montano Antilia" className="h-full w-auto object-contain" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 font-normal">
              {mergedTexts.aboutText}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 hover:text-pink-600 hover:border-pink-300 transition-all shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-slate-900 font-extrabold tracking-[0.2em] uppercase text-[11px] mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary"></span>
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
                  <Link href={link.href} className="text-slate-600 hover:text-primary transition-colors text-sm font-semibold inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-slate-900 font-extrabold tracking-[0.2em] uppercase text-[11px] mb-6 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              {mergedTexts.contactTitle}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-slate-600 text-sm font-medium pt-1.5">{contactInfo.mapAddress}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-slate-600 text-sm font-medium">{contactInfo.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-slate-600 text-sm font-medium break-all">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs tracking-wider uppercase text-center md:text-left font-semibold">
            {mergedTexts.footer}
          </p>
        </div>
      </div>
    </footer>
  );
}
