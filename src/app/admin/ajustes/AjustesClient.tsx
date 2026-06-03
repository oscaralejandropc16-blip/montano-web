"use client";

import { useState } from "react";
import { saveSetting } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

export default function AjustesClient({ settings }: { settings: Record<string, string> }) {
  const [heroVideoUrl, setHeroVideoUrl] = useState(settings.hero_video_url || "/hero-video.mp4");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveSetting("hero_video_url", heroVideoUrl);
      alert("Ajustes guardados correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar los ajustes");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
      <h2 className="text-xl font-bold text-black mb-6">Configuración de la Portada</h2>
      
      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">URL del Video de Fondo (Inicio)</label>
        <div className="flex gap-4 mb-2">
          <input type="text" value={heroVideoUrl} onChange={(e) => setHeroVideoUrl(e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          <CldUploadWidget uploadPreset="ml_default" options={{ resourceType: "video" }} onSuccess={(result: any) => setHeroVideoUrl(result.info.secure_url)}>
            {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">Subir Video</button>}
          </CldUploadWidget>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto "Acerca De" (Fábrica/Familia)</label>
        <div className="flex gap-4 mb-2">
          <input type="text" value={settings.about_img || ""} onChange={(e) => {}} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black" readOnly />
          <CldUploadWidget uploadPreset="ml_default" onSuccess={async (result: any) => { await saveSetting("about_img", result.info.secure_url); alert("Foto guardada"); window.location.reload(); }}>
            {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">Cambiar Foto</button>}
          </CldUploadWidget>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Medios Preview del Catálogo (Inicio - Soporta Fotos y Videos)</label>
        
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4 mb-4">
            <input type="text" value={settings[`gallery_img_${i}`] || ""} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black" readOnly placeholder={`Medio Galería ${i}`} />
            <CldUploadWidget options={{ resourceType: "auto" }} uploadPreset="ml_default" onSuccess={async (result: any) => { await saveSetting(`gallery_img_${i}`, result.info.secure_url); alert("Medio guardado"); window.location.reload(); }}>
              {({ open }) => <button type="button" onClick={() => open()} className="bg-gray-100 text-black px-4 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">Cambiar {i}</button>}
            </CldUploadWidget>
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
