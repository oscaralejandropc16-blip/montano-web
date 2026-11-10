"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChefHat, Check, Building2, Phone, Sparkles } from "lucide-react";

interface ChristmasSectionProps {
  whatsappRaw?: string;
}

const RECIPE_CARDS = [
  {
    id: "pan-de-jamon",
    title: "Pan de Jamón Casero",
    subtitle: "Elaborado con Jamón Ahumado y Tocineta Montano Antilia",
    tag: "Receta Tradicional",
    tagColor: "bg-black/70 text-white",
    description:
      "Para lograr el auténtico pan de jamón venezolano en casa, el secreto está en usar jamón ahumado tierno con corte generoso y tocineta crocante bien distribuida, junto a uvas pasas y aceitunas verdes.",
    image: "/christmas/pan_de_jamon.jpg",
    ingredients: [
      "Jamón Ahumado Montano Antilia en rebanadas",
      "Tocineta Ahumada en tiras para hornear",
      "Uvas pasas selectas y aceitunas verdes rellenas",
    ],
    catalogLink: "/productos",
    catalogText: "Ver Jamones en Catálogo",
  },
  {
    id: "jamon-planchado",
    title: "Jamón Planchado Glaseado",
    subtitle: "Elaborado con Jamón Cocido Montano Antilia",
    tag: "Cena de Nochebuena",
    tagColor: "bg-primary/90 text-white",
    description:
      "Una tradición para compartir en familia: corte de Jamón Cocido Montano Antilia horneado a fuego medio con caramelo de azúcar morena o papelón, rodajas de piña fresca y clavos de olor.",
    image: "/christmas/jamon_planchado.jpg",
    ingredients: [
      "Jamón Cocido Montano Antilia (bloque o cilindro)",
      "Glaseado de papelón o azúcar morena y piña",
      "Clavos de olor y cerezas para decorar",
    ],
    catalogLink: "/productos",
    catalogText: "Ver Jamón Cocido",
  },
  {
    id: "ingredientes-hallacas",
    title: "El Guiso para tus Hallacas",
    subtitle: "Con Tocineta Ahumada Montano Antilia",
    tag: "Guiso Navideño",
    tagColor: "bg-emerald-900/90 text-white",
    description:
      "El sabor profundo del guiso tradicional venezolano comienza con un buen sofrito realzado con tocineta ahumada natural, aportando esa textura y aroma inconfundible a cada hallaca.",
    image: "/christmas/hallacas.jpg",
    ingredients: [
      "Tocineta Ahumada Montano Antilia en cubos",
      "Ahumado natural a leña que enriquece el guiso",
      "Carne seleccionada con proporción balanceada",
    ],
    catalogLink: "/productos",
    catalogText: "Ver Ahumados",
  },
  {
    id: "tabla-navidena",
    title: "Tabla de Charcutería Festiva",
    subtitle: "Surtido de Especialidades y Chorizos",
    tag: "Compartir & Brindis",
    tagColor: "bg-slate-800/90 text-white",
    description:
      "Arma una presentación elegante para tus reuniones de fin de año con nuestra línea de chorizos parrilleros, salchichas tipo polaca, fiambres y embutidos artesanales.",
    image: "/christmas/tabla_navidena.jpg",
    ingredients: [
      "Chorizo parrillero con ajo y salchicha tipo polaca",
      "Fiambres cocidos y jamones seleccionados",
      "Presentación gourmet para celebraciones",
    ],
    catalogLink: "/productos",
    catalogText: "Ver Especialidades",
  },
];

export default function ChristmasSection({
  whatsappRaw = "584243249097",
}: ChristmasSectionProps) {
  return (
    <section
      id="navidad"
      className="py-24 sm:py-32 relative z-10 overflow-hidden bg-gradient-to-b from-[#090D16] via-[#0F172A] to-[#0A101D] text-white border-y border-white/10"
    >
      {/* Resplandores ambientales de fondo festivo gourmet */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Encabezado de Sección Rediseñado y Altamente Llamativo */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          
          {/* Badge superior premium en vidrio esmerilado */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md text-red-400 text-xs font-bold tracking-[0.25em] uppercase mb-6 shadow-lg shadow-black/20">
            <ChefHat className="w-4 h-4 text-primary" />
            <span>Tradición Culinaria & Charcutería Premium</span>
          </div>

          {/* Título Principal Imponente */}
          <h2 className="heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-md">
            Recetas Navideñas con la{" "}
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-primary to-rose-200">
              Calidad Montano Antilia
            </span>
          </h2>

          {/* Descripción Gourmet Clara */}
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            Nuestros jamones horneados, tocinetas ahumadas a leña y embutidos seleccionados son los ingredientes predilectos para llevar el auténtico sabor venezolano a tu mesa familiar.
          </p>

          {/* Puntos destacados de garantía gastronómica */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ahumado Natural Tradicional
            </span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Cortes Seleccionados de Cerdo
            </span>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              El Auténtico Sabor que Conquista
            </span>
          </div>
        </div>

        {/* Grid de Recetas e Ideas en Fondo Oscuro Gourmet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {RECIPE_CARDS.map((item) => (
            <div
              key={item.id}
              className="group/card relative rounded-[2.2rem] bg-slate-900/80 border border-white/10 shadow-2xl hover:border-primary/50 hover:shadow-red-950/30 transition-all duration-500 flex flex-col overflow-hidden backdrop-blur-md"
            >
              {/* Imagen de la preparación culinaria */}
              <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Badge de Categoría con fondo esmerilado */}
                <div className="absolute top-5 left-5 z-20">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md border border-white/20 backdrop-blur-md ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Título sobre la imagen */}
                <div className="absolute bottom-5 left-6 right-6 z-20 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="heading text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Contenido descriptivo */}
              <div className="p-7 sm:p-9 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Ingredientes / Características */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] font-extrabold text-red-400 uppercase tracking-widest block mb-2">
                      Ingredientes recomendados:
                    </span>
                    {item.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-200">
                        <span className="w-4 h-4 rounded-md bg-primary/20 text-red-400 flex items-center justify-center shrink-0 border border-primary/30 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón hacia el catálogo */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Embutidos de Fábrica
                  </span>

                  <Link
                    href={item.catalogLink}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md shadow-primary/30"
                  >
                    <span>{item.catalogText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Corporativo para Comercios y Distribuidores */}
        <div className="relative rounded-[2.2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-white/15 overflow-hidden">
          {/* Luz ambiental sutil */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-red-400 text-xs font-bold tracking-widest uppercase mb-3">
                <span className="w-6 h-[2px] bg-primary"></span>
                <Building2 className="w-4 h-4" />
                <span>Atención a Comercios & Distribuidores</span>
              </div>
              <h3 className="heading text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Abastece tu negocio con los mejores embutidos esta temporada
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                Contamos con despacho puntual y precios directos de fábrica para charcuterías, panaderías, supermercados y empresas que preparan sus pedidos de fin de año.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href={`https://wa.me/${whatsappRaw}?text=${encodeURIComponent(
                  "Hola Montano Antilia, me gustaría consultar la lista de precios y condiciones al mayor para compras de fin de año."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase px-7 py-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>Contactar Asesor</span>
              </a>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-widest uppercase px-7 py-4 rounded-xl transition-all duration-300 hover:scale-105"
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
