"use client";

import { useState } from "react";
import { UploadCloud, Trash2, Copy, Check } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { deleteCloudinaryMedia } from "@/lib/actions";
import ConfirmModal from "@/components/ConfirmModal";
import { toast } from "react-hot-toast";

export default function MediosClient({ initialMedia }: { initialMedia: any[] }) {
  const [mediaItems, setMediaItems] = useState(initialMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteData, setDeleteData] = useState<{publicId: string, resourceType: string} | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  const visibleItems = mediaItems.slice(0, visibleCount);
  const hasMore = visibleCount < mediaItems.length;

  const handleUploadSuccess = async (result: any) => {
    toast.success("Medio subido correctamente");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleDelete = (publicId: string, resourceType: string) => {
    setDeleteData({ publicId, resourceType });
  };

  const confirmDelete = async () => {
    if (!deleteData) return;
    try {
      await deleteCloudinaryMedia(deleteData.publicId, deleteData.resourceType);
      setMediaItems(mediaItems.filter(m => m.public_id !== deleteData.publicId));
      toast.success("Medio eliminado correctamente");
    } catch (e) {
      toast.error("Error al eliminar");
    } finally {
      setDeleteData(null);
    }
  };

  const copyUrl = (url: string, id: string) => {
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
        <>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {visibleItems.map(item => (
            <div key={item.public_id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group">
              <div className="aspect-square bg-gray-100 relative">
                {item.resource_type === 'video' ? (
                  <video src={item.secure_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={item.secure_url} className="w-full h-full object-cover" alt="Media" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                  <button 
                    onClick={() => copyUrl(item.secure_url, item.public_id)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                    title="Copiar URL"
                  >
                    {copiedId === item.public_id ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => handleDelete(item.public_id, item.resource_type)}
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
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={handleLoadMore}
              className="bg-white border border-gray-200 text-black px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors shadow-sm"
            >
              Cargar más imágenes ({mediaItems.length - visibleCount} restantes)
            </button>
          </div>
        )}
        </>
      )}

      <ConfirmModal 
        isOpen={deleteData !== null}
        onClose={() => setDeleteData(null)}
        onConfirm={confirmDelete}
        title="Eliminar Imagen"
        message="¿Estás seguro de que deseas eliminar este archivo de Cloudinary? Esta acción es irreversible."
        confirmText="Sí, eliminar"
      />
    </div>
  );
}
