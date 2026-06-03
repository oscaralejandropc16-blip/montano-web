"use client";

import { useState } from "react";
import { saveSetting } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-hot-toast";

export default function AjustesClient({ settings }: { settings: Record<string, string> }) {
  const [heroVideoUrl, setHeroVideoUrl] = useState(settings.hero_video_url || "/hero-video.mp4");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveSetting("hero_video_url", heroVideoUrl);
      toast.success("Ajustes guardados correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al guardar los ajustes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = async (key: string, result: any) => {
    const url = result.info.secure_url;
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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
      <h2 className="text-xl font-bold text-black mb-6">Configuración de la Portada y Nosotros</h2>
      
      <div className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">URL del Video de Fondo (Inicio)</label>
        <div className="flex items-center gap-4">
          {renderPreview(heroVideoUrl)}
          <input type="text" value={heroVideoUrl} onChange={(e) => setHeroVideoUrl(e.target.value)} className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          <CldUploadWidget uploadPreset="ml_default" options={{ resourceType: "video" }} onSuccess={(res) => setHeroVideoUrl((res as any).info.secure_url)}>
            {({ open }) => <button type="button" onClick={() => open()} className="bg-black text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap shadow-md">Subir Video</button>}
          </CldUploadWidget>
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
            <CldUploadWidget uploadPreset="ml_default" options={{ resourceType: "auto" }} onSuccess={(res) => handleUpload("about_img", res)}>
              {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>}
            </CldUploadWidget>
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
            <CldUploadWidget uploadPreset="ml_default" options={{ resourceType: "auto" }} onSuccess={(res) => handleUpload("about_hero_img", res)}>
              {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>}
            </CldUploadWidget>
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
            <CldUploadWidget uploadPreset="ml_default" options={{ resourceType: "auto" }} onSuccess={(res) => handleUpload("about_page_img", res)}>
              {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>}
            </CldUploadWidget>
          </div>
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
              <CldUploadWidget options={{ resourceType: "auto" }} uploadPreset="ml_default" onSuccess={(res) => handleUpload(`gallery_img_${i}`, res)}>
                {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition-colors">Cambiar</button>}
              </CldUploadWidget>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-6 flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-primary transition-colors shadow-lg"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Ajustes'}
        </button>
      </div>
    </form>
  );
}
