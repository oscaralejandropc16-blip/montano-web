"use client";

import { useState } from "react";
import { saveSetting } from "@/lib/actions";
import { toast } from "react-hot-toast";
import SearchableSelect from "@/components/SearchableSelect";
import MediaSelector from "@/components/MediaSelector";

export default function AjustesClient({ settings, products = [] }: { settings: Record<string, string>, products?: any[] }) {
  const [heroVideoUrl, setHeroVideoUrl] = useState(settings.hero_video_url || "/hero-video.mp4");
  const [siteLogo, setSiteLogo] = useState(settings.site_logo || "/logo.png");
  
  const [fp1, setFp1] = useState(settings.featured_product_1 || "");
  const [fp2, setFp2] = useState(settings.featured_product_2 || "");
  const [fp3, setFp3] = useState(settings.featured_product_3 || "");
  
  const [catalogPdfUrl, setCatalogPdfUrl] = useState(settings.catalog_pdf_url || "");

  // Estados para Recetas Navideñas
  const [r1Title, setR1Title] = useState(settings.recipe_1_title || "Pan de Jamón Casero");
  const [r1Subtitle, setR1Subtitle] = useState(settings.recipe_1_subtitle || "Elaborado con Jamón Ahumado y Tocineta Montano Antilia");
  const [r1Tag, setR1Tag] = useState(settings.recipe_1_tag || "Receta Tradicional");
  const [r1Desc, setR1Desc] = useState(settings.recipe_1_desc || "Para lograr el auténtico pan de jamón venezolano en casa, el secreto está en usar jamón ahumado tierno con corte generoso y tocineta crocante bien distribuida, junto a uvas pasas y aceitunas verdes.");
  const [r1Ingredients, setR1Ingredients] = useState(settings.recipe_1_ingredients || "Jamón Ahumado Montano Antilia en rebanadas\nTocineta Ahumada en tiras para hornear\nUvas pasas selectas y aceitunas verdes rellenas");

  const [r2Title, setR2Title] = useState(settings.recipe_2_title || "Jamón Planchado Glaseado");
  const [r2Subtitle, setR2Subtitle] = useState(settings.recipe_2_subtitle || "Elaborado con Jamón Cocido Montano Antilia");
  const [r2Tag, setR2Tag] = useState(settings.recipe_2_tag || "Cena de Nochebuena");
  const [r2Desc, setR2Desc] = useState(settings.recipe_2_desc || "Una tradición para compartir en familia: corte de Jamón Cocido Montano Antilia horneado a fuego medio con caramelo de azúcar morena o papelón, rodajas de piña fresca y clavos de olor.");
  const [r2Ingredients, setR2Ingredients] = useState(settings.recipe_2_ingredients || "Jamón Cocido Montano Antilia (bloque o cilindro)\nGlaseado de papelón o azúcar morena y piña\nClavos de olor y cerezas para decorar");

  const [r3Title, setR3Title] = useState(settings.recipe_3_title || "El Guiso para tus Hallacas");
  const [r3Subtitle, setR3Subtitle] = useState(settings.recipe_3_subtitle || "Con Tocineta Ahumada Montano Antilia");
  const [r3Tag, setR3Tag] = useState(settings.recipe_3_tag || "Guiso Navideño");
  const [r3Desc, setR3Desc] = useState(settings.recipe_3_desc || "El sabor profundo del guiso tradicional venezolano comienza con un buen sofrito realzado con tocineta ahumada natural, aportando esa textura y aroma inconfundible a cada hallaca.");
  const [r3Ingredients, setR3Ingredients] = useState(settings.recipe_3_ingredients || "Tocineta Ahumada Montano Antilia en cubos\nAhumado natural a leña que enriquece el guiso\nCarne seleccionada con proporción balanceada");

  const [r4Title, setR4Title] = useState(settings.recipe_4_title || "Tabla de Charcutería Festiva");
  const [r4Subtitle, setR4Subtitle] = useState(settings.recipe_4_subtitle || "Surtido de Especialidades y Chorizos");
  const [r4Tag, setR4Tag] = useState(settings.recipe_4_tag || "Compartir & Brindis");
  const [r4Desc, setR4Desc] = useState(settings.recipe_4_desc || "Arma una presentación elegante para tus reuniones de fin de año con nuestra línea de chorizos parrilleros, salchichas tipo polaca, fiambres y embutidos artesanales.");
  const [r4Ingredients, setR4Ingredients] = useState(settings.recipe_4_ingredients || "Chorizo parrillero con ajo y salchicha tipo polaca\nFiambres cocidos y jamones seleccionados\nPresentación gourmet para celebraciones");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState<{isOpen: boolean, key: string | null}>({isOpen: false, key: null});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveSetting("hero_video_url", heroVideoUrl);
      await saveSetting("site_logo", siteLogo);
      if (fp1) await saveSetting("featured_product_1", fp1); else await saveSetting("featured_product_1", "");
      if (fp2) await saveSetting("featured_product_2", fp2); else await saveSetting("featured_product_2", "");
      if (fp3) await saveSetting("featured_product_3", fp3); else await saveSetting("featured_product_3", "");
      await saveSetting("catalog_pdf_url", catalogPdfUrl);

      // Guardar Recetas Navideñas
      await saveSetting("recipe_1_title", r1Title);
      await saveSetting("recipe_1_subtitle", r1Subtitle);
      await saveSetting("recipe_1_tag", r1Tag);
      await saveSetting("recipe_1_desc", r1Desc);
      await saveSetting("recipe_1_ingredients", r1Ingredients);

      await saveSetting("recipe_2_title", r2Title);
      await saveSetting("recipe_2_subtitle", r2Subtitle);
      await saveSetting("recipe_2_tag", r2Tag);
      await saveSetting("recipe_2_desc", r2Desc);
      await saveSetting("recipe_2_ingredients", r2Ingredients);

      await saveSetting("recipe_3_title", r3Title);
      await saveSetting("recipe_3_subtitle", r3Subtitle);
      await saveSetting("recipe_3_tag", r3Tag);
      await saveSetting("recipe_3_desc", r3Desc);
      await saveSetting("recipe_3_ingredients", r3Ingredients);

      await saveSetting("recipe_4_title", r4Title);
      await saveSetting("recipe_4_subtitle", r4Subtitle);
      await saveSetting("recipe_4_tag", r4Tag);
      await saveSetting("recipe_4_desc", r4Desc);
      await saveSetting("recipe_4_ingredients", r4Ingredients);

      toast.success("Ajustes guardados correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al guardar los ajustes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = async (key: string, url: string) => {
    if (key === "hero_video_url_temp") {
      setHeroVideoUrl(url);
      return;
    }
    if (key === "site_logo_temp") {
      setSiteLogo(url);
      return;
    }
    if (key === "catalog_pdf_url_temp") {
      setCatalogPdfUrl(url);
      return;
    }
    
    try {
      await saveSetting(key, url);
      toast.success("Medio guardado correctamente");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error("Error al guardar el medio");
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await saveSetting(key, "");
      toast.success("Medio eliminado correctamente");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      toast.error("Error al eliminar el medio");
    }
  };

  const renderPreview = (url: string) => {
    if (!url) return <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">Vacío</div>;
    if (url.match(/\.(mp4|webm|mov)$/i)) {
      return <video src={url} className="w-16 h-16 object-cover rounded-lg" autoPlay loop muted playsInline />;
    }
    return <img src={url} className="w-16 h-16 object-cover rounded-lg shadow-sm" alt="Preview" />;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <h2 className="text-xl font-bold text-black mb-6">Configuración de la Portada y Nosotros</h2>
        
        <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">URL del Video de Fondo (Inicio)</label>
          <div className="flex items-center gap-4">
            {renderPreview(heroVideoUrl)}
            <input type="text" value={heroVideoUrl} onChange={(e) => setHeroVideoUrl(e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: 'hero_video_url_temp'})} className="bg-black text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md">Seleccionar Video</button>
          </div>
        </div>

        <div className="mb-8 border-t border-gray-100 pt-8">
          <h3 className="text-lg font-bold text-black mb-6">Logo e Ícono Principal</h3>
          <div className="flex items-center gap-6">
            {renderPreview(siteLogo)}
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Logo de la Página Web</label>
              <input type="text" value={siteLogo} onChange={(e) => setSiteLogo(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: 'site_logo_temp'})} className="bg-black text-white px-4 py-3 rounded-xl font-bold text-xs hover:bg-gray-800 transition-colors shadow-md">Seleccionar Logo</button>
            </div>
          </div>
        </div>

        <div className="mb-8 border-t border-gray-100 pt-8">
          <h3 className="text-lg font-bold text-black mb-6">Catálogo PDF</h3>
          <p className="text-xs text-gray-500 mb-6">Sube el archivo PDF del catálogo para que los clientes puedan descargarlo en la página de productos.</p>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">URL del Catálogo PDF</label>
              <input type="text" value={catalogPdfUrl} onChange={(e) => setCatalogPdfUrl(e.target.value)} placeholder="Ej: https://.../catalogo.pdf" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div className="flex gap-2 self-end">
              <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: 'catalog_pdf_url_temp'})} className="bg-black text-white px-4 py-3 rounded-xl font-bold text-xs hover:bg-gray-800 transition-colors shadow-md">Subir PDF</button>
            </div>
          </div>
        </div>

        <div className="mb-8 border-t border-gray-100 pt-8">
          <h3 className="text-lg font-bold text-black mb-6">Sección "Acerca De" (Página Inicio y Nosotros)</h3>
          
          <div className="mb-6 flex items-center gap-6">
            {renderPreview(settings.about_img)}
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Foto Preview (Inicio) - Fábrica o Familia</label>
              <input type="text" value={settings.about_img || ""} readOnly className="w-full bg-transparent border-0 text-sm text-gray-400 p-0 focus:ring-0 truncate" />
            </div>
            <div className="flex gap-2">
              {settings.about_img && (
                <button type="button" onClick={() => handleDelete("about_img")} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">Eliminar</button>
              )}
              <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: 'about_img'})} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-6">
            {renderPreview(settings.about_hero_img)}
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Banner Superior (Página Nosotros)</label>
              <input type="text" value={settings.about_hero_img || ""} readOnly className="w-full bg-transparent border-0 text-sm text-gray-400 p-0 focus:ring-0 truncate" />
            </div>
            <div className="flex gap-2">
              {settings.about_hero_img && (
                <button type="button" onClick={() => handleDelete("about_hero_img")} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">Eliminar</button>
              )}
              <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: 'about_hero_img'})} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-6">
            {renderPreview(settings.about_page_img)}
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Foto Interior (Página Nosotros)</label>
              <input type="text" value={settings.about_page_img || ""} readOnly className="w-full bg-transparent border-0 text-sm text-gray-400 p-0 focus:ring-0 truncate" />
            </div>
            <div className="flex gap-2">
              {settings.about_page_img && (
                <button type="button" onClick={() => handleDelete("about_page_img")} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">Eliminar</button>
              )}
              <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: 'about_page_img'})} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>
            </div>
          </div>
        </div>

        <div className="mb-8 border-t border-gray-100 pt-8">
          <h3 className="text-lg font-bold text-black mb-6">Productos Destacados (Inicio)</h3>
          <p className="text-xs text-gray-500 mb-6">Selecciona los 3 productos que quieres mostrar en la portada. (Deja en Automático para mostrar los últimos 3 subidos).</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Producto 1", value: fp1, setter: setFp1 },
              { label: "Producto 2", value: fp2, setter: setFp2 },
              { label: "Producto 3", value: fp3, setter: setFp3 },
            ].map((item, idx) => {
              const selectedProduct = products.find(p => p.id.toString() === item.value);
              return (
                <div key={idx} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col gap-3">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">{item.label}</label>
                  
                  {/* Preview del Producto Seleccionado */}
                  <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    {selectedProduct?.image_url ? (
                      <img src={selectedProduct.image_url} className="w-12 h-12 object-contain bg-gray-50 rounded-lg border border-gray-100" alt="Preview" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold border border-gray-200">
                        {item.value ? "SIN FOTO" : "AUTO"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-black truncate">{selectedProduct ? selectedProduct.name : "Automático"}</p>
                      <p className="text-[10px] text-gray-400 truncate">{selectedProduct ? `${selectedProduct.tag || ''} - ${selectedProduct.brand}` : "Último agregado"}</p>
                    </div>
                  </div>

                  <SearchableSelect 
                    value={item.value} 
                    onChange={item.setter} 
                    options={[
                      { value: "", label: "Automático (Los más recientes)" },
                      ...products.map(p => ({
                        value: p.id.toString(),
                        label: `${p.name} ${p.tag ? `(${p.tag})` : ''} - ${p.brand}`
                      }))
                    ]}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8 border-t border-gray-100 pt-8">
          <h3 className="text-lg font-bold text-black mb-6">Medios Preview del Catálogo (Inicio)</h3>
          
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="mb-6 flex items-center gap-6">
              {renderPreview(settings[`gallery_img_${i}`])}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Medio Galería {i}</label>
                <input type="text" value={settings[`gallery_img_${i}`] || ""} readOnly className="w-full bg-transparent border-0 text-sm text-gray-400 p-0 focus:ring-0 truncate" />
              </div>
              <div className="flex gap-2">
                {settings[`gallery_img_${i}`] && (
                  <button type="button" onClick={() => handleDelete(`gallery_img_${i}`)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors">Eliminar</button>
                )}
                <button type="button" onClick={() => setSelectorOpen({isOpen: true, key: `gallery_img_${i}`})} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN RECETAS NAVIDEÑAS */}
        <div className="mb-8 border-t border-gray-100 pt-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <h3 className="text-lg font-bold text-black">Recetas Navideñas (Edición Especial)</h3>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Edita los títulos, descripciones, ingredientes e imágenes de las 4 recetas festivas que se exhiben en la portada web. Las fotos se sincronizan directamente con Cloudinary.
          </p>

          <div className="space-y-8">
            {[
              {
                num: 1,
                imgKey: "recipe_1_image",
                defaultImg: "/christmas/pan_de_jamon.jpg",
                title: r1Title,
                setTitle: setR1Title,
                subtitle: r1Subtitle,
                setSubtitle: setR1Subtitle,
                tag: r1Tag,
                setTag: setR1Tag,
                desc: r1Desc,
                setDesc: setR1Desc,
                ingredients: r1Ingredients,
                setIngredients: setR1Ingredients,
              },
              {
                num: 2,
                imgKey: "recipe_2_image",
                defaultImg: "/christmas/jamon_planchado.jpg",
                title: r2Title,
                setTitle: setR2Title,
                subtitle: r2Subtitle,
                setSubtitle: setR2Subtitle,
                tag: r2Tag,
                setTag: setR2Tag,
                desc: r2Desc,
                setDesc: setR2Desc,
                ingredients: r2Ingredients,
                setIngredients: setR2Ingredients,
              },
              {
                num: 3,
                imgKey: "recipe_3_image",
                defaultImg: "/christmas/hallacas.jpg",
                title: r3Title,
                setTitle: setR3Title,
                subtitle: r3Subtitle,
                setSubtitle: setR3Subtitle,
                tag: r3Tag,
                setTag: setR3Tag,
                desc: r3Desc,
                setDesc: setR3Desc,
                ingredients: r3Ingredients,
                setIngredients: setR3Ingredients,
              },
              {
                num: 4,
                imgKey: "recipe_4_image",
                defaultImg: "/christmas/tabla_navidena.jpg",
                title: r4Title,
                setTitle: setR4Title,
                subtitle: r4Subtitle,
                setSubtitle: setR4Subtitle,
                tag: r4Tag,
                setTag: setR4Tag,
                desc: r4Desc,
                setDesc: setR4Desc,
                ingredients: r4Ingredients,
                setIngredients: setR4Ingredients,
              },
            ].map((rec) => (
              <div key={rec.num} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    {renderPreview(settings[rec.imgKey] || rec.defaultImg)}
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block">
                        Receta #{rec.num}
                      </span>
                      <h4 className="text-sm font-bold text-black">{rec.title}</h4>
                      <p className="text-[11px] text-gray-400 truncate max-w-xs">{settings[rec.imgKey] ? "Imagen personalizada" : "Imagen por defecto"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {settings[rec.imgKey] && (
                      <button
                        type="button"
                        onClick={() => handleDelete(rec.imgKey)}
                        className="bg-red-50 text-red-600 px-3 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors"
                      >
                        Restaurar original
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectorOpen({ isOpen: true, key: rec.imgKey })}
                      className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      Cambiar Foto
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={rec.title}
                      onChange={(e) => rec.setTitle(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Etiqueta / Tag (ej: Receta Tradicional)
                    </label>
                    <input
                      type="text"
                      value={rec.tag}
                      onChange={(e) => rec.setTag(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Subtítulo (Producto Montano Antilia usado)
                    </label>
                    <input
                      type="text"
                      value={rec.subtitle}
                      onChange={(e) => rec.setSubtitle(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Descripción de la Receta
                    </label>
                    <textarea
                      rows={2}
                      value={rec.desc}
                      onChange={(e) => rec.setDesc(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Ingredientes recomendados (un ingrediente por línea)
                    </label>
                    <textarea
                      rows={3}
                      value={rec.ingredients}
                      onChange={(e) => rec.setIngredients(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-xs"
                      placeholder="Ingrediente 1&#10;Ingrediente 2&#10;Ingrediente 3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-6 mt-12 p-4 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 z-40 ring-1 ring-black/5">
          <div className="text-center sm:text-left">
            <p className="font-bold text-sm text-black">Ajustes del Sistema</p>
            <p className="text-xs text-gray-500">Asegúrate de guardar los cambios al finalizar</p>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-primary transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-primary/30 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
            {isSubmitting ? 'Guardando...' : 'Guardar Ajustes'}
          </button>
        </div>
      </form>

      <MediaSelector 
        isOpen={selectorOpen.isOpen} 
        onClose={() => setSelectorOpen({isOpen: false, key: null})} 
        onSelect={(url) => {
          if (selectorOpen.key) {
            handleUpload(selectorOpen.key, url);
          }
        }} 
      />
    </>
  );
}
