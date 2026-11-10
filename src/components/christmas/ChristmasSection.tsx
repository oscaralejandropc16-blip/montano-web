"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChefHat, Check, Building2, Phone } from "lucide-react";

interface ChristmasSectionProps {
  whatsappRaw?: string;
}

const RECIPE_CARDS = [
  {
    id: "pan-de-jamon",
    title: "Pan de Jamón Casero",
    subtitle: "Elaborado con Jamón Ahumado y Tocineta Montano Antilia",
    tag: "Receta Tradicional",
    tagColor: "bg-slate-900 text-white",
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
    tagColor: "bg-primary text-white",
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
    tagColor: "bg-emerald-800 text-white",
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
    tagColor: "bg-slate-800 text-white",
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
      className="py-24 sm:py-28 relative z-10 overflow-hidden bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-5">
            <ChefHat className="w-4 h-4 text-primary" />
            <span>Inspiración Culinaria de Temporada</span>
          </div>

          <h2 className="heading text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Recetas Navideñas con la Calidad{" "}
            <span className="text-primary">Montano Antilia</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Nuestros jamones, tocinetas y embutidos son los ingredientes preferidos para preparar los platos más emblemáticos de las fiestas familiares. Descubre cómo integrarlos en tus recetas tradicionales.
          </p>
        </div>

        {/* Grid de Recetas e Ideas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {RECIPE_CARDS.map((item) => (
            <div
              key={item.id}
              className="group/card relative rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Imagen de la preparación */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge de Categoría */}
                <div className="absolute top-5 left-5 z-20">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Título sobre la imagen */}
                <div className="absolute bottom-5 left-6 right-6 z-20 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="heading text-2xl sm:text-3xl font-extrabold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Contenido descriptivo */}
              <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Ingredientes / Características */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                      Ingredientes recomendados:
                    </span>
                    {item.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-red-50 text-primary flex items-center justify-center shrink-0 border border-red-100 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón hacia el catálogo */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Embutidos de Calidad
                  </span>

                  <Link
                    href={item.catalogLink}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-sm"
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
        <div className="relative rounded-[2rem] bg-slate-900 text-white p-8 sm:p-12 shadow-lg border border-slate-800 overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/15">
                <Building2 className="w-3.5 h-3.5 text-red-400" />
                <span>Atención a Comercios & Distribuidores</span>
              </div>
              <h3 className="heading text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                Abastece tu negocio con los mejores embutidos esta temporada
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white font-bold text-xs tracking-widest uppercase px-7 py-4 rounded-full shadow-md transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Contactar Asesor</span>
              </a>
              <Link
                href="/productos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs tracking-widest uppercase px-7 py-4 rounded-full transition-colors"
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
