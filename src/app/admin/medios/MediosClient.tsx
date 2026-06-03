"use client";

import { useState } from "react";
import { UploadCloud, Trash2, Copy, Check } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { createMedia, deleteMedia } from "@/lib/actions";
import ConfirmModal from "@/components/ConfirmModal";

export default function MediosClient({ initialMedia }: { initialMedia: any[] }) {
  const [mediaItems, setMediaItems] = useState(initialMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleUploadSuccess = async (result: any) => {
    try {
      const newUrl = result.info.secure_url;
      // We will let the server action update the DB and revalidate, 
      // but we can optionally optimism-add it. The easiest is reloading.
      await createMedia(newUrl);
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("Error guardando imagen en la base de datos.");
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteMedia(deleteId);
    setMediaItems(mediaItems.filter(m => m.id !== deleteId));
    setDeleteId(null);
  };

  const copyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex justify-end mb-8">
        <CldUploadWidget 
          uploadPreset="ml_default"
          options={{ resourceType: "auto" }}
          onSuccess={handleUploadSuccess}
          onOpen={() => setIsUploading(true)}
          onClose={() => setIsUploading(false)}
        >
          {({ open }) => (
            <button 
              onClick={() => open()}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <UploadCloud className="w-5 h-5" /> 
              {isUploading ? 'Subiendo...' : 'Subir Medio'}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {mediaItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <UploadCloud className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-black mb-2">No hay imágenes en la galería</h3>
          <p className="text-gray-400">Sube tu primera imagen para usarla como banner o donde quieras.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mediaItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
              <div className="aspect-square bg-gray-100 relative">
                {item.url && item.url.match(/\.(mp4|webm|mov)$/i) ? (
                  <video src={item.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={item.url} className="w-full h-full object-cover" alt="Media" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button 
                    onClick={() => copyUrl(item.url, item.id)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                    title="Copiar URL"
                  >
                    {copiedId === item.id ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal 
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Eliminar Imagen"
        message="¿Estás seguro de que deseas eliminar esta imagen de la galería? (No se borrará de Cloudinary, solo de este panel)."
        confirmText="Sí, eliminar"
      />
    </div>
  );
}
