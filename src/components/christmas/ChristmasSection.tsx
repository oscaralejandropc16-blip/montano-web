"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, Star, Gift, Utensils, Heart } from "lucide-react";
import ChristmasSantaHat from "./ChristmasSantaHat";

interface ChristmasSectionProps {
  whatsappRaw?: string;
}

const HOLIDAY_SPECIALS = [
  {
    id: "pan-de-jamon",
    title: "Pan de Jamón Tradicional",
    subtitle: "El protagonista de la mesa venezolana",
    description:
      "Elaborado con nuestro jamón ahumado tierno de primera calidad, tocineta crocante, jugosas pasas y aceitunas verdes rellenas. La combinación perfecta de dulce y salado que no puede faltar en tu mesa.",
    image: "/christmas/pan_de_jamon.jpg",
    badge: "⭐ Tradición de la Casa",
    badgeColor: "bg-amber-500 text-slate-950",
    ribbon: "Imprescindible",
    highlights: ["Jamón Ahumado Premium", "Tocineta Crujiente", "Pasas y Aceitunas Selectas"],
    whatsappText: "¡Hola Montano Antilia! 🎄 Quisiera información y precios sobre los jamones y tocineta para preparar Pan de Jamón artesanal.",
  },
  {
    id: "jamon-planchado",
    title: "Jamón Planchado Caramelizado",
    subtitle: "El rey del banquete de Nochebuena",
    description:
      "Una joya culinaria: jamón cocido seleccionado cubierto con una capa crujiente caramelizada de azúcar morena, jugo de piña fresca y clavos de olor. El centro de mesa más esperado para el 24 y 31 de diciembre.",
    image: "/christmas/jamon_planchado.jpg",
    badge: "👑 Estrella de Nochebuena",
    badgeColor: "bg-red-600 text-white",
    ribbon: "Edición Navideña",
    highlights: ["Caramelizado Artesanal", "Piña y Cerezas Glaseadas", "Sabor Agridulce Exquisito"],
    whatsappText: "¡Hola Montano Antilia! 🎅 Me gustaría encargar un Jamón Planchado Navideño para nuestra cena familiar.",
  },
  {
    id: "ingredientes-hallacas",
    title: "Tocineta & Embutidos para Hallacas",
    subtitle: "El secreto del mejor guiso navideño",
    description:
      "La hallaca perfecta nace de los mejores ingredientes. Nuestra tocineta ahumada y carnes selectas le otorgan a tu guiso tradicional ese sabor profundo y ahumado inconfundible que une a toda la familia.",
    image: "/christmas/hallacas.jpg",
    badge: "✨ El Secreto de la Hallaca",
    badgeColor: "bg-emerald-600 text-white",
    ribbon: "Para la Familia",
    highlights: ["Tocineta Ahumada de Corte Grueso", "Carne Porcina Seleccionada", "Ahumado Natural a Leña"],
    whatsappText: "¡Hola Montano Antilia! 🎁 Quiero consultar disponibilidad de tocineta ahumada y cortes para las hallacas de esta temporada.",
  },
  {
    id: "tabla-navidena",
    title: "Tabla Festiva de Charcutería Fina",
    subtitle: "Para compartir y brindar en familia",
    description:
      "Un surtido exclusivo de fiambres finos, jamones curados, ahumados especiales y embutidos artesanales. Acompañada con quesos madurados, nueces y frutos secos para recibir el Año Nuevo con elegancia.",
    image: "/christmas/tabla_navidena.jpg",
    badge: "🥂 Para Brindar & Celebrar",
    badgeColor: "bg-purple-600 text-white",
    ribbon: "Gourmet VIP",
    highlights: ["Surtido de Ahumados y Salchichas", "Selección Curada Artesanal", "Ideal para Fiestas y Eventos"],
    whatsappText: "¡Hola Montano Antilia! 🥂 Quisiera cotizar una tabla de charcutería fina para un compartir navideño.",
  },
];

export default function ChristmasSection({
  whatsappRaw = "584243249097",
}: ChristmasSectionProps) {
  return (
    <section
      id="navidad"
      className="py-24 sm:py-32 relative z-10 overflow-hidden bg-gradient-to-b from-[#FEF2F2] via-white to-[#F0FDF4] border-y border-red-100"
    >
      {/* Fondo decorativo festivo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-emerald-700 text-white px-5 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-md shadow-red-500/20 relative">
            <span className="text-base">🎄</span>
            <span>Especial de Temporada Navideña</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
          </div>

          <h2 className="heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            El Sabor de la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-emerald-700">
              Navidad Venezolana
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            En cada rincón de Venezuela, la magia de las fiestas cobra vida alrededor de la mesa.
            En <strong>Montano Antilia</strong> elaboramos con orgullo los ingredientes que hacen de tus
            cenas de Nochebuena y Fin de Año momentos inolvidables.
          </p>
        </div>

        {/* Grid de 4 Especialidades Navideñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {HOLIDAY_SPECIALS.map((item) => (
            <div
              key={item.id}
              className="group/card relative rounded-[2.5rem] bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-red-300 transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2"
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
              }}
            >
              {/* Contenedor de Imagen con Overlay y Badge */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge Superior */}
                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Gorrito de Santa en esquina */}
                <div className="absolute top-2 right-4 z-20 opacity-90 group-hover/card:rotate-12 transition-transform duration-300">
                  <ChristmasSantaHat size={34} />
                </div>

                {/* Título sobre imagen en pantallas pequeñas/medianas */}
                <div className="absolute bottom-5 left-6 right-6 z-20 text-white">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="heading text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Contenido descriptivo de la tarjeta */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Highlights de ingredientes */}
                  <div className="space-y-2 mb-8">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                          ✓
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de Orden por WhatsApp */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Disponible para encargo</span>
                  </div>

                  <a
                    href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(item.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md shadow-red-600/25 hover:shadow-lg hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>Cotizar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Navideño Corporativo / Familias Grandes */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#14532D] via-[#0F3920] to-[#7F1D1D] text-white p-8 sm:p-12 shadow-xl border border-amber-300/40 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border border-amber-300/30">
                <Gift className="w-3.5 h-3.5" />
                <span>Combos Corporativos & Familiares</span>
              </div>
              <h3 className="heading text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                ¿Planeas el compartir navideño de tu empresa o familia?
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Ofrecemos precios especiales al mayor en jamones navideños, tocinetas, chorizos y combos de charcutería fina para empresas, restaurantes y reuniones numerosas.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                  "¡Hola Montano Antilia! 🎄 Quisiera información sobre combos corporativos y pedidos al mayor para la temporada navideña."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-widest uppercase px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span>Solicitar Cotización</span>
              </a>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300"
              >
                <span>Ver Catálogo</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
