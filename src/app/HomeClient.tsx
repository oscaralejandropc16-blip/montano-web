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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white overflow-hidden font-sans">
      
      {/* Botón WhatsApp Flotante de Lujo */}
      <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
109:         </svg>
110:       </a>
111: 
112:       {/* NAVEGACIÓN - Glassmorphism Flotante */}
113:       <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-700 flex justify-center px-4 ${isScrolled ? 'translate-y-0' : 'translate-y-0'}`}>
114:         <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3 ${isScrolled ? "w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl" : "w-full max-w-7xl bg-transparent"}`}>
115:           
116:           <Link href="/" className="flex items-center group relative z-50">
117:             <img src="/logo.png" alt="Montano Antilia Logo" className={`w-auto object-contain transition-all duration-500 drop-shadow-2xl ${isScrolled ? 'h-8' : 'h-10'}`} />
118:           </Link>
119: 
120:           <div className="hidden lg:flex items-center gap-8">
121:             <a href="#inicio" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.home}</a>
122:             <Link href="/productos" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.products}</Link>
123:             <Link href="/about" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.about}</Link>
124:             <a href="#contacto" className="text-white/70 hover:text-white transition-colors text-[11px] uppercase tracking-[0.2em]">{t.nav.contact}</a>
125:             
126:             <div className="relative border-l border-white/10 pl-6 ml-2">
127:               <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-white/90 hover:text-white flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors group">
128:                 <Globe className="w-3.5 h-3.5 text-primary group-hover:animate-pulse" />
129:                 {t.nav.lang.split(" ")[1]}
130:                 <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
131:               </button>
132:               
133:               {langMenuOpen && (
134:                 <div className="absolute top-full mt-4 right-0 w-32 bg-[#111] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col py-2 border border-white/5 animate-fade-in-up">
135:                   {['es', 'en', 'it'].map((l) => (
136:                     <button key={l} onClick={() => { setLang(l as Language); setLangMenuOpen(false); }} className={`px-4 py-2.5 text-xs text-left transition-colors flex items-center gap-2 ${lang === l ? 'text-primary bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
137:                       {l === 'es' ? '🇪🇸 Español' : l === 'en' ? '🇺🇸 English' : '🇮🇹 Italiano'}
138:                     </button>
139:                   ))}
140:                 </div>
141:               )}
142:             </div>
143:           </div>
144: 
145:           <button className="lg:hidden text-white relative z-50 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
146:             <div className="w-6 h-5 flex flex-col justify-between">
147:               <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
148:               <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
149:               <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
150:             </div>
151:           </button>
152:         </div>
153:       </nav>
154: 
155:       {/* Menú Móvil Fullscreen */}
156:       <div className={`fixed inset-0 bg-[#0A0A0A] z-40 transition-all duration-700 flex flex-col justify-center px-10 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
157:         <div className="flex flex-col gap-8 text-left">
158:           <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.home}</a>
159:           <Link href="/productos" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.products}</Link>
160:           <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.about}</Link>
161:           <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-white text-4xl font-extrabold tracking-tighter hover:text-primary transition-colors">{t.nav.contact}</a>
162:           
163:           <div className="h-px w-full bg-white/10 my-4"></div>
164:           <div className="flex gap-6">
165:             <button onClick={() => { setLang("es"); setMobileMenuOpen(false); }} className={`text-sm font-bold ${lang === 'es' ? 'text-primary' : 'text-gray-500'}`}>ES</button>
166:             <button onClick={() => { setLang("en"); setMobileMenuOpen(false); }} className={`text-sm font-bold ${lang === 'en' ? 'text-primary' : 'text-gray-500'}`}>EN</button>
167:             <button onClick={() => { setLang("it"); setMobileMenuOpen(false); }} className={`text-sm font-bold ${lang === 'it' ? 'text-primary' : 'text-gray-500'}`}>IT</button>
168:           </div>
169:         </div>
170:       </div>
171: 
172:       <main>
173:         {/* HERO SECTION - Minimalista y Épico */}
174:         <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden">
175:           <div className="absolute inset-0 z-0 bg-black">
176:             <video key={heroVideoUrl} src={heroVideoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 mix-blend-lighten" />
177:             <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-[#050505]"></div>
178:             {/* Viñeta para centrar la vista */}
179:             <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>
180:           </div>
181: 
182:           <div className="relative z-10 px-6 w-full max-w-5xl mx-auto flex flex-col items-center mt-12">
183:             <p className={`text-primary font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-6 transition-all duration-1000 delay-100 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
184:               Alta Charcutería
185:             </p>
186:             <h1 className={`heading font-extrabold text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tighter leading-none mb-6 drop-shadow-2xl transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
187:               MONTANO
188:               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">ANTILIA</span>
189:             </h1>
190:             <p className={`text-lg md:text-2xl text-gray-400 font-light italic mb-14 max-w-2xl transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
191:               {t.hero.subtitle}
192:             </p>
193:             <div className={`transition-all duration-1000 delay-700 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
194:               <Link href="/productos" className="group relative inline-flex items-center justify-center bg-white text-black px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:scale-105">
195:                 <span className="relative z-10">{t.hero.btn}</span>
196:                 <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
197:                 <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">{t.hero.btn}</span>
198:               </Link>
199:             </div>
200:           </div>
201: 
202:           {/* Scroll Indicator */}
203:           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
204:             <span className="text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
205:             <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
206:           </div>
207:         </section>
208: 
209:         {/* SECCIÓN PRODUCTOS - Grid Estilo Bento Premium */}
210:         <section id="productos" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
211:           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
212:             <div>
213:               <h2 className="heading text-4xl md:text-5xl font-extrabold text-white mb-4">{t.products.title}</h2>
214:               <p className="text-gray-400 max-w-md text-sm leading-relaxed">Descubre nuestra selección exclusiva de embutidos, elaborados con los más altos estándares de calidad y pasión artesanal.</p>
215:             </div>
216:             <Link href="/productos" className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-white group">
217:               Ver todo el catálogo
218:               <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
219:                 <ChevronDown className="w-4 h-4 -rotate-90" />
220:               </div>
221:             </Link>
222:           </div>
223: 
224:           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
225:             {displayProducts.map((prod, idx) => (
226:               <Link href={`/productos/${prod.id}`} key={idx} className={`group relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col h-[500px] hover:border-white/20 transition-all duration-500 ${idx === 0 ? 'lg:col-span-2' : ''}`}>
227:                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
228:                 
229:                 {/* Imagen del producto grande y elegante */}
230:                 <div className="absolute inset-0 w-full h-full flex items-center justify-center p-10 z-0">
231:                   {prod.image_url ? (
232:                     <img src={getOptimizedUrl(prod.image_url, 800)} alt={prod.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" loading="lazy" />
233:                   ) : (
234:                     <div className="w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 font-bold text-xs tracking-widest uppercase">Sin Foto</div>
235:                   )}
236:                 </div>
237: 
238:                 {/* Info superpuesta */}
239:                 <div className="relative z-20 mt-auto p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
240:                   <div className="flex flex-wrap gap-2 mb-4">
241:                     {prod.tag && <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">{prod.tag}</span>}
242:                     {prod.brand && <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-primary/20">{prod.brand}</span>}
243:                   </div>
244:                   <h3 className="heading font-bold text-3xl text-white tracking-tight mb-2">{prod.name}</h3>
245:                   <div className="w-0 h-px bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
246:                 </div>
247:               </Link>
248:             ))}
249:           </div>
250:         </section>
251: 
252:         {/* NOSOTROS - Revista de Lujo */}
253:         <section id="nosotros" className="py-32 relative bg-[#0A0A0A] border-y border-white/5">
254:           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
255:           <div className="max-w-7xl mx-auto px-6 relative z-10">
256:             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
257:               
258:               <div className="order-2 lg:order-1 relative">
259:                 <div className="absolute -left-10 -top-10 text-[10rem] font-extrabold text-white/5 select-none leading-none heading tracking-tighter">EST.</div>
260:                 <h2 className="heading text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight relative z-10">
261:                   {t.about.title}
262:                 </h2>
263:                 <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed mb-10">
264:                   <p>
265:                     {t.about.text1}<strong className="text-white font-medium">{t.about.text2}</strong>{t.about.text3}
266:                   </p>
267:                   <p>
268:                     <strong className="text-white font-medium">{t.about.text4}</strong>{t.about.text5}
269:                   </p>
270:                 </div>
271:                 <Link href="/about" className="inline-flex items-center gap-4 text-white text-xs font-bold tracking-[0.2em] uppercase hover:text-primary transition-colors group">
272:                   <span className="border-b border-transparent group-hover:border-primary pb-1 transition-all">{t.about.btn}</span>
273:                   <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
274:                 </Link>
275:               </div>
276: 
277:               <div className="order-1 lg:order-2 relative">
278:                 <div className="aspect-[3/4] rounded-3xl overflow-hidden relative group shadow-2xl">
279:                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
280:                   {settings.about_img ? (
281:                     <img src={getOptimizedUrl(settings.about_img, 800)} alt="Montano Antilia" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
282:                   ) : (
283:                     <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500 font-bold text-xs tracking-widest uppercase">Foto de Fábrica</div>
284:                   )}
285:                 </div>
286:                 {/* Sello de calidad flotante */}
287:                 <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-white/10 bg-[#050505]/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-spin-slow shadow-2xl">
288:                   <span className="text-primary font-bold text-2xl heading">+30</span>
289:                   <span className="text-white text-[8px] tracking-[0.2em] uppercase">Años de Calidad</span>
290:                 </div>
291:               </div>
292: 
293:             </div>
294:           </div>
295:         </section>
296: 
297:         {/* GALERÍA SOCIAL */}
298:         <section className="py-20 overflow-hidden bg-[#050505]">
299:           <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
300:             <div>
301:               <h2 className="heading text-3xl font-bold text-white mb-2">{t.social.title}</h2>
302:               <p className="text-gray-500 text-sm">{t.social.sub}</p>
303:             </div>
304:             <div className="flex gap-4">
305:               <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gradient-to-tr hover:from-[#FD1D1D] hover:to-[#E1306C] hover:border-transparent transition-all">
306:                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
307:               </a>
308:               <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
309:                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
310:               </a>
311:             </div>
312:           </div>
313: 
314:           {/* Grid de imágenes sin espacios estilo feed */}
315:           <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
316:             {[1, 2, 3, 4].map(i => {
317:               const img = settings[`gallery_img_${i}`];
318:               return (
319:                 <div key={i} className="aspect-square bg-[#111] relative group overflow-hidden">
320:                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
321:                     <span className="text-white text-xs font-bold tracking-widest uppercase border border-white px-4 py-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Ver Más</span>
322:                   </div>
323:                   {img ? (
324:                     img.match(/\.(mp4|webm|mov)$/i) ? (
325:                       <video src={img} autoPlay loop muted playsInline className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
326:                     ) : (
327:                       <img src={getOptimizedUrl(img, 600)} alt={`Galería ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
328:                     )
329:                   ) : null}
330:                 </div>
331:               );
332:             })}
333:           </div>
334:         </section>
335: 
336:         {/* CONTACTO - Sleek Dark Form */}
337:         <section id="contacto" className="py-32 relative bg-[#0A0A0A]">
338:           <div className="max-w-7xl mx-auto px-6">
339:             <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
340:               
341:               <div className="w-full lg:w-5/12">
342:                 <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Soporte y Ventas</span>
343:                 <h2 className="heading text-5xl font-extrabold text-white mb-8">{t.contact.title}</h2>
344:                 <p className="text-gray-400 font-light leading-relaxed mb-12">
345:                   Estamos aquí para atender tus pedidos y resolver cualquier inquietud. Comunícate con nuestros asesores para recibir atención personalizada.
346:                 </p>
347: 
348:                 <div className="space-y-8">
349:                   <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-6 group">
350:                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors mt-1">
351:                       <Mail className="w-5 h-5" />
352:                     </div>
353:                     <div>
354:                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Correo Electrónico</p>
355:                       <p className="text-white text-lg font-medium group-hover:text-primary transition-colors break-all">{contactInfo.email}</p>
356:                     </div>
357:                   </a>
358:                   
359:                   <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group">
360:                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#25D366] transition-colors mt-1">
361:                       <Phone className="w-5 h-5" />
362:                     </div>
363:                     <div>
364:                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">WhatsApp Ventas</p>
365:                       <p className="text-white text-lg font-medium group-hover:text-[#25D366] transition-colors">{contactInfo.whatsappDisplay}</p>
366:                     </div>
367:                   </a>
368: 
369:                   <a href={contactInfo.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-6 group">
370:                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white transition-colors mt-1">
371:                       <MapPin className="w-5 h-5" />
372:                     </div>
373:                     <div>
374:                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Sede Principal</p>
375:                       <p className="text-white text-lg font-medium group-hover:text-gray-300 transition-colors">Av. Bolívar Oeste N° 314<br/>Carabobo, Venezuela</p>
376:                     </div>
377:                   </a>
378:                 </div>
379:               </div>
380: 
381:               <div className="w-full lg:w-7/12">
382:                 <div className="bg-[#111] p-10 lg:p-16 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
383:                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
384:                   
385:                   <h3 className="heading text-2xl font-bold text-white mb-10">Envíanos un mensaje</h3>
386:                   
387:                   <form className="space-y-8" onSubmit={handleContactSubmit}>
388:                     <div>
389:                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tu Nombre</label>
390:                       <input 
391:                         type="text" 
392:                         required
393:                         value={contactForm.name}
394:                         onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
395:                         className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" 
396:                         placeholder="Ej: Carlos Pérez" 
397:                       />
398:                     </div>
399:                     
400:                     <div>
401:                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tu Correo Electrónico</label>
402:                       <input 
403:                         type="email" 
404:                         value={contactForm.email}
405:                         onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
406:                         className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" 
407:                         placeholder="correo@empresa.com" 
408:                       />
409:                     </div>
410:                     
411:                     <div>
412:                       <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tu Mensaje</label>
413:                       <textarea 
414:                         rows={4} 
415:                         required
416:                         value={contactForm.message}
417:                         onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
418:                         className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-sm" 
419:                         placeholder="¿En qué podemos ayudarte?"
420:                       ></textarea>
421:                     </div>
422:                     
423:                     <button type="submit" className="w-full bg-white text-black px-8 py-5 rounded-xl text-sm font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all duration-300 mt-4 group flex justify-center items-center gap-3">
424:                       {t.contact.send}
425:                       <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
426:                     </button>
427:                   </form>
428:                 </div>
429:               </div>
430: 
431:             </div>
432:           </div>
433:         </section>
434:       </main>
435: 
436:       {/* FOOTER */}
437:       <div className="border-t border-white/5 bg-[#0A0A0A]">
438:         <Footer 
439:           texts={{
440:             aboutText: t.about.text1 + t.about.text2 + t.about.text3 + t.about.text4 + t.about.text5,
441:             quickLinksTitle: "Navegación",
442:             contactTitle: "Contacto Directo",
443:             nav: t.nav,
444:             footer: t.footer
445:           }}
446:           contactInfo={contactInfo}
447:         />
448:       </div>
449:     </div>
450:   );
451: }
