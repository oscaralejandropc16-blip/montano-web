"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Info, MessageCircle, ChevronRight, Check, Globe, ChevronDown } from "lucide-react";
import ZoomableImage from "./ZoomableImage";
import Footer from "@/components/Footer";
import { translations, Language } from "@/lib/translations";

const translateProductData = (text: string, lang: Language) => {
  if (!text || lang === 'es') return text;
  
  const dict: Record<string, Record<string, string>> = {
    "Jamones": { en: "Hams", it: "Prosciutti", pt: "Presuntos", fr: "Jambons", de: "Schinken" },
    "Ahumados": { en: "Smoked", it: "Affumicati", pt: "Defumados", fr: "Fumés", de: "Geräuchert" },
    "Fiambres": { en: "Cold Cuts", it: "Salumi", pt: "Frios", fr: "Charcuterie", de: "Aufschnitt" },
    "Especialidades": { en: "Specialties", it: "Specialità", pt: "Especialidades", fr: "Spécialités", de: "Spezialitäten" },
    "Chorizos": { en: "Chorizos", it: "Chorizo", pt: "Chouriços", fr: "Chorizos", de: "Chorizos" },
    "Mortadelas": { en: "Mortadellas", it: "Mortadella", pt: "Mortadelas", fr: "Mortadelles", de: "Mortadella" },
    "Pepperoni": { en: "Pepperoni", it: "Pepperoni", pt: "Pepperoni", fr: "Pepperoni", de: "Pepperoni" },
    "Salchichas": { en: "Sausages", it: "Salsicce", pt: "Salsichas", fr: "Saucisses", de: "Würstchen" },
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

export default function ProductClient({ product, relatedProducts, brandObj, brands }: any) {
  const [lang, setLang] = useState<Language>("es");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('montano_lang') as Language;
    if (savedLang && ['es', 'en', 'it', 'pt', 'fr', 'de'].includes(savedLang)) {
      setLang(savedLang);
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'montano_lang' && e.newValue) {
        setLang(e.newValue as Language);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
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
    <div className="min-h-screen bg-[#FAFAFA] text-foreground font-sans">
      
      {/* NAVEGACIÓN */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl py-3 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/productos" className="flex items-center gap-2 transition-colors group text-gray-500 hover:text-primary">
              <div className="p-2 rounded-full group-hover:-translate-x-1 transition-transform border bg-gray-50 border-gray-200">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-[0.2em] text-[10px] uppercase hidden sm:block">{t.aboutPage.back}</span>
            </Link>
            <div className="h-8 md:h-10 w-[1px] bg-gray-200 hidden sm:block"></div>
            <Link href="/" className="flex items-center">
              <div className="h-12 md:h-14 relative">
                <img src="/api/logo" alt="Montano Antilia Logo" className="h-full w-auto object-contain drop-shadow-sm" />
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">{t.nav.home}</Link>
            <Link href="/productos" className="text-primary font-bold transition-colors tracking-widest text-xs uppercase border-b-2 border-primary pb-1">{t.nav.catalog}</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">{t.nav.about}</Link>
            <a href="/#contacto" className="text-gray-600 hover:text-primary transition-colors font-bold tracking-widest text-xs uppercase">{t.nav.contact}</a>
            
            {/* Language Selector */}
            <div className="relative border-l border-gray-200 pl-6 ml-2">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="text-gray-600 hover:text-primary flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors group font-bold"
              >
                <Globe className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
                {t.nav.lang.split(" ")[1]}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {langMenuOpen && (
                <div className="absolute top-full right-0 mt-4 bg-white backdrop-blur-xl border border-gray-100 rounded-2xl py-2 w-36 flex flex-col shadow-2xl animate-in fade-in slide-in-from-top-2 z-50">
                  {(['es', 'en', 'it', 'pt', 'fr', 'de'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLanguageChange(l)}
                      className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-primary bg-gray-50' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                    >
                      {translations[l].nav.lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link href="/productos" className="lg:hidden flex items-center gap-2 text-gray-500 hover:text-primary transition-colors group">
            <div className="bg-gray-100 p-2 rounded-full border border-gray-200">
              <ArrowLeft className="w-3 h-3" />
            </div>
            <span className="font-bold tracking-[0.2em] text-[10px] uppercase">{t.nav.catalog}</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 mb-10">
            <Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/productos" className="hover:text-primary transition-colors">{t.nav.catalog}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">{translateProductData(product.category, lang)}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Columna Izquierda: Imagen Principal con Zoom */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] transform -rotate-1 group-hover:rotate-0 transition-transform duration-700 z-0"></div>
                <div className="relative z-10 bg-white rounded-[2rem] p-4 shadow-2xl border border-gray-100">
                  {product.image_url ? (
                    <ZoomableImage src={product.image_url} alt={translateProductData(product.name, lang)} />
                  ) : (
                    <div className="w-full aspect-square bg-[#F8F8F8] rounded-2xl flex items-center justify-center">
                      <span className="text-gray-300 font-extrabold text-2xl tracking-widest">[FOTO PENDIENTE]</span>
                    </div>
                  )}
                  {/* Etiqueta Calidad */}
                  <div className="absolute top-8 left-8 z-20 pointer-events-none">
                    <span className="bg-black/90 backdrop-blur text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg text-white">
                      {lang === 'es' ? 'Calidad Premium' : t.aboutPage.stat2}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Información y Compra */}
            <div className="w-full lg:w-1/2 pt-4">
              
              <div className="mb-8">
                <div className="flex items-center gap-6 mb-4">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-extrabold tracking-[0.2em] uppercase text-[10px]">{translateProductData(product.category, lang)}</span>
                  {brandObj && brandObj.logo_url && (
                    <div className="h-16 w-32 flex items-center justify-start">
                      <img src={brandObj.logo_url} alt={brandObj.name} className="h-full w-full object-contain object-left drop-shadow-md" />
                    </div>
                  )}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-black mb-4 leading-[1.1] tracking-tight">
                  {translateProductData(product.name, lang)}
                </h1>
                
                <div className="flex items-center gap-4 mt-6">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-primary font-bold italic font-serif">kg</div>
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                        {lang === 'es' ? 'Presentación' : 'Presentation'}
                      </p>
                      <p className="text-sm font-extrabold text-black">{product.tag}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <h3 className="text-xl font-extrabold text-black mb-2">
                  {lang === 'es' ? '¿Interesado en este producto?' : 'Interested in this product?'}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {lang === 'es' ? 'Contáctanos vía WhatsApp para confirmar disponibilidad y precios actualizados.' : 'Contact us via WhatsApp to confirm availability and updated prices.'}
                </p>
                
                <a 
                  href={`https://wa.me/584243249097?text=${encodeURIComponent(`Hola Montano Antilia, estoy interesado en conocer precios y disponibilidad de: ${product.name} (${product.tag})`)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#1DA851] transition-all shadow-lg shadow-[#25D366]/30 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" /> 
                  {lang === 'es' ? 'Consultar Precios' : 'Check Prices'}
                </a>
                
                <div className="mt-5 space-y-2">
                  <p className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Check className="w-3.5 h-3.5 text-primary" /> 
                    {lang === 'es' ? 'Ventas al mayor y gran mayor disponibles.' : 'Wholesale and large volume sales available.'}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Check className="w-3.5 h-3.5 text-primary" /> 
                    {lang === 'es' ? 'Ventas al detal en nuestra distribuidora.' : 'Retail sales at our distribution center.'}
                  </p>
                </div>
              </div>

              {/* Detalles */}
              <div className="space-y-6">
                
                {product.description && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                    <h4 className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
                      <Info className="w-3.5 h-3.5 text-primary" /> 
                      {lang === 'es' ? 'Descripción General' : 'General Description'}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.ingredients && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
                        {lang === 'es' ? 'Ingredientes' : 'Ingredients'}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>
                  )}

                  {product.preservation && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-3">
                        {lang === 'es' ? 'Conservación' : 'Preservation'}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.preservation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Información Nutricional */}
                {product.nutrition_url && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">
                      {lang === 'es' ? 'Información Nutricional' : 'Nutritional Information'}
                    </h4>
                    <div className="max-w-xs mx-auto">
                      <ZoomableImage src={product.nutrition_url} alt="Información Nutricional" />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* PRODUCTOS RELACIONADOS */}
          {relatedProducts.length > 0 && (
            <div className="mt-32 pt-20 border-t border-gray-100">
              <h2 className="heading text-3xl font-extrabold text-black mb-10 text-center">
                {lang === 'es' ? 'También te podría interesar' : 'You might also like'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {relatedProducts.map((rel: any) => (
                  <Link href={`/productos/${rel.id}`} key={rel.id} className="group cursor-pointer">
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 h-full flex flex-col relative">
                      <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-xl overflow-hidden relative mb-4 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        {rel.image_url ? (
                          <img src={rel.image_url} alt={translateProductData(rel.name, lang)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <span className="text-gray-300 font-bold text-sm">[FOTO {rel.id}]</span>
                        )}
                      </div>
                      <div className="px-2 pb-2">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-primary text-[9px] font-extrabold tracking-widest uppercase">{rel.tag}</p>
                          {(() => {
                            const b = brands.find((b: any) => b.name === rel.brand);
                            if (b && b.logo_url) {
                              return (
                                <div className="h-6 w-16 flex items-center justify-end">
                                  <img src={b.logo_url} alt={b.name} className="h-full w-full object-contain object-right transition-transform group-hover:scale-105" />
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                        <h4 className="font-bold text-black group-hover:text-primary transition-colors">{translateProductData(rel.name, lang)}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

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
